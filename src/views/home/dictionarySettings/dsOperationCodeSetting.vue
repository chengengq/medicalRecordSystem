<!-- 字典设置>手术码设置 -->
<template>
  <div class="main">
    <div class="main_wrap">
      <div class="main_wraps">
        <div class="table_main">
          <div class="table_top">
            <div class="table_top_wrap">
              <el-button size="small" type="primary" @click="getAxios"
                >刷新</el-button
              >
              <el-button size="small" type="success" @click="handleExport"
                >导出</el-button
              >
            </div>
          </div>
          <div class="table_form">
            <div class="table_form_wrap">
              <div class="table_form_wrap_row">
                <span>查询：</span
                ><el-input
                  class="el_input"
                  size="small"
                  v-model="tableInput"
                  clearable
                  placeholder="输入可模糊查询"
                  @input="getAxios()"
                ></el-input>
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
                width="60"
              >
              </el-table-column>
              <el-table-column
                align="center"
                prop="fopcode"
                label="手术码"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fop"
                label="手术名称"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fzjc"
                label="助记词"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fzjc"
                label="手术类别"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fzjc"
                label="手术分级"
              ></el-table-column>
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
import { getOperationList } from "@/api";
export default {
  data() {
    return {
      //分页
      pagsOne: {
        total: 0,
        size: 10,
        current: 1
      },
      tableInput: "",
      tableList: []
    };
  },
  created() {
    this.getAxios();
  },
  methods: {
    getAxios() {
      let data = {
        fzjc: this.tableInput,
        pageSize: this.pagsOne.size,
        pageIndex: this.pagsOne.current
      };
      getOperationList(data).then(res => {
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
      let title = "手术码字典设置表";
      let myObj = {
        method: "post",
        url: "paySetting/operationExport",
        fileName: title,
        params: `title=${title}&fzjc=${this.tableInput}&pageSize=999999&pageIndex=1`
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
      flex-direction: row-reverse;
      .el-button {
        margin-right: 5px;
      }
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
