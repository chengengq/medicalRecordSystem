<template>
  <div class="home_head">
    <div class="home_head_logo">
      <div class="logo_text">
        <span>病案首页系统</span>
      </div>
    </div>
    <div class="home_head_nav">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        text-color="#fff"
        active-text-color="#fff"
      >
        <el-menu-item index="1">
          <i class="iconfont icon-luru"></i>
          <span>病案录入</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="iconfont icon-binganchaxun"></i>
          <span>病案查询</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="iconfont icon-shangbao1"></i>
          <span>直接上报</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="iconfont icon-icon-baobiaotongji5"></i>
          <span>报表统计</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="iconfont icon-shezhi1"></i>
          <span>系统管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="iconfont icon-ziyuan5"></i>
          <span>字典库设置</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="home_head_right">
      <div class="home_head_loginout">
        <el-dropdown @command="handleClick">
          <span class="el-dropdown-link">
            {{ this.userName }}
            <i class="el-icon-caret-bottom el-icon--right dropdown_icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a" class="clearfix">
              注销
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: sessionStorage.getItem("userName"),
      activeIndex: "",
      menuList: []
    };
  },
  created() {
    if (sessionStorage.activeIndex) {
      this.activeIndex = sessionStorage.activeIndex;
    } else {
      sessionStorage.setItem("activeIndex", "1");
      this.activeIndex = "1";
    }
  },
  methods: {
    //修改密码/注销
    handleClick(e) {
      console.log(e);
      if (e == "a") {
        const h = this.$createElement;
        this.$msgbox({
          title: "温馨提示",
          message: h("p", null, [
            h("span", null, "是否注销账号返回登录页面? ")
          ]),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "执行中...";
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 500);
            } else {
              done();
            }
          }
        })
          .then(() => {
            this.$router.push("/login");
            this.$message({
              type: "success",
              message: "登出成功!"
            });
            sessionStorage.removeItem("activeIndex");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消操作"
            });
          });
      } else {
      }
    },
    //切换菜单
    handleSelect(index, indexPath) {
      this.activeIndex = index;
      sessionStorage.setItem("activeIndex", this.activeIndex);
      if (index == 1) {
        this.$router.push("scheduling");
      } else if (index == 2) {
        this.$router.push("workloadAccount");
      } else if (index == 3) {
        this.$router.push("talentQuery");
      } else if (index == 4) {
        this.$router.push("talentExport");
      } else if (index == 5) {
        this.$router.push("compensatoryLeaveExport");
      } else if (index == 6) {
        this.$router.push("IdlePeopleQuery");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home_head {
  background: linear-gradient(to right, #8dbeba, #37b9e9);
  width: 100%;
  height: 100%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  display: flex;
  .home_head_logo {
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo_text {
      display: flex;
      flex-wrap: wrap;
      span {
        width: 100%;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        text-align: center;
      }
      .h_logo {
        width: 100%;
        height: 100%;
        text-align: center;
        img {
          height: 40px;
          width: 100%;
        }
      }
    }
  }
  .home_head_nav {
    width: 70%;
    .el-menu {
      height: 80px !important;
      line-height: 80px !important;
      background: rgba(0, 0, 0, 0);
      .el-menu-item {
        font-size: 16px !important;
        height: 80px !important;
        // line-height: 0 !important;
        border-bottom: none;
        display: flex;
        flex-direction: column;
        text-align: center;
        i {
          line-height: 50px;
          font-size: 28px;
          color: #fff;
        }
        i:nth-child(2) {
          font-size: 32px;
        }
        i:nth-child(3) {
          font-size: 34px;
        }
        .zy_icon {
          font-size: 36px;
        }
        span {
          line-height: 20px;
        }
      }
      .el-menu-item.is-active {
        background: rgba(255, 255, 255, 0.1) !important;
        border-bottom: none;
      }
      .el-menu-item:hover {
        background: rgba(255, 255, 255, 0.1) !important;
      }
    }
  }
  .home_head_right {
    width: 15%;
    .home_head_loginout {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      text-align: right;
      color: rgb(214, 203, 203);
      font-size: 18px;
      .el-dropdown {
        cursor: pointer;
        .el-dropdown-link {
          font-size: 18px;
          color: #fff;
        }
      }
    }
  }
}
</style>
