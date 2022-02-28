<!-- 字典设置>诊断码设置 -->
<template>
  <div class="main">
    <div class="main_wrap">
      <div class="main_wraps">
        <div class="table_main">
          <el-radio-group v-model="icdRadio" @change="handleRadio">
            <el-radio-button label="1">广东码</el-radio-button>
            <el-radio-button label="2">国家码</el-radio-button>
          </el-radio-group>
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
              <div>
                <span>查询：</span
                ><el-input
                  size="small"
                  v-model="tableInput"
                  clearable
                  placeholder="输入可模糊查询"
                  @input="getAxios()"
                ></el-input>
              </div>
              <div>
                <el-button
                  :disabled="icdRadio == 2"
                  size="small"
                  type="primary"
                  @click="handleAdd"
                  >新建</el-button
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
                width="60"
              >
              </el-table-column>
              <el-table-column
                align="center"
                prop="icdm"
                label="诊断编码"
                width="200"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="icdmName"
                label="诊断名称"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fzjc"
                label="助记词"
              ></el-table-column>
              <el-table-column label="操作" width="300" align="center">
                <template slot-scope="scope">
                  <el-button
                    :disabled="icdRadio == 2"
                    size="small"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
                    >修改</el-button
                  >
                  <el-button
                    :disabled="icdRadio == 2"
                    size="small"
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
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

        <!--新建/编辑诊断码信息对话框-->
        <el-dialog
          :title="dialogTitle + '诊断码'"
          :visible.sync="isDialog"
          width="30%"
        >
          <el-form
            ref="form"
            :model="formList"
            :rules="rules"
            label-width="110px"
          >
            <el-form-item label="诊断编码" prop="ficdm">
              <el-input ref="ficdm" v-model="formList.ficdm"></el-input>
            </el-form-item>
            <el-form-item label="诊断名称" prop="ficdname">
              <el-input
                ref="ficdname"
                v-model="formList.ficdname"
                @input="handleConvertingLetters"
              ></el-input>
            </el-form-item>
            <el-form-item label="助记词" prop="fzjc">
              <el-input v-model="formList.fzjc"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleAddandEditOk"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDiagnoseList,
  postDSCAddDiagnose,
  postDSCUpdateDiagnose,
  postDSCDeleteDiagnose
} from "@/api";
import pinyin from "js-pinyin";
export default {
  data() {
    return {
      icdRadio: sessionStorage.icdRadio,
      //分页
      pagsOne: {
        total: 0,
        size: 10,
        current: 1
      },
      tableInput: "",
      tableList: [],
      //新建/编辑
      dialogTitle: "",
      //打开/关闭弹窗
      isDialog: false,
      //弹窗数据
      formList: {
        fid: "",
        //诊断编码
        ficdm: "",
        //诊断名称
        ficdname: "",
        //助记词
        fzjc: ""
      },
      rules: {}
    };
  },
  created() {
    if (sessionStorage.icdRadio) {
      this.icdRadio = sessionStorage.icdRadio;
    } else {
      this.icdRadio = "1";
      sessionStorage.setItem("icdRadio", "1");
    }
    this.getAxios();
  },
  methods: {
    getAxios() {
      let data = {
        type: this.icdRadio,
        fzjc: this.tableInput,
        pageSize: this.pagsOne.size,
        pageIndex: this.pagsOne.current
      };
      getDiagnoseList(data).then(res => {
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
    //输入付款方式名称转换首字母
    handleConvertingLetters(val) {
      console.log(val);
      pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
      this.formList.fzjc = pinyin.getCamelChars(val);
    },
    //新建
    handleAdd() {
      this.dialogTitle = "新建";
      this.isDialog = true;
      this.formList = {
        //付款方式编号
        ficdm: "",
        //付款方式名称
        ficdname: "",
        //助记词
        fzjc: ""
      };
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogTitle = "编辑";
      this.isDialog = true;
      this.formList = {
        fid: row.fid,
        //付款方式编号
        ficdm: row.ficdm,
        //付款方式名称
        ficdname: row.ficdname,
        //助记词
        fzjc: row.fzjc
      };
    },
    //确定新建/编辑
    handleAddandEditOk() {
      if (this.dialogTitle == "新建") {
        let data = {
          type: this.icdRadio,
          //付款方式编号
          ficdm: this.formList.ficdm,
          //付款方式名称
          ficdname: this.formList.ficdname,
          //助记词
          fzjc: this.formList.fzjc
        };
        postDSCAddDiagnose(this.$qs.stringify(data)).then(res => {
          if (res.state === "10000") {
            this.$message({
              type: "success",
              message: "新增成功"
            });
            this.isDialog = false;
            this.formList = {};
            this.getAxios();
          } else {
            this.$message.error(res.message);
          }
        });
      } else {
        let data = {
          type: this.icdRadio,
          fid: this.formList.fid,
          //付款方式编号
          ficdm: this.formList.ficdm,
          //付款方式名称
          ficdname: this.formList.ficdname,
          //助记词
          fzjc: this.formList.fzjc
        };
        postDSCUpdateDiagnose(this.$qs.stringify(data)).then(res => {
          if (res.state === "10000") {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.isDialog = false;
            this.formList = {};
            this.getAxios();
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
      let data = {
        type: this.icdRadio,
        fid: row.fid
      };
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postDSCDeleteDiagnose(this.$qs.stringify(data)).then(res => {
            if (res.state === "10000") {
              this.$message.success("删除医生数据成功!");
              this.tableList.splice(index, 1);
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
    handleRadio(val) {
      this.icdRadio = val;
      sessionStorage.setItem("icdRadio", this.icdRadio);
      this.getAxios();
    },
    handleExport() {
      let title = "诊断码设置表";
      let myObj = {
        method: "post",
        url: "paySetting/diagnoseExport",
        fileName: title,
        params: `title=${title}&type=${this.icdRadio}&fzjc=${this.tableInput}&pageSize=999999&pageIndex=1`
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
  .table_form {
    background: #f7f8fa;
    padding: 0 5px;
    margin-bottom: 5px;
    .table_form_wrap {
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
