<!-- 字典设置>付款方式设置 -->
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
                <el-button size="small" type="primary" @click="handleAdd"
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
                prop="fkfsbh"
                label="付款方式编号"
                width="200"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fkfsname"
                label="付款方式名称"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fzjc"
                label="助记词"
              ></el-table-column>
              <el-table-column label="操作" width="300" align="center">
                <template slot-scope="scope">
                  <el-button
                    :disabled="scope.row.fparentId == 0"
                    size="small"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
                    >修改</el-button
                  >
                  <el-button
                    :disabled="scope.row.fparentId == 0"
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
            layout="total"
            :total="pagsOne.total"
          ></new-pagination>
        </div>

        <!--新建/编辑付款方式信息对话框-->
        <el-dialog
          :title="dialogTitle + '付款方式'"
          :visible.sync="isDialog"
          width="30%"
        >
          <el-form
            ref="form"
            :model="formList"
            :rules="rules"
            label-width="110px"
          >
            <el-form-item label="付款方式类别" prop="fkfs">
              <el-select
                v-model="formList.fkfs"
                ref="fkfs"
                filterable
                placeholder="请选择"
                @change="handleSelect"
                style="width: 100%;"
              >
                <el-option
                  v-for="(item, index) in fkfsList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款方式编号" prop="fkfsbh">
              <el-input ref="fkfsbh" v-model="formList.fkfsbh">
                <template slot="prepend">{{ formList.fkfs }}</template>
              </el-input>
            </el-form-item>
            <el-form-item label="付款方式名称" prop="fkfsname">
              <el-input
                ref="fkfsname"
                v-model="formList.fkfsname"
                @input="handleConvertingLetters"
              ></el-input>
            </el-form-item>
            <el-form-item label="助记词" prop="fzjc">
              <el-input v-model="formList.fzjc"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isDialog = false">取消</el-button>
            <el-button type="primary" @click="handleAddandEditOk"
              >确定</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPaymentList,
  postAddPayment,
  postUpdatePayment,
  postDeletePayment
} from "@/api";
import pinyin from "js-pinyin";
export default {
  data() {
    return {
      //分页
      pagsOne: {
        total: 0
      },
      tableInput: "",
      tableList: [],
      //付款方式类别
      fkfsList: [],
      //新建/编辑
      dialogTitle: "",
      //打开/关闭弹窗
      isDialog: false,
      //弹窗数据
      formList: {
        fid: "",
        fparentId: "",
        //付款方式编号
        fkfsbh: "",
        //付款方式名称
        fkfsname: "",
        //助记词
        fzjc: "",
        //付款方式类别
        fkfs: ""
      },
      rules: {}
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
      getPaymentList(data).then(res => {
        console.log(res, "res");
        if (res.state === "10000") {
          this.tableList = res.result;
          this.pagsOne.total = Number(res.result.length);
        } else {
          this.tableList = [];
          this.pagsOne.total = 0;
        }
      });
    },
    //获取付款方式类别
    getFkfsList() {
      getPaymentList().then(res => {
        console.log(res, "付款方式类别");
        this.fkfsList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            if (item.fparentId == 0) {
              this.fkfsList.push({
                label: item.fkfsbh + "——" + item.fkfsname,
                value: item.fkfsbh,
                code: item.fid
              });
            }
          });
          this.formList.fkfs = this.fkfsList[0].value;
          this.formList.fparentId = this.fkfsList[0].code;
        } else {
          this.fkfsList = [];
          this.formList.fkfs = "";
          this.formList.fparentId = "";
        }
      });
    },
    //改变付款方式类别时获取fid
    handleSelect(val) {
      this.fkfsList.forEach((item, index) => {
        if (val == item.value) {
          this.formList.fparentId = item.code;
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
      this.getFkfsList();
      this.dialogTitle = "新建";
      this.isDialog = true;
      this.formList = {
        fparentId: this.formList.fparentId,
        //付款方式编号
        fkfsbh: "",
        //付款方式名称
        fkfsname: "",
        //助记词
        fzjc: "",
        //付款方式类别
        fkfs: ""
      };
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.getFkfsList();
      this.dialogTitle = "编辑";
      this.isDialog = true;
      this.formList = {
        fid: row.fid,
        fparentId: row.fparentId,
        //付款方式编号
        fkfsbh: row.fkfsbh,
        //付款方式名称
        fkfsname: row.fkfsname,
        //助记词
        fzjc: row.fzjc,
        //付款方式类别
        fkfs: row.fkfs
      };
    },
    //确定新建/编辑
    handleAddandEditOk() {
      if (this.dialogTitle == "新建") {
        let data = {
          //父节点
          fparentId: this.formList.fparentId,
          //付款方式编号
          fkfsbh: String(this.formList.fkfs) + String(this.formList.fkfsbh),
          //付款方式名称
          fkfsname: this.formList.fkfsname,
          //助记词
          fzjc: this.formList.fzjc,
          //付款方式类别
          fkfs: this.formList.fkfs
        };
        postAddPayment(this.$qs.stringify(data)).then(res => {
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
          fid: this.formList.fid,
          //父节点
          fparentId: this.formList.fparentId,
          //付款方式编号
          fkfsbh: this.formList.fkfsbh,
          //付款方式名称
          fkfsname: this.formList.fkfsname,
          //助记词
          fzjc: this.formList.fzjc,
          //付款方式类别
          fkfs: this.formList.fkfs
        };
        postUpdatePayment(this.$qs.stringify(data)).then(res => {
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
        fid: row.fid
      };
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postDeletePayment(this.$qs.stringify(data)).then(res => {
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
    handleExport() {
      let title = "付款方式设置表";
      let myObj = {
        method: "post",
        url: "paySetting/paymentListExport",
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
