<!-- 字典设置>医生设置 -->
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
                prop="fnum"
                label="工号"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fname"
                label="姓名"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="frank"
                label="职称"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="finpatientarea"
                label="病房"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fzydept"
                label="住院科室"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fdept"
                label="门诊科室"
              ></el-table-column>
              <el-table-column label="操作" width="400" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
                    >修改</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                  <el-button
                    size="small"
                    icon="el-icon-top"
                    @click="handleUp(scope.$index, scope.row)"
                    >上移</el-button
                  >
                  <el-button
                    size="small"
                    icon="el-icon-bottom"
                    @click="handleDown(scope.$index, scope.row)"
                    >下移</el-button
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

        <!--新建/编辑医生信息对话框-->
        <el-dialog
          :title="dialogTitle + '医生信息'"
          :visible.sync="isDialog"
          width="30%"
        >
          <el-form
            ref="form"
            :model="formList"
            :rules="rules"
            label-width="110px"
          >
            <el-form-item label="工号" prop="fnum">
              <el-input
                v-model="formList.fnum"
                @blur="handleDocbhBlur"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="fname">
              <el-input
                v-model="formList.fname"
                @input="handleConvertingLetters"
              ></el-input>
            </el-form-item>
            <el-form-item label="助记词" prop="fremember">
              <el-input v-model="formList.fremember"></el-input>
            </el-form-item>
            <el-form-item label="职称" prop="frank">
              <el-select
                v-model="formList.frank"
                ref="frank"
                filterable
                placeholder="请选择"
                style="width: 100%;"
              >
                <el-option
                  v-for="(item, index) in frankList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  style="text-align: center"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{
                    item.code
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="病房" prop="finpatientarea">
              <el-input v-model="formList.finpatientarea"></el-input>
            </el-form-item>
            <el-form-item label="住院科室" prop="fzydeptbh">
              <el-select
                v-model="formList.fzydeptbh"
                ref="fzydeptbh"
                filterable
                placeholder="请选择"
                style="width: 100%;"
              >
                <el-option
                  v-for="(item, index) in fzydeptList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  style="text-align: center"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{
                    item.code
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="门诊科室" prop="fdeptbh">
              <el-select
                v-model="formList.fdeptbh"
                ref="fdeptbh"
                filterable
                placeholder="请选择"
                style="width: 100%;"
              >
                <el-option
                  v-for="(item, index) in fdeptList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  style="text-align: center"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{
                    item.code
                  }}</span>
                </el-option>
              </el-select>
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
  getSetupDoctorList,
  getDeptList,
  getProfessionalList,
  getCheckDoctor,
  postAddDoctor,
  postUpdateDoctor,
  postDeleteDoctor
} from "@/api";
import pinyin from "js-pinyin";
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
      tableList: [],
      //职称
      frankList: [],
      //住院科室
      fzydeptList: [],
      //门诊科室
      fdeptList: [],
      //新建/编辑
      dialogTitle: "",
      //打开/关闭弹窗
      isDialog: false,
      //弹窗数据
      formList: {
        fid: "",
        //工号
        fnum: "",
        //医生名字
        fname: "",
        //助记词
        fremember: "",
        //职称
        frank: "",
        //病房
        finpatientarea: "",
        //住院科室编号
        fzydeptbh: "",
        //门诊科室编号
        fdeptbh: ""
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
        fremember: this.tableInput,
        pageSize: this.pagsOne.size,
        pageIndex: this.pagsOne.current
      };
      getSetupDoctorList(data).then(res => {
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
    //获取职称
    getFrankList() {
      getProfessionalList().then(res => {
        console.log(res, "职称");
        this.frankList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.frankList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.frankList = [];
        }
      });
    },
    //获取科室
    getDeptList() {
      let data = {
        type: 2
      };
      let datas = {
        type: 1
      };
      getDeptList(data).then(res => {
        console.log(res, "住院科室");
        this.fzydeptList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fzydeptList.push({
              label: item.dept,
              value: item.deptbh,
              code: item.fremember
            });
          });
        } else {
          this.fzydeptList = [];
        }
      });
      getDeptList(datas).then(res => {
        console.log(res, "门诊科室");
        this.fdeptList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fdeptList.push({
              label: item.dept,
              value: item.deptbh,
              code: item.fremember
            });
          });
        } else {
          this.fdeptList = [];
        }
      });
    },
    //输入科室名称转换首字母
    handleConvertingLetters(val) {
      console.log(val);
      pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
      this.formList.fremember = pinyin.getCamelChars(val);
    },
    //查看医生工号是否重复
    handleDocbhBlur() {
      let data = {
        fnum: this.formList.fnum
      };
      getCheckDoctor(data).then(res => {
        console.log(res, "查看医生工号是否重复");
        if (res.state === "10000") {
          this.$message.success("医生工号可正常使用");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //新建
    handleAdd() {
      this.getFrankList();
      this.getDeptList();
      this.dialogTitle = "新建";
      this.isDialog = true;
      this.formList = {
        //工号
        fnum: "",
        //医生名字
        fname: "",
        //助记词
        fremember: "",
        //职称
        frank: "",
        //病房
        finpatientarea: "",
        //住院科室编号
        fzydeptbh: "",
        //门诊科室编号
        fdeptbh: ""
      };
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.getFrankList();
      this.getDeptList();
      this.dialogTitle = "编辑";
      this.isDialog = true;
      this.formList = {
        fid: row.fid,
        //工号
        fnum: row.fnum,
        //医生名字
        fname: row.fname,
        //助记词
        fremember: row.fremember,
        //职称
        frank: row.frank,
        //病房
        finpatientarea: row.finpatientarea,
        //住院科室编号
        fzydeptbh: row.fzydeptbh,
        //门诊科室编号
        fdeptbh: row.fdeptbh
      };
    },
    //确定新建/编辑
    handleAddandEditOk() {
      if (this.dialogTitle == "新建") {
        let data = {
          //工号
          fnum: this.formList.fnum,
          //医生名字
          fname: this.formList.fname,
          //助记词
          fremember: this.formList.fremember,
          //职称
          frank: this.formList.frank,
          //病房
          finpatientarea: this.formList.finpatientarea,
          //住院科室编号
          fzydeptbh: this.formList.fzydeptbh,
          //门诊科室编号
          fdeptbh: this.formList.fdeptbh
        };
        postAddDoctor(this.$qs.stringify(data)).then(res => {
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
          //工号
          fnum: this.formList.fnum,
          //医生名字
          fname: this.formList.fname,
          //助记词
          fremember: this.formList.fremember,
          //职称
          frank: this.formList.frank,
          //病房
          finpatientarea: this.formList.finpatientarea,
          //住院科室编号
          fzydeptbh: this.formList.fzydeptbh,
          //门诊科室编号
          fdeptbh: this.formList.fdeptbh
        };
        postUpdateDoctor(this.$qs.stringify(data)).then(res => {
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
          postDeleteDoctor(this.$qs.stringify(data)).then(res => {
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
    //上移/下移
    postUpOfDown(id, index, message) {
      let data = {
        fid: id,
        fsort: index
      };
      postUpdateDoctor(this.$qs.stringify(data)).then(res => {
        console.log(res, "paixu");
        if (res.state === "10000") {
          this.$message.success(message);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //上移
    handleUp(index, row) {
      console.log(index, row);
      if (index !== 0) {
        this.postUpOfDown(row.fid, row.fsort - 1, "上移成功!");
        this.getAxios();
      } else {
        this.$message({
          message: "已经是第一条了",
          type: "warning"
        });
      }
    },
    //下移
    handleDown(index, row) {
      if (index + 1 !== this.tableList.length) {
        this.postUpOfDown(row.fid, row.fsort + 1, "下移成功!");
        this.getAxios();
      } else {
        this.$message({
          message: "已经是最后一条了",
          type: "warning"
        });
      }
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
      let title = "医生字典设置表";
      let myObj = {
        method: "post",
        url: "doctorSetting/doctorExport",
        fileName: title,
        params: `title=${title}&fremember=${this.tableInput}&pageSize=999999&pageIndex=1`
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
