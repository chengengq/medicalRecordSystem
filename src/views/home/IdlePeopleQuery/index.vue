<template>
  <!-- 空闲人员查询 -->
  <div class="main">
    <v-timer
      @childday="childDay"
      @childtime="childTime"
      @handleAxios="handleAxios"
      @handleExport="handleExport"
    ></v-timer>
    <div class="main_wrap">
      <el-table style="width: 100%" border max-height="600" :data="tableList">
        <el-table-column align="center" label="项目名称" prop="arrangeName">
        </el-table-column>
        <el-table-column
          align="center"
          label="人员姓名"
          prop="crewName"
          width="230"
        >
        </el-table-column>
        <el-table-column align="center" label="日期" prop="today" width="230">
        </el-table-column>
        <el-table-column align="center" label="星期" prop="week" width="230">
        </el-table-column>
        <el-table-column
          align="center"
          label="开始时间"
          prop="time"
          width="230"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="持续时间"
          prop="duration"
          width="230"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getLeisureCrew } from "@/api";
export default {
  data() {
    return {
      //月
      childday: sessionStorage.getItem("chooseDay"),
      childtime: sessionStorage.getItem("chooseTime"),
      time: sessionStorage.getItem("time"),
      tableList: []
    };
  },
  created() {
    this.getAxios();
  },
  methods: {
    getAxios() {
      let data = {
        day: this.childday,
        selectType: 3,
        description: this.time
      };
      this.tableList = [];
      getLeisureCrew(data).then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.tableList = res.data;
        } else {
          this.tableList = [];
        }
      });
    },
    //天
    childDay(data) {
      this.childday = data;
      console.log("childday", this.childday);
    },
    //时间段
    childTime(data) {
      this.childtime = data;
      this.time = sessionStorage.getItem("time");
      console.log("childtime", this.childtime, this.time);
    },
    //计算
    handleAxios(e) {
      this.getAxios();
    },
    handleExport() {
      let myObj = {
        method: "post",
        url: "leisure/getLeisureCrewExport",
        fileName: this.childday + "原始人员查询表",
        params: `day=${this.childday}&selectType=3&description=${this.time}`
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
  font-size: 16px;
  .main_wrap {
    padding-top: 65px;
    .table_title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      display: flex;
      div {
        flex: 1;
      }
      .title_head {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
      }
    }
    table,
    table tr th,
    table tr td {
      border: 1px solid #ccc;
      word-break: keep-all; /* 不换行 */
      white-space: nowrap; /* 不换行 */
    }
    table {
      min-height: 25px;
      line-height: 25px;
      text-align: center;
      border-collapse: collapse;
      tr th,
      tr td {
        padding: 5px;
      }
      tr {
        th {
          background: #e9eaec;
        }
        td {
          font-size: 15px;
          color: rgb(95, 90, 90);
        }
      }
      tr:nth-child(2n-1) {
        background: #f1f1f1;
      }
      tr:hover {
        cursor: pointer;
        background-color: rgba(35, 198, 200, 0.3);
      }
    }
  }
}
</style>
