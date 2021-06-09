<template>
  <!-- 调休导出 -->
  <div class="main">
    <div class="times">
      <div class="times_wrap">
        <div class="choose_frame" v-if="$route.name != 'IdlePeopleQuery'">
          <!-- 月 -->
          <div>
            月份选择：
            <el-date-picker
              v-model="month"
              @change="changeMonth"
              :clearable="false"
              :editable="false"
              type="month"
              placeholder="选择月"
              value-format="yyyy-MM"
            ></el-date-picker>
          </div>
        </div>
        <!-- 相关按钮 计算 导出 -->
        <div class="button_out">
          <el-button type="success" size="medium" @click="handleExports"
            >模板导出</el-button
          >
        </div>
        <div class="button_out">
          <el-upload
            ref="upload"
            class="upload-demo"
            :action="ipAddress"
            :headers="headers"
            :on-success="upSuccess"
            :on-remove="handleRemove"
            :data="{ month: month, selectType: 2 }"
            multiple
            :limit="1"
            :file-list="fileList"
            name="file"
          >
            <el-button size="medium" type="success">文件上传</el-button>
          </el-upload>
        </div>
        <div class="tips">
          导入excel文件格式严格按照模板格式，否则会解析失败
        </div>
      </div>
    </div>
    <div class="main_wrap">
      <div class="table_title">{{ tableHead }}展教组排班表</div>
      <el-table style="width: 100%" border max-height="600" :data="tableList">
        <el-table-column
          fixed
          align="center"
          label="序号"
          type="index"
          width="70"
        >
        </el-table-column>
        <el-table-column
          fixed
          align="center"
          prop="title"
          label="姓名"
          :width="tableTitleIndex == 0 ? '' : '120'"
        >
        </el-table-column>
        <el-table-column
          v-for="(item, index) in tableTitleIndex"
          :key="index"
          align="center"
          :label="String(index + 1)"
        >
          <el-table-column
            align="center"
            :label="tableTitle[1]['value_' + (index + 1)]"
            :prop="'value_' + (index + 1)"
            width="80"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          :prop="'value_' + (tableTitleIndex + 1)"
          label="备注"
          :width="tableTitleIndex == 0 ? '' : '200'"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { date } from "@/utils/date.js";
import axios from "axios";
export default {
  data() {
    return {
      //月
      month: sessionStorage.getItem("chooseMonth"),
      formData: null,
      fileName: "",
      fileList: [],
      // 弹窗参数
      headers: {
        token: sessionStorage.getItem("token")
      },
      ipAddress: window.axiosUrl.ip + "system/restFromExcel",
      tableList: [],
      tableTitle: [],
      tableTitleIndex: 0,
      tableHead: ""
    };
  },
  created() {},
  methods: {
    //月
    changeMonth(data) {
      this.month = data;
      console.log("month", this.month);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    upSuccess(response, file, fileList) {
      if (response.state === "1000") {
        this.tableHead = date(this.month, "yyyy年M月");
        this.$message.success("调休表上传成功!");
        this.tableList = response.result.name;
        this.tableTitle = response.result.title;
        this.tableTitleIndex = Object.keys(this.tableList[0]).length - 4;
        console.log(response, file, fileList, this.tableTitleIndex);
        this.fileName = file.name.substring(0, file.name.indexOf("."));
        this.formData = new FormData();
        this.formData.append("file", file.raw);
        this.$refs.upload.clearFiles();
      } else {
        this.tableList = [];
        this.tableTitle = [];
        this.tableTitleIndex = 0;
        this.$message.error(response.message);
      }
    },
    handleExports() {
      let myObj = {
        method: "post",
        url: "system/downRestExcelTemplate",
        fileName: "调休模板导出"
      };
      this.exportMethod(myObj);
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  .times {
    width: 100%;
    //   border-bottom: 1px solid #ccc;
    border-bottom: 15px solid #f5f5f5;
    height: 50px;
    position: fixed;
    z-index: 999;
    .times_wrap {
      width: 100%;
      height: 100%;
      display: flex;
      background: #fff;
      align-items: center;
      justify-content: flex-start;
      .button_out {
        margin-left: 20px;
      }
      .tips {
        margin-left: 20px;
        color: rgb(184, 10, 10);
        font-size: 15px;
        font-weight: bold;
      }
    }
  }
  .main_wrap {
    padding-top: 65px;
    width: 100%;
    .table_title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 22px;
      font-weight: bold;
      text-align: center;
    }
    /deep/ .upload-demo {
      display: flex;
      justify-content: space-between;
      flex-flow: row-reverse;
      //      .el-upload-list {
      //   display: none !important;
      // }
    }
  }
}
</style>
