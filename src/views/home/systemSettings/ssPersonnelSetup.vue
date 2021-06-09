<template>
  <!-- 人员设置 -->
  <div class="main">
    <div class="times">
      <div class="times_wrap">
        <div class="choose_frame">
          <!-- 月 -->
          <div>
            月份选择：
            <el-date-picker
              v-model="month"
              @change="changeMonth"
              :clearable="false"
              :editable="false"
              type="month"
              placeholder="选择月"
              value-format="yyyy-MM"
            ></el-date-picker>
          </div>
        </div>
        <!-- 相关按钮 计算 导出 -->
        <div class="button_out">
          <el-button type="primary" size="medium" @click="getAxios"
            >查询</el-button
          >
        </div>
        <!-- 相关按钮 计算 导出 -->
        <div class="button_out">
          <el-button type="success" size="medium" @click="handleAdd"
            >新增</el-button
          >
        </div>
        <div class="tips">
          未调休班默认为休班状态。点击项目名称进行调休班，调休班后请重新排班。点击编辑修改人员信息。
        </div>
      </div>
    </div>
    <div class="main_wrap">
      <el-table
        class="table_xm"
        style="width: 100%"
        border
        max-height="600"
        :data="tableList"
      >
        <el-table-column
          fixed
          type="index"
          align="center"
          label="序号"
          width="60"
        >
        </el-table-column>
        <el-table-column
          fixed
          align="center"
          prop="crewName"
          label="人员姓名"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="联系方式"
          width="150"
        >
        </el-table-column>
        <el-table-column align="center" label="是否在职" width="100">
          <template slot-scope="scope">
            <span
              :style="
                scope.row.isDimission == 1 ? 'color:green;' : 'color:red;'
              "
              >{{ scope.row.isDimission == 1 ? "在职" : "离职" }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item, index) in tableTitle"
          :key="index"
          align="center"
          :prop="'item_' + item.value"
          :label="item.name"
          width="250"
        >
          <template slot-scope="scope">
            <span
              @click="handleBinding(scope.row, item.value)"
              title="点击修改"
              :style="
                scope.row['item_' + item.value] == '休班'
                  ? 'color: #008000'
                  : 'color: #0094ff;'
              "
              >{{ scope.row["item_" + item.value] }}</span
            >
            <!-- <div>
              <el-input
                :title="scope.row['item_' + item.value]"
                class="input_xm"
                v-model="scope.row['item_' + item.value]"
                placeholder="项目"
              ></el-input>
              <el-button
                size="mini"
                type="primary"
                @click="handleBinding(scope.row, item.value)"
                >修改</el-button
              >
            </div> -->
          </template>
        </el-table-column>

        <el-table-column fixed="right" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <!-- <el-button
              type="success"
              size="mini"
              @click="handleBinding(scope.row)"
              >排班</el-button
            > -->
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
        <el-form :model="DialogForm" label-width="120px">
          <el-form-item label="人员姓名：">
            <el-input
              v-model="DialogForm.crewName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-model="DialogForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否在职：">
            <el-switch
              v-model="DialogForm.isDimission"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="在职"
              inactive-text="离职"
            >
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Dialog = false">取 消</el-button>
          <el-button type="primary" @click="handleEditOk">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        class="dialog"
        :title="'调休班'"
        :visible.sync="isDialog"
        width="25%"
        :modal="false"
        :lock-scroll="false"
      >
        <el-form :model="DialogForms" label-width="120px">
          <el-form-item label="选择项目：">
            <el-select
              class="select"
              v-model="DialogForms.project"
              @change="changeProjects"
              placeholder="请选择"
              filterable
            >
              <el-option
                v-for="item in optionsProjects"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleBindingOk">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getWorkforce,
  getAllCrew,
  getItemsByCrew,
  postAddOrUpdateSpecial,
  postUpdateOrAddCrew,
  postDeleteCrew
} from "@/api";
export default {
  data() {
    return {
      month: sessionStorage.getItem("chooseMonth"),
      tableList: [],
      tableTitle: [],
      //显示、隐藏弹窗
      Dialog: false,
      dialogTitle: "",
      DialogForm: {
        id: "",
        crewName: "",
        isDimission: false,
        phone: ""
      },
      isDialog: false,
      optionsProjects: [],
      DialogForms: {
        id: "",
        index: "",
        project: ""
      }
    };
  },
  created() {
    this.getAxios();
  },
  methods: {
    //月
    changeMonth(data) {
      this.month = data;
      console.log("month", this.month);
    },
    //开始排班
    handleScheduling() {
      let data = {
        month: this.month,
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
            this.$message.success("排班成功！");
            this.getAxios();
          }, 5000);
        } else {
          loading.close();
          this.$message.error(res.message);
        }
      });
    },
    getAxios() {
      let data = {
        month: this.month,
        selectType: 2
      };
      getAllCrew(data).then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.tableList = res.result.crew;
          this.tableTitle = res.result.date;
        } else {
          this.tableList = [];
          this.tableTitle = [];
        }
      });
    },
    //打开新增弹窗
    handleAdd() {
      this.dialogTitle = "新增";
      this.DialogForm = {
        crewName: "",
        isDimission: false,
        phone: ""
      };
      this.Dialog = true;
    },
    //打开编辑弹窗
    handleEdit(row) {
      console.log(row);
      this.dialogTitle = "编辑";
      this.DialogForm = {
        id: row.id,
        crewName: row.crewName,
        isDimission: row.isDimission == 1 ? true : false,
        phone: row.phone
      };
      this.Dialog = true;
    },
    //排班
    handleBinding(row, index) {
      console.log(row, index);
      this.DialogForms.id = row.id;
      this.DialogForms.index = index;
      this.DialogForms.project = row["itemId_" + index];
      this.isDialog = true;
      this.getAxiosPaiban();
    },
    //获取排班表
    getAxiosPaiban() {
      let data = {
        itemsId: this.DialogForms.id
      };
      this.optionsProjects = [];
      getItemsByCrew(data).then(res => {
        console.log(res, "paiban");
        if (res.state === "10000") {
          res.result.forEach(item => {
            this.optionsProjects.push({
              label: item.arrangeName,
              value: item.itemsId
            });
          });
        } else {
          this.optionsProjects = [];
        }
      });
    },
    handleBindingOk() {
      let data = {
        selectType: 3,
        day: this.month + "-" + this.DialogForms.index,
        crewId: this.DialogForms.id,
        itemsId: String(this.DialogForms.project)
      };
      postAddOrUpdateSpecial(this.$qs.stringify(data)).then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.isDialog = false;
          this.handleScheduling();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //获取项目
    changeProjects() {},
    handleEditOk() {
      console.log(this.DialogForm);
      if (this.dialogTitle == "新增") {
        let data = {
          crewName: this.DialogForm.crewName,
          isDimission: this.DialogForm.isDimission ? 1 : 0,
          phone: this.DialogForm.phone
        };
        postUpdateOrAddCrew(this.$qs.stringify(data)).then(res => {
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
          crewName: this.DialogForm.crewName,
          isDimission: this.DialogForm.isDimission ? 1 : 0,
          phone: this.DialogForm.phone
        };
        postUpdateOrAddCrew(this.$qs.stringify(data)).then(res => {
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
    //删除
    handleDel(id) {
      let data = {
        id: id
      };
      this.$confirm("此操作将永久删除该人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postDeleteCrew(this.$qs.stringify(data)).then(res => {
            if (res.state === "10000") {
              this.$message.success("删除人员成功!");
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
      .choose_frame {
        margin-left: 20px;
        font-size: 16px;
        //   flex: 2;
      }
      .button_out {
        margin-left: 20px;
      }
      .tips {
        margin-left: 20px;
        color: rgb(21, 101, 206);
        font-size: 15px;
        font-weight: bold;
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
    /deep/ .table_xm {
      .el-table__row {
        .input_xm {
          width: 70%;
          .el-input__inner {
            height: 30px;
            text-align: center;
          }
        }
      }
    }
    .dialog {
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>
