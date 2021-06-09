<template>
  <div class="login">
    <div class="login_from">
      <div class="login_from_title">
        <h3 class="title">病案首页系统</h3>
      </div>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        background-color="transparent"
        ref="loginRef"
        autocomplete="on"
        label-position="left"
      >
        <el-form-item prop="loginName">
          <el-input
            v-model="loginForm.loginName"
            placeholder="请输入账号"
            prefix-icon="iconfont icon-zhanghao"
            type="text"
            tabindex="1"
            autocomplete="on"
            clearable
          />
        </el-form-item>
        <el-form-item prop="loginPWd">
          <el-input
            v-model="loginForm.loginPWd"
            @keyup.enter.native="handleLogin"
            prefix-icon="iconfont icon-mima"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
          />
        </el-form-item>
        <!-- :loading="isLogin" -->
        <el-button
          type="primary"
          class="login_button"
          @click="handleLogin"
          :loading="isLogin"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { postLogin } from "@/api";
export default {
  data() {
    return {
      isLogin: false,
      loginForm: {
        loginName: "",
        loginPWd: ""
      },
      //输入框校验
      loginRules: {
        loginName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        loginPWd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleLogin() {
      let params = {
        username: this.loginForm.loginName,
        password: this.loginForm.loginPWd
      };
      postLogin(this.$qs.stringify(params)).then(res => {
        console.log(res, "login");
        this.isLogin = true;
        if (res.state === "success") {
          this.isLogin = false;
          sessionStorage.setItem("token", res.result.jwt);
          sessionStorage.setItem("userName", res.result.username);
          this.$router.push("/home");
        } else {
          this.$message.error(res.message);
          this.isLogin = false;
        }
      });
    }
  }
};
</script>

<style>
.login_from .el-form .el-input .el-input__inner {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.9);
  color: #000;
}
</style>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: url(../../assets/login.jpg) no-repeat;
  background-size: 100% 100%;
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
  .login_title {
    position: fixed;
    top: 30px;
    left: 30px;
    img {
      width: 60px;
      height: 60px;
    }
  }
  .login_from {
    width: 400px;
    background: rgba($color: #ccc, $alpha: 0.1);
    padding: 35px 35px 15px;
    border-radius: 5%;
    .login_from_title {
      width: 100%;
      height: 60px;
      line-height: 60px;
      // background: #63b0ff;
      .title {
        font-size: 26px;
        color: #fff;
      }
    }
    i {
      font-size: 16px;
    }
    .forget_pass {
      color: #fff;
      font-size: 16px;
      text-align: right;
      padding-bottom: 15px;
      span {
        display: inline;
        cursor: pointer;
      }
    }
    .login_button {
      width: 100%;
      padding: 10px 0;
      border-color: #4cc9f0;
      background: #4cc9f0;
      cursor: pointer;
      margin-bottom: 30px;
    }
    .form_bottom {
      width: 100%;
      color: #fff;
      h2 {
        font-size: 16px;
        padding-top: 30px;
      }
      .tel {
        padding-top: 10px;
        font-size: 14px;
        color: #dbdee2;
        .hide {
          cursor: pointer;
          text-decoration: underline;
          padding-left: 20px;
        }
        .hide:hover {
          color: rgb(245, 235, 235);
        }
      }
      p {
        font-size: 14px;
        padding-top: 10px;
      }
    }
  }
}
</style>
