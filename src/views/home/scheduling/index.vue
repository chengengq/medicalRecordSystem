<template>
  <div class="main">
    <v-timer
      @childmonth="childMonth"
      @handleAxios="handleAxios"
      @handleScheduling="handleScheduling"
      @handleExport="handleExport"
    ></v-timer>
    <div class="main_wrap">
      <div class="table_title">剧场排班表</div>
      <table v-if="isTable">
        <tr>
          <th colspan="2">项目</th>
          <th v-for="(item, index) in tableTitle" :key="index">
            {{ item.arrangeName }}
          </th>
        </tr>
        <tr>
          <th colspan="2">持续时间</th>
          <th v-for="(item, index) in tableTitle" :key="index + 'a'">
            {{ item.duration }}
          </th>
        </tr>
        <tr>
          <th colspan="2">周二-周五准备时间</th>
          <th v-for="(item, index) in tableTitle" :key="index + 'a'">
            {{ item.weekdays }}
          </th>
        </tr>
        <tr>
          <th colspan="2">周六、周末准备时间</th>
          <th v-for="(item, index) in tableTitle" :key="index + 'c'">
            {{ item.holiday }}
          </th>
        </tr>
        <tr>
          <th>排班</th>
          <th>该项人数<i class="el-icon-right"></i></th>
          <th v-for="(item, index) in tableTitle" :key="index + 'd'">
            {{ item.count }}
          </th>
        </tr>
        <tr v-for="(item, index) in tableList" :key="index">
          <td>{{ item.time }}</td>
          <td>{{ item.week }}</td>
          <td
            v-for="(items, indexs) in tableTitle"
            :key="indexs + 'list'"
            :style="
              tableList[index].value0 == '闭馆' ? 'background: #929191;' : ''
            "
          >
            <!-- :class="'table_span_' + index + '_' + indexs" -->
            <span
              :style="
                tableList[index]['flag_' + indexs] == '1' ? 'color: red;' : ''
              "
              >{{
                tableList[index]["value" + indexs] == "空缺"
                  ? ""
                  : tableList[index]["value" + indexs]
              }}</span
            >
          </td>
        </tr>
      </table>

      <div class="not_table" v-if="!isTable">暂无数据</div>
    </div>

    <!-- <el-table style="width: 100%" border :data="[]">
      <el-table-column
        v-for="(item, index) in tableTitleHead"
        :key="index"
        :label="item"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          {{ scope.row[index] }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in tableTitleHead1"
        :key="index + 'a'"
        :label="item"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          {{ scope.row[index] }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in tableTitleHead2"
        :key="index + 'b'"
        :label="item"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          {{ scope.row[index] }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in tableTitleHead3"
        :key="index + 'c'"
        :label="item"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          {{ scope.row[index] }}
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
import { getWorkforce, getWorkforceTable } from "@/api";
export default {
  data() {
    return {
      //月
      childmonth: sessionStorage.getItem("chooseMonth"),
      tableTitle: [],
      tableTab: [],
      tableList: [],
      tableTitleHead: [],
      tableTitleHead1: [],
      tableTitleHead2: [],
      tableTitleHead3: [],
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
        selectType: 2
      };
      this.tableTitle = [];
      this.tableTab = [];
      this.tableList = [];
      this.tableTitleHead = [];
      this.tableTitleHead1 = [];
      this.tableTitleHead2 = [];
      this.tableTitleHead3 = [];
      getWorkforceTable(data).then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.isTable = true;
          this.tableTitle = res.result.title;
          this.tableTab = res.result.time;
          this.tableList = res.result.schedule;
          //   this.tableTitle.forEach((item, index) => {
          //     Object.keys(item).forEach(key => {});
          //   });
          console.log(this.tableList);
          this.tableTitle.forEach(item => {
            this.tableTitleHead.push(item.arrangeName);
            this.tableTitleHead1.push(item.duration);
            this.tableTitleHead2.push(item.holiday);
            this.tableTitleHead3.push(item.weekdays);
          });
        } else {
          this.isTable = false;
          this.tableTitle = [];
          this.tableTab = [];
          this.tableList = [];
          this.tableTitleHead = [];
          this.tableTitleHead1 = [];
          this.tableTitleHead2 = [];
          this.tableTitleHead3 = [];
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
    //开始排班
    handleScheduling(e) {
      let data = {
        month: this.childmonth,
        selectType: 2
      };
      getWorkforce(data).then(res => {
        console.log(res, 2);
        const loading = this.$loading({
          lock: true,
          text: "正在重新排班中，请稍等",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        if (res.state === "10000") {
          setTimeout(() => {
            loading.close();
            this.$message.success("排班成功！点击计算获取排班表");
          }, 5000);
        } else {
          loading.close();
          this.$message.error(res.message);
        }
      });
    },
    handleExport() {
      let myObj = {
        method: "post",
        url: "scheduling/getWorkforceTableExport",
        fileName: this.childmonth + "排班表",
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
          font-size: 16px;
          color: rgb(95, 90, 90);
        }
        td:first-child,
        td:nth-child(2) {
          background: #f1f1f1;
          font-size: 17px;
          color: #000;
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
