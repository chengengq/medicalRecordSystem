<template>
  <div class="main">
    <v-timer
      @childmonth="childMonth"
      @handleAxios="handleAxios"
      @handleExport="handleExport"
    ></v-timer>
    <div class="main_wrap">
      <div class="table_title">剧场排班表</div>
      <!-- <table>
        <tr>
          <th colspan="2" v-for="(item, index) in tableTitle" :key="index">
            {{ item.arrangeName }}
          </th>
        </tr>
        <tr v-for="(item, index) in tableList" :key="index">
            <td>
              {{ tableList[index]["name" + indexs] }}
            </td>
            <td>
              {{ tableList[index]["value" + indexs] }}
            </td>
        </tr>
      </table> -->
      <el-table style="width: 100%" border max-height="600" :data="tableList">
        <el-table-column
          v-for="(item, index) in tableTitle"
          :key="index"
          align="center"
          :label="tableList[0]['item' + index]"
        >
          <el-table-column
            align="center"
            :prop="'name' + index"
            label="姓名"
            width="100"
          >
          </el-table-column>
          <el-table-column
            align="center"
            :prop="'value' + index"
            label="天数"
            width="80"
          >
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getWorkloadTable } from "@/api";
export default {
  data() {
    return {
      //月
      childmonth: sessionStorage.getItem("chooseMonth"),
      tableList: [],
      tableTitle: []
    };
  },
  created() {
    this.getAxios();
  },
  methods: {
    getAxios() {
      let data = {
        month: this.childmonth,
        selectType: 2
      };
      getWorkloadTable(data).then(res => {
        console.log(res);
        this.tableList = [];
        this.tableTitle = [];
        if (res.state === "10000") {
          this.tableTitle = res.result.title;
          this.tableList = res.result.workLoad;
        } else {
          this.tableList = [];
          this.tableTitle = [];
        }
      });
    },
    //月
    childMonth(data) {
      this.childmonth = data;
      console.log("childmonth", this.childmonth);
    },
    //计算
    handleAxios(e) {
      this.getAxios();
    },
    handleExport() {
      let myObj = {
        method: "post",
        url: "scheduling/workloadTableExport",
        fileName: this.childmonth + "工作量统计表",
        params: `month=${this.childmonth}&selectType=2`
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
  font-size: 17px;
  .main_wrap {
    padding-top: 65px;
    .table_title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 22px;
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>
