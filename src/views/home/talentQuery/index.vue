<template>
  <div class="main">
    <v-timer
      :isProject="true"
      @childmonth="childMonth"
      @childProject="childProject"
      @handleAxios="handleAxios"
      @handleExport="handleExport"
    ></v-timer>
    <div class="main_wrap">
      <div class="table_title">
        <div></div>
        <div class="title_head">剧场排班表</div>
        <div></div>
      </div>
      <el-table style="width: 100%" border max-height="600" :data="tableList">
        <el-table-column
          align="center"
          label="人员姓名"
          prop="crewName"
          width="120"
        >
        </el-table-column>
        <el-table-column
          v-for="(item, index) in tableTitle"
          :key="index"
          align="center"
          :label="item.label_name"
          :prop="item.value_name"
          :width="tableTitle.length < 10 ? '' : '200'"
        >
        </el-table-column>
      </el-table>
      <!-- <table>
        <tr>
          <th
            :style="tableTitle.length < 10 ? 'width: 100%;' : ''"
            v-for="(item, index) in tableTitle"
            :key="index"
          >
            {{ item.label_name }}
          </th>
        </tr>
        <tr v-for="(item, index) in tableList" :key="index">
          <td v-for="(items, indexs) in tableTitle" :key="indexs + 'a'">
            {{ item[items.value_name] }}
          </td>
        </tr>
      </table> -->
    </div>
  </div>
</template>

<script>
import { getTalentsTable } from "@/api";
export default {
  data() {
    return {
      //月
      childmonth: sessionStorage.getItem("chooseMonth"),
      projectValue: "",
      tableTitle: [],
      tableList: [],
      isTable: false
    };
  },
  created() {
    this.getAxios();
  },
  methods: {
    getAxios() {
      let data = {
        month: this.childmonth,
        selectType: 2,
        itemsId: String(this.projectValue)
      };
      this.tableTitle = [];
      this.tableList = [];
      getTalentsTable(data).then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.isTable = true;
          this.tableTitle = res.column;
          this.tableList = res.data;
        } else {
          this.isTable = false;
          this.tableTitle = [];
          this.tableList = [];
        }
      });
    },
    //月
    childMonth(data) {
      this.childmonth = data;
      console.log("childmonth", this.childmonth);
    },
    //选择项目
    childProject(data) {
      this.projectValue = data;
      console.log("projectValue", this.projectValue);
      this.getAxios();
    },
    //计算
    handleAxios(e) {
      this.getAxios();
    },
    handleExport() {
      let myObj = {
        method: "post",
        url: "original/talentsTableExport",
        fileName: this.childmonth + "原始人员查询表",
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
