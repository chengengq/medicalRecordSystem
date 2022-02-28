<template>
  <!-- 系统管理>用户管理 -->
  <div class="main">
    <div class="main_wrap">
      <div class="main_wraps">
        <div class="table_main">
          <div class="table_form">
            <div class="table_form_wrap">
              <div>
                <span>查询：</span>
                <el-input
                  size="small"
                  v-model="tableInput"
                  class="el_input"
                  clearable
                  placeholder="可输入账号名称或姓名来查询"
                  @input="getAxios(tableInput)"
                ></el-input>
                <el-button
                  size="small"
                  type="success"
                  icon="el-icon-plus"
                  @click="handleAdd()"
                  >新建</el-button
                >
              </div>
            </div>
          </div>
          <div class="tables">
            <el-table
              style="width: 100%"
              border
              max-height="520"
              :data="tableListOne"
              fit
            >
              <el-table-column
                type="index"
                align="center"
                label="序号"
                width="50"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="loginName"
                label="账号"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="employeeId"
                label="员工工号"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="userName"
                label="姓名"
              ></el-table-column>
              <el-table-column align="center" label="状态" width="80">
                <template slot-scope="scope">
                  <span
                    :style="
                      scope.row.userCondition == '启用'
                        ? 'color: green'
                        : 'color: red'
                    "
                    >{{ scope.row.userCondition }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
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
        <el-dialog
          title="新建用户信息"
          :visible.sync="addDialog"
          width="25%"
          :modal="false"
          :lock-scroll="false"
        >
          <el-form :model="addDialogForm" :rules="rules" label-width="90px">
            <el-form-item label="账号：">
              <el-input
                @change="handleLogin"
                v-model="addDialogForm.addName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="addPassword">
              <el-input
                show-password
                v-model="addDialogForm.addPassword"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="新建姓名：">
              <el-input
                v-model="addDialogForm.addNewName"
                autocomplete="off"
                placeholder="下方医生名称不存在,可新建医生"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名：">
              <el-select
                :disabled="addDialogForm.addNewName ? true : false"
                :placeholder="
                  addDialogForm.addNewName ? '新建医生时不可选' : '请选择'
                "
                @change="handleUserId"
                filterable
                default-first-option
                v-model="addDialogForm.addUserName"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{
                    item.code
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工号：">
              <el-input
                v-model="addDialogForm.addJobNumber"
                autocomplete="off"
              ></el-input>
              <!-- <el-select filterable v-model="DialogForm.addJobNumber">
              <el-option label="启用" value="1"></el-option>
              <el-option label="停用" value="2"></el-option>
            </el-select> -->
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleAddOk">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="修改员工信息"
          :visible.sync="editDialog"
          width="30%"
          :rules="rules1"
          :modal="false"
          :lock-scroll="false"
        >
          <el-form :model="DialogForm" label-width="90px">
            <el-form-item label="账号：">
              <el-input
                v-model="DialogForm.editName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="editPassword">
              <el-input
                v-model="DialogForm.editPassword"
                autocomplete="off"
                placeholder="默认不修改密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="员工工号：">
              <el-input
                v-model="DialogForm.editJobNumber"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="员工姓名：">
              <el-input
                v-model="DialogForm.editUserName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select filterable v-model="DialogForm.editStatus">
                <el-option label="启用" value="1"></el-option>
                <el-option label="停用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleEditOk">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUserList,
  getCheckLogingName,
  getDoctorList,
  postAddUser,
  postUpdateUser,
  postDeleteUser
} from "@/api";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (this.addDialogForm.addPassword.length < 6) {
        callback(new Error("密码长度限制最少六位!"));
      } else if (this.addDialogForm.addPassword.length > 12) {
        callback(new Error("密码长度限制最高十二位!"));
      } else {
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (this.DialogForm.editPassword.length < 6) {
        callback(new Error("密码长度限制最少六位!"));
      } else if (this.DialogForm.editPassword.length > 12) {
        callback(new Error("密码长度限制最高十二位!"));
      } else {
        callback();
      }
    };
    return {
      //分页
      pagsOne: {
        total: 1,
        size: 10,
        current: 1
      },
      tableListOne: [],
      //新建弹出框显示/隐藏
      options: [],
      tableInput: "",
      addDialog: false,
      // 新建弹窗存储数据的表单
      addDialogForm: {
        addName: "",
        addPassword: "",
        addNewName: "",
        addUserName: "",
        addJobNumber: "",
        addId: ""
      },
      rules: {
        addPassword: [{ validator: validatePass, trigger: "blur" }]
      },
      //修改弹出框显示/隐藏
      editDialog: false,
      // 修改弹窗存储数据的表单
      DialogForm: {
        editName: "",
        editPassword: "",
        editUserName: "",
        editJobNumber: "",
        editStatus: "",
        id: ""
      },
      rules1: {
        editPassword: [{ validator: validatePass1, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getAxios();
    this.getUser();
  },
  mounted() {},
  methods: {
    //获取姓名
    getUser() {
      let data = {
        fremember: ""
      };
      getDoctorList(data).then(res => {
        console.log(res, "user");
        if (res.state === "10000") {
          res.result.forEach(item => {
            this.options.push({
              label: item.docName,
              value: item.docId,
              code: item.fremember
            });
          });
          setTimeout(() => {
            this.addDialogForm.addUserName = this.options[0].value;
            this.addDialogForm.addJobNumber = this.options[0].value;
          }, 200);
        } else {
          this.options = [];
        }
      });
    },
    //选择姓名显示相应工号
    handleUserId(value) {
      console.log(value, "value");
      this.addDialogForm.addJobNumber = value;
    },
    getAxios() {
      let data = {
        description: this.tableInput,
        pageSize: this.pagsOne.size,
        pageIndex: this.pagsOne.current
      };
      getUserList(data).then(res => {
        console.log(res, 1);
        if (res.state === "10000") {
          this.tableListOne = res.result;
          this.pagsOne.total = Number(res.result.length);
        } else {
          this.tableListOne = [];
          this.pagsOne.total = 0;
        }
      });
    },
    //姓名是否重复
    handleLogin(value) {
      let data = {
        loginname: value
      };
      getCheckLogingName(data).then(res => {
        console.log(res);
        if (res.state === "10000") {
        } else {
          this.$message.error("用户名重复,请重新输入!");
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
    //添加
    handleAdd() {
      this.addDialogForm.addName = "";
      this.addDialogForm.addPassword = "";
      this.addDialogForm.addNewName = "";
      //   this.addDialogForm.addUserName = "";
      //   this.addDialogForm.addJobNumber = "";
      console.log(this.options, "options");
      this.addDialog = true;
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.editDialog = true;
      this.DialogForm = {
        editName: row.loginName,
        editPassword: "",
        editUserName: row.userName,
        editJobNumber: row.employeeId,
        editStatus: row.userCondition == "启用" ? "1" : "0",
        id: row.id
      };
    },
    //确定添加
    handleAddOk() {
      let userName = "";
      this.options.forEach(item => {
        if (this.addDialogForm.addUserName == item.value) {
          userName = item.label;
        }
      });
      let data = {
        loginname: this.addDialogForm.addName,
        pwd: this.addDialogForm.addPassword,
        username: this.addDialogForm.addNewName
          ? this.addDialogForm.addNewName
          : this.addDialogForm.addUserName,
        employeeid: this.addDialogForm.addJobNumber
      };
      postAddUser(this.$qs.stringify(data)).then(res => {
        console.log(res, 222);
        if (res.state === "10000") {
          this.$message.success("添加账号成功!");
          this.addDialog = false;
          this.getAxios();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //确定编辑
    handleEditOk() {
      let data = {
        loginname: this.DialogForm.editName,
        pwd: this.DialogForm.editPassword,
        username: this.DialogForm.editUserName,
        employeeid: this.DialogForm.editJobNumber,
        isenable: this.DialogForm.editStatus,
        id: this.DialogForm.id
      };
      postUpdateUser(this.$qs.stringify(data)).then(res => {
        console.log(res, 222);
        if (res.state === "10000") {
          this.$message.success("修改账号信息成功!");
          this.editDialog = false;
          this.getAxios();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
      let data = {
        id: row.id
      };
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postDeleteUser(this.$qs.stringify(data)).then(res => {
            if (res.state === "10000") {
              this.$message.success("删除账号信息成功!");
              this.tableListOne.splice(index, 1);
            } else {
              this.$message.success(res.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-select {
  width: 100%;
}
.table_main {
  width: 100%;
  height: 100%;
  .pages {
    width: 100%;
    text-align: center;
  }
}
</style>
