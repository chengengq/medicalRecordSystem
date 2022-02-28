<template>
  <!-- 系统设置>角色管理 -->
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
                  class="el_input"
                  v-model="tableInput"
                  clearable
                  placeholder="可输入角色名称来查询"
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
              <div></div>
            </div>
          </div>
          <div class="tables">
            <el-table
              style="width: 100%"
              border
              max-height="540"
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
                prop="roleName"
                label="角色名称"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="description"
                label="角色描述"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="roleCondition"
                label="状态"
                width="80"
              >
                <template slot-scope="scope">
                  <span
                    :style="
                      scope.row.roleCondition == '启用'
                        ? 'color: green'
                        : 'color: red'
                    "
                    >{{ scope.row.roleCondition }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="520">
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
                    type="warning"
                    icon="el-icon-guide"
                    @click="handleAssignmentMenu(scope.$index, scope.row)"
                    >分配菜单</el-button
                  >
                  <el-button
                    size="small"
                    type="primary"
                    icon="el-icon-user-solid"
                    @click="handlePartUser(scope.$index, scope.row)"
                    >用户角色</el-button
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
        <!-- 新建编辑 -->
        <el-dialog
          :title="
            addOredit == 'add'
              ? '新建角色信息'
              : addOredit == 'edit'
              ? '修改角色信息'
              : '分配用户角色'
          "
          :visible.sync="editDialog"
          :width="
            addOredit == 'add'
              ? '570px'
              : addOredit == 'edit'
              ? '570px'
              : '660px'
          "
          :modal="false"
          :lock-scroll="false"
        >
          <el-form
            :model="DialogForm"
            label-width="90px"
            v-if="addOredit == 'add' || addOredit == 'edit'"
          >
            <el-form-item label="角色名称：">
              <el-input
                v-model="DialogForm.editName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="角色描述：">
              <el-input
                v-model="DialogForm.editUser"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态：" v-if="addOredit == 'edit'">
              <el-select filterable v-model="DialogForm.editStatus">
                <el-option label="启用" value="1"></el-option>
                <el-option label="停用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-transfer
            filterable
            :titles="['用户角色:无', '用户角色:' + DialogForm.editName]"
            :filter-method="filterMethod"
            filter-placeholder="请输入角色姓名"
            v-model="partValue"
            :data="partList"
            @change="handlePartUsers"
            v-else-if="addOredit == 'partUser'"
          >
            <span slot-scope="{ option }"
              >{{ option.name }} - {{ option.label }}</span
            >
          </el-transfer>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialog = false">取 消</el-button>
            <el-button
              v-if="addOredit == 'add'"
              type="primary"
              @click="handleAddOk"
              >确 定</el-button
            >
            <el-button
              v-if="addOredit == 'edit'"
              type="primary"
              @click="handleEditOk"
              >确 定</el-button
            >
            <el-button
              v-if="addOredit == 'partUser'"
              type="primary"
              @click="handlePartUserOk"
              >确 定</el-button
            >
          </div>
        </el-dialog>
        <el-dialog
          title="分配菜单"
          :visible.sync="editDialogfp"
          width="570"
          :modal="false"
          :lock-scroll="false"
        >
          <el-tree
            :data="MenuData"
            show-checkbox
            node-key="id"
            @check="handleMenu"
            :default-expanded-keys="[]"
            :default-checked-keys="defaultKey"
            :props="defaultProps"
          >
          </el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogfp = false">取 消</el-button>
            <el-button type="primary" @click="handleAddOkfp">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getRoleList,
  postAddRole,
  postUpdateRole,
  postDeleteRole,
  getRoleMenuList,
  postUpdateRoleMenu,
  getUserRoleList,
  getUserNoRoleList,
  postUpdateUserRole
} from "@/api";
export default {
  data() {
    return {
      //分页
      pagsOne: {
        total: 1,
        size: 10,
        current: 1
      },
      //表格模糊查询
      tableInput: "",
      tableListOne: [],
      //新建/修改弹出框显示/隐藏
      editDialog: false,
      //区分新建/编辑
      addOredit: "",
      // 修改弹窗存储数据的表单
      DialogForm: {
        id: "",
        //   角色名称
        editName: "",
        //   角色描述
        editUser: "",
        //状态
        editStatus: "1"
      },
      //分配菜单弹出框显示/隐藏
      editDialogfp: false,
      MenuData: [],
      MenuDataOk: [],
      menuId: "",
      defaultKey: [],
      defaultProps: {
        children: "children",
        label: "menuName"
      },
      //分配用户角色弹出框显示/隐藏
      partDialog: false,
      //分配用户角色
      partList: [],
      partValue: [],
      filterMethod(query, item) {
        return item.name.indexOf(query) > -1;
      }
    };
  },
  created() {
    this.getAxios();
  },
  mounted() {},
  methods: {
    getAxios() {
      let data = {
        description: this.tableInput,
        pageSize: this.pagsOne.size,
        pageIndex: this.pagsOne.current
      };
      getRoleList(data).then(res => {
        console.log(res, 1);
        if (res.state === "10000") {
          this.tableListOne = res.result;
          this.pagsOne.total = Number(res.pageTotal);
        } else {
          this.tableListOne = [];
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
    //添加
    handleAdd() {
      this.editDialog = true;
      this.addOredit = "add";
      this.DialogForm = {};
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.editDialog = true;
      this.addOredit = "edit";
      this.DialogForm.editName = row.roleName;
      this.DialogForm.editUser = row.description;
      this.DialogForm.editStatus = row.roleCondition == "启用" ? "1" : "0";
      this.DialogForm.id = row.id;
    },
    //确定添加
    handleAddOk() {
      let data = {
        rolename: this.DialogForm.editName,
        description: this.DialogForm.editUser
      };
      postAddRole(this.$qs.stringify(data)).then(res => {
        console.log(res, "add");
        if (res.state === "10000") {
          this.$message.success("添加角色成功!");
          this.editDialog = false;
          this.getAxios();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //确定编辑
    handleEditOk() {
      let data = {
        id: this.DialogForm.id,
        rolename: this.DialogForm.editName,
        description: this.DialogForm.editUser,
        isenable: this.DialogForm.editStatus
      };
      postUpdateRole(this.$qs.stringify(data)).then(res => {
        console.log(res, "add");
        if (res.state === "10000") {
          this.$message.success("编辑角色成功!");
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
          postDeleteRole(this.$qs.stringify(data)).then(res => {
            if (res.state === "10000") {
              this.$message.success("删除账号信息成功!");
              this.tableListOne.splice(index, 1);
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
    getPartUser(id) {
      console.log(id, "9999999");
      let data = {
        id: id
      };
      getUserNoRoleList().then(res => {
        console.log(res, "PartUser");
        this.partList = [];
        if (res.state === "10000") {
          res.result.forEach(item => {
            this.partList.push({
              label: item.loginName,
              key: item.id,
              name: item.userName
            });
          });
        } else {
          this.partList = [];
        }
      });
      getUserRoleList(data).then(res => {
        console.log(res, "PartUserright");
        this.partValue = [];
        if (res.state === "10000") {
          res.result.forEach(item => {
            this.partValue.push(item.id);
          });
        } else {
          this.partValue = [];
        }
      });
    },
    //分配菜单 列表
    getPartMenu(ids) {
      let data = {
        id: ids
      };
      getRoleMenuList(data).then(res => {
        console.log(res, "fenpeiid");
        this.MenuData = [];
        this.defaultKey = [];
        if (res.state === "10000") {
          this.MenuData = res.result;
          res.result.forEach(item => {
            if (item.flag == 1) {
              this.defaultKey.push(item.id);
            } else {
              item.children.forEach(items => {
                if (items.flag == 1) {
                  this.defaultKey.push(items.id);
                }
              });
            }
          });
          console.log(this.defaultKey);
        } else {
          this.MenuData = [];
          this.defaultKey = [];
        }
      });
    },
    //分配菜单
    handleAssignmentMenu(index, row) {
      console.log(index, row);
      this.menuId = row.id;
      this.getPartMenu(row.id);
      this.editDialogfp = true;
    },
    handleMenu(data, id) {
      console.log(data, id);
      this.MenuDataOk = id.checkedKeys.concat(id.halfCheckedKeys);
      console.log(data, id, this.MenuDataOk);
    },
    handleAddOkfp() {
      if (this.MenuDataOk.length > 0) {
        let menuString = String(this.MenuDataOk);
        let data = {
          roleId: this.menuId,
          menus: menuString
        };
        postUpdateRoleMenu(this.$qs.stringify(data)).then(res => {
          console.log(res, ",,,,");
          if (res.state === "10000") {
            this.editDialogfp = false;
            this.$message.success("分配菜单成功,请重新登录!");
          } else {
            this.$message.error(res.message);
          }
        });
      } else {
        this.$message.warning("至少需要分配一个菜单!");
      }
    },
    //分配用户角色
    handlePartUser(index, row) {
      this.getPartUser(row.id);
      this.DialogForm.editName = row.roleName;
      this.DialogForm.id = row.id;
      console.log(row, "handlePartUser");
      this.editDialog = true;
      this.addOredit = "partUser";
    },
    //用户角色左右分配
    handlePartUsers(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
      this.partValue = value;
    },
    //用户角色修改
    handlePartUserOk() {
      console.log(this.partValue, this.partValue.join(","), "partListsssss");
      if (this.DialogForm.id == 1 && this.partValue.length == 0) {
        this.$message.warning("管理员至少分配一个用户角色!");
      } else {
        let stringId = "";
        if (this.partValue.length > 0) {
          stringId = this.partValue.join(",");
        }
        let data = {
          userId: stringId,
          roles: this.DialogForm.id,
          type: "update"
        };
        postUpdateUserRole(this.$qs.stringify(data)).then(res => {
          console.log(res, "用户角色修改");
          if (res.state === "10000") {
            this.$message.success("用户角色修改成功!");
            this.editDialog = false;
          } else {
            this.$message.error(res.message);
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-select {
  width: 100%;
}
/deep/ .el-transfer {
  width: 100%;
  .el-transfer-panel__header {
    .el-checkbox__label {
      font-size: 14px;
    }
  }
}
/deep/ .el-checkbox-button {
  margin: 5px;
  .el-checkbox-button__inner {
    border-radius: 5px;
    border: 1px solid #dcdfe6;
  }
  .el-checkbox-button__inner:hover {
    background: #e6e6e6;
  }
}
/deep/ .el-checkbox-button.is-checked .el-checkbox-button__inner {
  background: #31aed3 !important;
  border-color: #31aed3 !important;
}
.tabs_ks {
  width: 100%;
  /deep/ .el-tabs__header {
    width: 100%;
    position: inherit;
    background: #fff;
    margin-top: 20px;
    .el-tabs__nav-wrap {
      width: 100%;
    }
  }
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
