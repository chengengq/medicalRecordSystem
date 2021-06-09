<template>
  <!-- 首页录入 -->
  <div class="tabs_two">
    <div class="tabs">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="item.label"
          :name="item.name"
          v-for="(item, index) in tabList"
          :key="index"
        >
          <component :is="item.content"></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import mhBasicInformation from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhBasicInformation";
import mhInpatientinformation from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhInpatientinformation";
import mhDiagnosticInformation from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhDiagnosticInformation";
import mhCompliance from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhCompliance";
import mhSurgicalInformation from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhSurgicalInformation";
import mhWomenAndchildrenCard from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhWomenAndchildrenCard";
import mhCancerCard from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhCancerCard";
import mhFeeInformation from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhFeeInformation";
import mhExtendedInformation from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhExtendedInformation";
export default {
  components: {
    mhBasicInformation,
    mhInpatientinformation,
    mhDiagnosticInformation,
    mhCompliance,
    mhSurgicalInformation,
    mhWomenAndchildrenCard,
    mhCancerCard,
    mhFeeInformation,
    mhExtendedInformation
  },
  data() {
    return {
      activeName: "",
      tabList: [
        {
          label: "基本信息",
          name: "a",
          content: mhBasicInformation
        },
        {
          label: "住院信息",
          name: "b",
          content: mhInpatientinformation
        },
        {
          label: "诊断信息",
          name: "c",
          content: mhDiagnosticInformation
        },
        {
          label: "符合情况",
          name: "d",
          content: mhCompliance
        },
        {
          label: "手术信息",
          name: "e",
          content: mhSurgicalInformation
        },
        {
          label: "妇婴卡",
          name: "f",
          content: mhWomenAndchildrenCard
        },
        {
          label: "肿瘤卡",
          name: "g",
          content: mhCancerCard
        },
        {
          label: "费用信息",
          name: "h",
          content: mhFeeInformation
        },
        {
          label: "扩展信息",
          name: "i",
          content: mhExtendedInformation
        }
      ],
      tabsList: []
    };
  },
  created() {
    console.log(this.tabList);
    if (sessionStorage.mhActiveName) {
      this.activeName = sessionStorage.mhActiveName;
    } else {
      this.activeName = "a";
    }
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      sessionStorage.setItem("mhActiveName", this.activeName);
    }
  }
};
</script>
