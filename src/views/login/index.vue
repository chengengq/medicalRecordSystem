<template>
  <div class="login">
    <div class="login_title">
      <img src="@/assets/logo_notbottoms.png" alt />
      <h2>北山科技</h2>
      <h2>病案首页系统</h2>
    </div>
    <div class="login_from">
      <div class="login_from_back">
        <img src="@/assets/loginBack.jpg" alt="" />
      </div>
      <el-form
        class="el_form"
        :model="loginForm"
        :rules="loginRules"
        background-color="transparent"
        ref="loginRef"
        autocomplete="on"
        label-position="left"
      >
        <el-form-item prop="loginName" v-show="loginNo == true">
          <el-input
            v-model="loginForm.loginName"
            placeholder="请输入账号"
            type="text"
            tabindex="1"
            autocomplete="on"
            clearable
          >
            <template slot="prepend"
              ><i class="iconfont icon-zhanghao"></i></template
          ></el-input>
        </el-form-item>
        <el-form-item prop="loginPWd" v-show="loginNo == true">
          <el-input
            v-model="loginForm.loginPWd"
            @keyup.enter.native="handleLogin"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
          >
            <template slot="prepend"
              ><i class="iconfont icon-mima"></i></template
          ></el-input>
        </el-form-item>
        <el-form-item prop="loginKey" v-show="loginNo == false">
          <el-input
            v-model="loginForm.loginKey"
            @keyup.enter.native="handleKey"
            type="text"
            placeholder="请输入注册码"
            clearable
          >
            <template slot="prepend"
              ><i class="iconfont icon-jihuoma"></i></template
          ></el-input>
        </el-form-item>
        <div class="forget_pass">
          <span @click="loginNo = !loginNo">
            <i class="iconfont icon-qu"></i>
            {{ loginNo == true ? "注册码" : "返回登录" }}</span
          >
        </div>
        <!-- :loading="isLogin" -->
        <el-button
          type="primary"
          class="login_button"
          @click="handleLogin"
          v-if="loginNo == true"
          :loading="isLogin"
          >登录</el-button
        >
        <el-button type="primary" class="login_button" @click="handleKey" v-else
          >激活</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { postActivate, postLogin, getMenus } from "@/api";
import router from "@/router";
import { date } from "@/utils/date.js";
export default {
  data() {
    return {
      //登录按钮显示/
      isLogin: false,
      //显示注册码/登录
      loginNo: true,
      //保存token
      token: "",
      //logo
      logoImg: "",
      //账号
      user: "",
      //账号ID
      userid: "",
      loginForm: {
        loginName: "",
        loginPWd: "",
        loginKey: ""
      },
      //输入框校验
      loginRules: {
        loginName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        loginPWd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        loginKey: [
          {
            required: true,
            message: "请输入注册码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleLogin() {
      //   this.$router.push("/welcome");
      let params = {
        username: this.loginForm.loginName,
        password: this.loginForm.loginPWd
      };
      postLogin(this.$qs.stringify(params)).then(res => {
        console.log(res, "login");
        this.isLogin = true;
        if (res.state === "success") {
          this.isLogin = false;
          /*
          成功后将页面所需的数据保存
          处理动态导航
          */
          this.token = res.result.jwt;
          this.logoImg = res.result.logoAddress;
          this.user = res.result.username;
          this.userid = res.result.userId;
          let data = {
            token: this.token
          };
          getMenus(data).then(res => {
            console.log(res, "menu");
            let routes = [];
            if (res.state === "10000") {
              sessionStorage.ROUTES = JSON.stringify(res.result);
              res.result
                .map(ele => ele)
                .forEach((item, index) => {
                  routes.push({
                    path: item.path,
                    name: item.name,
                    id: item.id,
                    title: item.menuName,
                    menuIcon: item.SmallImage,
                    children: []
                  });
                  if (item.children) {
                    item.children.forEach((items, indexs) => {
                      routes[index].children.push({
                        path: items.path,
                        name: items.name,
                        id: items.id,
                        title: items.menuName,
                        children: []
                      });
                    });
                  }
                });
              console.log(routes);
              sessionStorage.setItem("routeList", JSON.stringify(routes));
              localStorage.setItem("token", this.token);
              sessionStorage.setItem("logoImg", this.logoImg);
              sessionStorage.setItem("userName", this.user);
              sessionStorage.setItem("userId", this.userid);
              sessionStorage.setItem(
                "entryDate",
                date(new Date(), "yyyy-MM-dd")
              );
              this.$router.push("/welcome");
              this.$message.success("登录成功");
            } else {
              this.$message.error(res.message);
              this.isLogin = false;
            }
          });
        } else {
          this.$message.error(res.message);
          this.isLogin = false;
        }
      });
    },
    //激活码
    handleKey() {
      let data = {
        activationCode: this.loginForm.loginKey
      };
      postActivate(this.$qs.stringify(data)).then(res => {
        if (res.state == "success") {
          this.$message.success("激活成功!");
          this.loginNo = true;
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>

<style></style>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(to bottom, #08517c, #010a3b);
  .login_title {
    position: fixed;
    top: 30px;
    left: 30px;
    img {
      width: 40px;
      height: 40px;
      line-height: 40px;
      float: left;
    }
    h2 {
      margin-top: 5px;
      float: left;
      font-size: 26px;
      font-weight: 500;
      color: #eff3fa;
      padding-left: 10px;
      margin-left: 10px;
    }
    h2:last-child {
      border-left: 2px solid #eff3fa;
    }
  }
  .diaLogin {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
  }
  .dialog_hide {
    p {
      text-align: left;
      font-size: 15px;
      line-height: 22px;
      color: #838788;
      padding-bottom: 10px;
      span {
        font-size: 17px;
        font-weight: normal;
      }
    }
    .footer_p {
      font-size: 16px;
      font-weight: normal;
      color: rgb(43, 40, 40);
    }
  }
  .login_from {
    width: 40%;
    background: rgba($color: #ccc, $alpha: 0.1);
    display: flex;
    .login_from_back {
      width: 329px;
      height: 308px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .el_form {
      padding-top: 10%;
      width: calc(100% - 329px);
      background: #fff;
      .forget_pass {
        width: 90%;
        color: #8590a6;
        font-size: 16px;
        text-align: right;
        padding-bottom: 15px;
        span {
          display: inline;
          cursor: pointer;
        }
        span:hover {
          color: #808080;
        }
      }
      .el-form-item {
        width: 90%;
        margin-left: 5%;
      }
      .el-button {
        width: 90%;
      }
    }
    i {
      font-size: 16px;
    }
  }
}
</style>
