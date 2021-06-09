<template>
  <div class="times">
    <div class="times_wrap">
      <div class="choose_frame" v-if="$route.name != 'IdlePeopleQuery'">
        <!-- 月 -->
        <div>
          月份选择：
          <el-date-picker
            v-model="chooseMonth"
            @change="changeMonth"
            :clearable="false"
            :editable="false"
            type="month"
            placeholder="选择月"
            value-format="yyyy-MM"
          ></el-date-picker>
        </div>
      </div>
      <div class="choose_frame" v-if="$route.name == 'IdlePeopleQuery'">
        <!-- 天 -->
        <div>
          时间选择：
          <el-date-picker
            v-model="chooseDay"
            @change="changeDay"
            :clearable="false"
            :editable="false"
            type="date"
            placeholder="选择天"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </div>
      <div class="choose_frame" v-if="$route.name == 'IdlePeopleQuery'">
        <!-- 时间选择 -->
        <div>
          时间选择：
          <el-time-picker
            class="date_picker"
            is-range
            v-model="chooseTime"
            @change="changeTime"
            :clearable="false"
            :editable="false"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="HH:mm:ss"
          >
          </el-time-picker>
        </div>
      </div>
      <div class="choose_department" v-if="isProject">
        选择项目：
        <el-select
          class="select"
          v-model="projectValue"
          @change="changeProject"
          placeholder="请选择"
          filterable
          multiple
          collapse-tags
        >
          <el-option
            v-for="item in optionsProject"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 相关按钮 排班 导出 -->
      <div class="button_out">
        <el-button
          type="primary"
          size="medium"
          v-if="$route.name == 'scheduling'"
          @click="handleScheduling"
          >开始排班</el-button
        >
        <el-button
          v-if="$route.name != 'compensatoryLeaveExport'"
          type="success"
          size="medium"
          @click="handleAxios"
          >计算</el-button
        >
        <el-button type="success" size="medium" @click="handleExport">{{
          $route.name == "compensatoryLeaveExport" ? "模板导出" : "导出"
        }}</el-button>
      </div>
      <div class="tips" v-if="$route.name == 'scheduling'">
        排班无法去重，请手动安排人员。
      </div>
      <div class="tips" v-if="$route.name == 'compensatoryLeaveExport'">
        导入excel文件格式严格按照模板格式，否则会解析失败
      </div>
    </div>
  </div>
</template>

<script>
import { getItemsList } from "@/api";
import { date } from "@/utils/date.js";
export default {
  data() {
    return {
      // 选择月
      chooseMonth: "",
      chooseDay: "",
      chooseTime: [],
      time: [],
      projectValue: "",
      optionsProject: []
    };
  },
  props: ["isProject"],
  created() {
    // 初始化日期数据
    this.chooseMonth = date(new Date(), "yyyy-MM");
    this.chooseDay = date(new Date(), "yyyy-MM-dd");
    this.chooseTime = ["08:00:00", "18:00:00"];
    if (sessionStorage.getItem("chooseMonth")) {
      this.chooseMonth = sessionStorage.getItem("chooseMonth");
    } else {
      sessionStorage.setItem("chooseMonth", this.chooseMonth);
    }
    if (sessionStorage.getItem("chooseDay")) {
      this.chooseDay = sessionStorage.getItem("chooseDay");
    } else {
      sessionStorage.setItem("chooseDay", this.chooseDay);
    }
    if (sessionStorage.getItem("chooseTime")) {
      this.time = JSON.parse(sessionStorage.getItem("chooseTime"));
      this.chooseTime = [this.time[0], this.time[1]];
      sessionStorage.setItem("time", this.time[0] + "-" + this.time[1]);
    } else {
      sessionStorage.setItem("chooseTime", JSON.stringify(this.chooseTime));
      sessionStorage.setItem(
        "time",
        this.chooseTime[0] + "-" + this.chooseTime[1]
      );
    }
    // 将初始化的数据传至子组件
    this.$emit("childmonth", this.chooseMonth);
    this.$emit("childday", this.chooseDay);
    this.$emit("childtime", this.chooseTime);
    this.getOption();
  },
  methods: {
    //获取所有项目数据
    getOption() {
      getItemsList().then(res => {
        console.log(res, 11);
        this.optionsProject = [];
        if (res.state === "10000") {
          res.data.forEach(item => {
            this.optionsProject.push({
              label: item.arrangeName,
              value: item.id
            });
          });
        } else {
          this.optionsProject = [];
        }
      });
    },
    //切换项目
    changeProject(val) {
      this.projectValue = val;
      this.$emit("childProject", this.projectValue);
    },
    // 月
    changeMonth() {
      sessionStorage.setItem("chooseMonth", this.chooseMonth);
      this.$emit("childmonth", this.chooseMonth);
    },
    // 日
    changeDay() {
      sessionStorage.setItem("chooseDay", this.chooseDay);
      this.$emit("childday", this.chooseDay);
    },
    // 时间段
    changeTime() {
      sessionStorage.setItem("chooseTime", JSON.stringify(this.chooseTime));
      sessionStorage.setItem(
        "time",
        this.chooseTime[0] + "-" + this.chooseTime[1]
      );
      this.$emit("childtime", this.chooseTime);
    },
    // 计算按钮
    handleAxios() {
      this.$emit("handleAxios", "this good");
    },
    //开始排班
    handleScheduling() {
      this.$emit("handleScheduling", "this good");
    },
    //导出
    handleExport() {
      this.$emit("handleExport", "this good");
    }
  }
};
</script>

<style lang="scss" scoped>
.times {
  width: 100%;
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
    .date_radio {
      margin-left: 20px;
      .el-radio-group {
        width: 100%;
        display: flex;
        .el-radio {
          align-items: center;
          margin-right: 10px;
        }
      }
    }
    .choose_frame {
      margin-left: 20px;
      font-size: 16px;
      //   flex: 2;
    }
    .choose_department {
      font-size: 15px;
      margin-left: 20px;
      //   flex: 2;
      .select {
        width: 250px;
      }
    }
    .button_out {
      margin-left: 20px;
      //   flex: 1;
    }
    .tips {
      margin-left: 20px;
      color: rgb(184, 10, 10);
      font-size: 15px;
      font-weight: bold;
    }
  }
}
.el-select {
  width: 150px;
}
.el-date-editor {
  width: 150px;
}
/deep/ .date_picker {
  width: 240px;
  .el-range-input {
    width: 95px;
  }
}
</style>
