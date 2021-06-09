<template>
  <div class="error">
    <div class="error_wrap">
      <div class="iconfont">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-404"></use>
        </svg>
      </div>
      <div class="text">
        <p>您所寻找的页面不存在。你可以点击下面的按钮，重新登录。</p>
        <el-button type="primary" @click="handleGo" round>退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleGo() {
      sessionStorage.removeItem("activeIndex");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("ROUTES");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  width: 100%;
  height: 100%;
  .error_wrap {
    display: flex;
    flex-wrap: wrap;
    .iconfont {
      padding-top: 50px;
      height: 400px;
      font-size: 400px;
      width: 100%;
      text-align: center;
    }
    .text {
      width: 100%;
      height: 100%;
      text-align: center;
      p {
        font-size: 16px;
        color: rgb(97, 155, 209);
        padding-bottom: 20px;
      }
      .el-button {
        width: 150px;
      }
    }
  }
}
</style>
