<template>
  <!-- 系统设置 -->
  <div class="tabs_two">
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="item.label"
          :name="item.name"
          v-for="(item, index) in tabList"
          :key="index"
        >
          <router-view v-if="activeName === item.name"></router-view>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "a",
      tabList: [
        {
          label: "项目设置",
          name: "a"
        },
        {
          label: "人员设置",
          name: "b"
        },
        {
          label: "闭馆时间设置",
          name: "c"
        }
      ],
      tabsList: []
    };
  },
  created() {
    if (this.$route.name == "ssProjectSetup") {
      this.activeName = "a";
    } else if (this.$route.name == "ssPersonnelSetup") {
      this.activeName = "b";
    } else if (this.$route.name == "ssClosingHours") {
      this.activeName = "c";
    }
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      if (this.activeName == "a") {
        this.$router.push("/ssProjectSetup");
      } else if (this.activeName == "b") {
        this.$router.push("/ssPersonnelSetup");
      } else if (this.activeName == "c") {
        this.$router.push("/ssClosingHours");
      }
    }
  }
};
</script>
<style></style>
