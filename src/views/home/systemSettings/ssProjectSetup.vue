<template>
  <!-- 项目设置 -->
  <div class="main">
    <div class="times">
      <div class="times_wrap">
        <!-- 相关按钮 计算 导出 -->
        <div class="button_out">
          <el-button type="success" size="medium" @click="handleAdd"
            >新增</el-button
          >
        </div>
      </div>
    </div>
    <div class="main_wrap">
      <el-table style="width: 100%" border max-height="600" :data="tableList">
        <el-table-column align="center" prop="arrangeName" label="项目名称">
        </el-table-column>
        <el-table-column align="center" prop="duration" label="持续时间(分钟)">
        </el-table-column>
        <el-table-column
          align="center"
          prop="weekdays"
          label="周二-周五准备时间"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="holiday"
          label="周六、周末准备时间"
        >
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span
              :style="scope.row.isEnable == 1 ? 'color:green;' : 'color:red;'"
              >{{ scope.row.isEnable == 1 ? "启用" : "禁用" }}</span
            >
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sort" label="排班顺序">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="handleBindingPersonnel(scope.row)"
              >绑定人员</el-button
            >
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDel(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="dialogTitle + '项目'"
        :visible.sync="Dialog"
        width="30%"
        :modal="false"
        :lock-scroll="false"
      >
        <el-form :model="DialogForm" label-width="170px">
          <el-form-item label="项目名称：">
            <el-input
              v-model="DialogForm.arrangeName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="持续时间：">
            <el-input
              v-model="DialogForm.duration"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <template slot="label"
              >周二-周五准备时间<el-tooltip
                class="item"
                effect="dark"
                placement="right-end"
              >
                <div slot="content">
                  设置单天时间时请在时间前面加上星期（周一11:15）,<br />多个时间时请用/区分（11:15/13:45）
                </div>
                <i class="el-icon-question el_icon"></i> </el-tooltip
              >：</template
            >
            <el-input
              v-model="DialogForm.weekdays"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <template slot="label"
              >周六、周末准备时间<el-tooltip
                class="item"
                effect="dark"
                placement="right-end"
              >
                <div slot="content">
                  设置单天时间时请在时间前面加上星期（周六11:15）,<br />多个时间时请用/区分（11:15/13:45）
                </div>
                <i class="el-icon-question el_icon"></i> </el-tooltip
              >：</template
            >
            <el-input
              v-model="DialogForm.holiday"
              autocomplete="off"
              placeholder="周六、周末准备时间"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-switch
              v-model="DialogForm.isEnable"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="排班顺序：">
            <el-input v-model="DialogForm.order" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Dialog = false">取 消</el-button>
          <el-button type="primary" @click="handleEditOk">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="项目绑定人员"
        :visible.sync="isDialog"
        width="700px"
        :modal="false"
        :lock-scroll="false"
      >
        <el-transfer
          filterable
          :titles="['全部人员', '已绑定人员']"
          :filter-method="filterMethod"
          filter-placeholder="请输入人员姓名"
          v-model="partValue"
          :data="partList"
          @change="handlePartUsers"
        >
        </el-transfer>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleBindingPersonnelOk"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getItemsList,
  postAddOrUpdateItems,
  postDeleteItems,
  getItemCrewListAll,
  getItemCrewList,
  postUpdateItemCrew
} from "@/api";
export default {
  data() {
    return {
      //月
      childmonth: sessionStorage.getItem("chooseMonth"),
      tableList: [],
      //显示、隐藏弹窗
      Dialog: false,
      DialogForm: {
        id: "",
        arrangeName: "",
        duration: "",
        weekdays: "",
        holiday: "",
        isEnable: false,
        order: ""
      },
      dialogTitle: "",
      //显示、隐藏 绑定人员弹窗
      isDialog: false,
      //分配用户角色
      partList: [],
      partValue: [],
      dialogsId: "",
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      }
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
      getItemsList(data).then(res => {
        console.log(res);
        this.tableList = [];
        if (res.state === "10000") {
          this.tableList = res.data;
        } else {
          this.tableList = [];
        }
      });
    },
    //打开新增弹窗
    handleAdd() {
      this.dialogTitle = "新增";
      this.DialogForm = {
        arrangeName: "",
        duration: "",
        weekdays: "",
        holiday: "",
        isEnable: false,
        order: ""
      };
      this.Dialog = true;
    },
    //打开编辑弹窗
    handleEdit(row) {
      console.log(row);
      this.dialogTitle = "编辑";
      this.DialogForm = {
        id: row.id,
        arrangeName: row.arrangeName,
        duration: row.duration,
        weekdays: row.weekdays,
        holiday: row.holiday,
        isEnable: row.isEnable == 1 ? true : false,
        order: row.sort
      };
      this.Dialog = true;
    },
    handleEditOk() {
      console.log(this.DialogForm);
      if (this.dialogTitle == "新增") {
        let data = {
          arrangeName: this.DialogForm.arrangeName,
          duration: this.DialogForm.duration,
          weekdays: this.DialogForm.weekdays,
          holiday: this.DialogForm.holiday,
          isEnable: this.DialogForm.isEnable ? 1 : 0,
          sort: this.DialogForm.order
        };
        postAddOrUpdateItems(this.$qs.stringify(data)).then(res => {
          console.log(res);
          if (res.state === "10000") {
            this.Dialog = false;
            this.$message.success("新增成功!");
            this.getAxios();
          } else {
            this.$message.error(res.message);
          }
        });
      } else {
        let data = {
          id: this.DialogForm.id,
          arrangeName: this.DialogForm.arrangeName,
          duration: this.DialogForm.duration,
          weekdays: this.DialogForm.weekdays,
          holiday: this.DialogForm.holiday,
          isEnable: this.DialogForm.isEnable ? 1 : 0,
          sort: this.DialogForm.order
        };
        postAddOrUpdateItems(this.$qs.stringify(data)).then(res => {
          console.log(res);
          if (res.state === "10000") {
            this.Dialog = false;
            this.$message.success("编辑成功!");
            this.getAxios();
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },
    getPartUser(id) {
      console.log(id, "9999999");
      let data = {
        itemsId: id
      };
      getItemCrewListAll().then(res => {
        console.log(res, "PartUser");
        this.partList = [];
        if (res.state === "10000") {
          res.result.forEach(item => {
            this.partList.push({
              label: item.crewName,
              key: item.id,
              name: item.crewName
            });
          });
        } else {
          this.partList = [];
        }
      });
      getItemCrewList(data).then(res => {
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
    //绑定人员
    handleBindingPersonnel(row) {
      this.getPartUser(row.id);
      this.isDialog = true;
      this.dialogsId = row.id;
      console.log(row);
    },
    //绑定人员左右分配
    handlePartUsers(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
      this.partValue = value;
    },
    //绑定人员确定
    handleBindingPersonnelOk() {
      console.log(this.partValue, this.partValue.join(","), "partListsssss");
      let stringId = "";
      if (this.partValue.length > 0) {
        stringId = this.partValue.join(",");
      }
      let data = {
        crewId: stringId,
        itemsId: this.dialogsId
      };
      postUpdateItemCrew(this.$qs.stringify(data)).then(res => {
        console.log(res, "绑定人员确定");
        if (res.state === "10000") {
          this.$message.success("项目绑定人员修改成功，绑定完请重新排班!");
          this.isDialog = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //删除
    handleDel(id) {
      let data = {
        id: id
      };

      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postDeleteItems(this.$qs.stringify(data)).then(res => {
            if (res.state === "10000") {
              this.$message.success("删除项目成功!");
              this.getAxios();
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
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  font-size: 17px;

  .times {
    width: 100%;
    //   border-bottom: 1px solid #ccc;
    border-bottom: 15px solid #f5f5f5;
    height: 50px;
    position: fixed;
    z-index: 999;
    .times_wrap {
      width: 100%;
      height: 100%;
      display: flex;
      background: #fff;
      align-items: center;
      justify-content: flex-start;
      .button_out {
        margin-left: 20px;
      }
    }
  }
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
