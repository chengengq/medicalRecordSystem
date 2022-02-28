<template>
  <div class="times">
    <div class="times_wrap">
      <!-- 相关按钮 排班 导出 -->
      <div class="button_out">
        <el-switch
          v-if="IsSwitch"
          @change="handleSwitch"
          v-model="isSwitch"
          active-color="#13ce66"
          inactive-color="#409eff"
          active-text="广东码"
          inactive-text="国家码"
        >
        </el-switch>
        <el-button
          type="primary"
          size="mini"
          @click="handleCheck"
          title="校验后才能保存!"
          >校验</el-button
        >
        <el-button
          :disabled="isSave"
          type="success"
          size="mini"
          @click="handleSave"
          title="校验后才能保存!"
          >保存</el-button
        >
        <el-button size="mini" @click="resetForm">清空</el-button>
      </div>
    </div>
    <div class="times_title">
      <div class="times_title_items">
        <div class="times_title_item">
          <span>病案号:</span>
          <el-input size="mini" v-model="pprns" readonly></el-input>
        </div>
        <div class="times_title_item">
          <span>姓名:</span>
          <el-input size="mini" v-model="names" readonly></el-input>
        </div>
        <div class="times_title_item">
          <span>住院次数:</span>
          <el-input size="mini" v-model="ftimes" readonly></el-input>
        </div>
        <div class="times_title_item">
          <span>年龄:</span>
          <el-input size="mini" v-model="ages" readonly></el-input>
        </div>
        <div class="times_title_item">
          <span>录入员:</span>
          <el-input size="mini" v-model="userName" readonly></el-input>
        </div>
        <div class="times_title_item">
          <span>录入日期:</span>
          <el-input size="mini" v-model="newDate" readonly></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSwitch: false,
      userName: sessionStorage.userName,
      newDate: sessionStorage.entryDate
    };
  },
  props: ["pprns", "names", "ftimes", "ages", "isSave", "IsSwitch"],
  created() {},
  methods: {
    // 切换诊断国家码/广东码
    handleSwitch() {
      this.$emit("handleSwitch", this.isSwitch);
    },
    // 校验按钮
    handleCheck() {
      this.$emit("handleCheck", "Check");
    },
    // 保存按钮
    handleSave() {
      this.$emit("handleSave", "save");
    },
    // 清空表单验证
    resetForm() {
      this.$emit("resetForm");
    }
  }
};
</script>

<style lang="scss" scoped>
.times {
  border-radius: 4px;
  z-index: 999;
  .times_wrap {
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #f4f4f4;
    border: 1px solid #e4dfdf;
    .button_out {
      margin-right: 20px;
    }
  }
}
.times_title_items {
  height: 50px;
  line-height: 50px;
  background-color: #b0bccc;
  border-radius: 4px;
  margin: 6px 0 10px 0;
  padding: 0 10px 0 15px;
  display: flex;
  flex-direction: row;
  color: #000;
  .times_title_item {
    display: inline-block;
  }
  .el-input {
    width: 70%;
  }
  span {
    font-size: 16px;
    margin-right: 2px;
  }
}
</style>
