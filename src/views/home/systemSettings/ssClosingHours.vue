<template>
  <!-- 项目设置>闭馆时间设置 -->
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
      </div>
    </div>
    <div class="main_wrap">
      <el-table style="width: 100%" border max-height="600" :data="tableList">
        <el-table-column align="center" prop="years" label="年">
        </el-table-column>
        <el-table-column align="center" prop="months" label="月">
        </el-table-column>
        <el-table-column align="center" prop="day" label="日">
        </el-table-column>
        <el-table-column align="center" prop="startTime" label="开始时间">
        </el-table-column>
        <el-table-column align="center" prop="endTime" label="结束时间">
        </el-table-column>
        <el-table-column align="center" prop="week" label="星期">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
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
        :title="dialogTitle + '闭馆时间'"
        :visible.sync="Dialog"
        width="30%"
        :modal="false"
        :lock-scroll="false"
      >
        <el-form :model="DialogForm" label-width="170px">
          <el-form-item label="日期选择：">
            <el-date-picker
              v-model="DialogForm.day"
              @change="changeDay"
              :clearable="false"
              :editable="false"
              type="date"
              placeholder="选择天"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="时间选择：">
            <el-time-picker
              class="date_picker"
              is-range
              v-model="DialogForm.time"
              @change="changeTime"
              :clearable="false"
              :editable="false"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm"
            ></el-time-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Dialog = false">取 消</el-button>
          <el-button type="primary" @click="handleEditOk">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getClosed, postAddOrUpdateClosed, postDeleteClosed } from "@/api";
export default {
  data() {
    return {
      //月
      month: sessionStorage.getItem("chooseMonth"),
      tableList: [],
      //显示、隐藏弹窗
      Dialog: false,
      DialogForm: {
        id: "",
        day: "",
        time: []
      },
      dialogTitle: ""
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
    //天
    changeDay(data) {
      this.DialogForm.day = data;
      console.log("DialogForm.day", this.DialogForm.day);
    },
    //时间段
    changeTime(data) {
      this.DialogForm.time = data;
      console.log("DialogForm.time", this.DialogForm.time);
    },
    getAxios() {
      let data = {
        month: this.month,
        selectType: 2
      };
      getClosed(data).then(res => {
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
        day: "",
        time: ["08:30", "18:00"]
      };
      this.Dialog = true;
    },
    //打开编辑弹窗
    handleEdit(row) {
      console.log(row);
      this.dialogTitle = "编辑";
      this.DialogForm = {
        id: row.id,
        day: row.years + "-" + row.months + "-" + row.day,
        time: [row.startTime, row.endTime]
      };
      this.Dialog = true;
    },
    handleEditOk() {
      console.log(this.DialogForm);
      if (this.dialogTitle == "新增") {
        let data = {
          selectType: 3,
          day: this.DialogForm.day,
          description: this.DialogForm.time[0] + "-" + this.DialogForm.time[1]
        };
        postAddOrUpdateClosed(this.$qs.stringify(data)).then(res => {
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
          selectType: 3,
          id: this.DialogForm.id,
          day: this.DialogForm.day,
          description: this.DialogForm.time[0] + "-" + this.DialogForm.time[1]
        };
        postAddOrUpdateClosed(this.$qs.stringify(data)).then(res => {
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

      this.$confirm("此操作将永久删除该闭馆时间, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postDeleteClosed(this.$qs.stringify(data)).then(res => {
            if (res.state === "10000") {
              this.$message.success("删除闭馆时间成功!");
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
