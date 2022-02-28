<!-- 病案录入>病案首页数据核查 -->
<template>
  <div class="main">
    <div class="main_wrap">
      <div class="main_wraps">
        <div class="table_main">
          <div class="table_top">
            <div class="table_top_wrap">
              <el-button size="small" type="success" @click="handleExport"
                >导出</el-button
              >
            </div>
          </div>
          <div class="table_form">
            <div class="table_form_wrap">
              <div class="table_form_wrap_row">
                <span class="term_head">筛选：</span>
                <el-select
                  class="option_date"
                  v-model="dateOption"
                  size="small"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in dateList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="table_form_wrap_row">
                <el-date-picker
                  class="daterange_date"
                  v-model="daterangeValue"
                  @change="handleDate"
                  size="small"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  placeholder="选择日期yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </div>
              <div class="table_form_wrap_row">
                <el-button size="small" type="primary" @click="handleCheck"
                  >核查</el-button
                >
                <el-button size="small" type="primary" @click="getAxios"
                  >查询</el-button
                >
              </div>
            </div>
          </div>
          <div class="tables">
            <el-table
              style="width: 100%"
              border
              stripe
              max-height="580"
              :data="tableList"
            >
              <el-table-column
                type="index"
                align="center"
                label="序号"
                width="50"
              >
              </el-table-column>
              <el-table-column
                align="center"
                prop="fprn"
                label="病案号"
                width="100"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="ftimes"
                label="住院次数"
                width="100"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fname"
                label="姓名"
                width="100"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fcydept"
                label="出院科别"
                width="250"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fhint"
                label="提示内容"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fexplain"
                label="说明"
              ></el-table-column>
              <el-table-column align="center" label="标记" width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.fsign == "0" ? "必改" : "核实" }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <new-pagination
            @current-change="handleCurrentChangeExp"
            :page-size="pagsOne.size"
            @size-change="handleChangeSize"
            layout="total, prev, pager, next,sizes"
            :total="pagsOne.total"
          ></new-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInspect, getInspectList } from "@/api";
export default {
  data() {
    return {
      dateOption: "1",
      //核查条件
      dateList: [
        {
          label: "出院日期",
          value: "1"
        },
        {
          label: "入院日期",
          value: "2"
        },
        {
          label: "录入日期",
          value: "3"
        }
      ],
      //核查日期
      daterangeValue: sessionStorage.meDataVerificationDate
        ? JSON.parse(sessionStorage.meDataVerificationDate)
        : [],
      tableList: [],
      //分页
      pagsOne: {
        total: 0,
        size: 10,
        current: 1
      }
    };
  },
  created() {},
  methods: {
    handleDate() {
      sessionStorage.setItem(
        "meDataVerificationDate",
        JSON.stringify(this.daterangeValue)
      );
    },
    //核查
    handleCheck() {
      let data = {
        type: this.dateOption,
        startDate: this.daterangeValue[0],
        endDate: this.daterangeValue[1]
      };
      getInspect(data).then(res => {
        console.log(res, "核查");
        if (res.state === "10000") {
          this.getAxios();
          this.$message.success("核查成功");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getAxios() {
      let data = {
        type: this.dateOption,
        startDate: this.daterangeValue[0],
        endDate: this.daterangeValue[1],
        pageSize: this.pagsOne.size,
        pageIndex: this.pagsOne.current
      };
      getInspectList(data).then(res => {
        console.log(res, "res");
        if (res.state === "10000") {
          this.tableList = res.result;
          this.pagsOne.total = res.pageTotal;
        } else {
          this.tableList = [];
          this.pagsOne.total = 0;
        }
      });
    },
    //总页数
    handleCurrentChangeExp(val) {
      this.pagsOne.current = val;
      this.getAxios();
    },
    //页码数
    handleChangeSize(val) {
      this.pagsOne.size = val;
      this.getAxios();
    },
    handleExport() {
      let title = "病案首页数据核查表";
      let myObj = {
        method: "post",
        url: "medical/inspectListExport",
        fileName: title,
        params: `title=${title}&type=${this.dateOption}&startDate=${this.daterangeValue[0]}&endDate=${this.daterangeValue[1]}&pageSize=999999&pageIndex=1`
      };
      this.exportMethod(myObj);
    }
  }
};
</script>

<style lang="scss" scoped>
.table_main {
  width: 100%;
  height: 100%;
  .table_top {
    padding: 0 5px;
    .table_top_wrap {
      width: 100%;
      height: 50px;
      line-height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .el-input {
        width: 200px;
      }
      div {
        padding-left: 5px;
        span {
          color: rgb(102, 89, 89);
        }
      }
    }
  }
  .tables {
    width: 100%;
  }
}
</style>
