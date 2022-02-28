<template>
  <div class="times">
    <div class="times_wrap">
      <div class="date_radio">
        <el-radio-group v-model="radio">
          <el-radio :label="1">年</el-radio>
          <!-- <el-radio :label="5">半年</el-radio> -->
          <el-radio :label="2">月</el-radio>
          <el-radio :label="3">季度</el-radio>
          <el-radio :label="4">时间段</el-radio>
        </el-radio-group>
      </div>
      <div class="choose_frame">
        <!-- 年 -->
        <div v-show="radio == 1 || radio == 3">
          <el-date-picker
            v-model="chooseYear"
            @change="changeYear"
            :clearable="false"
            :editable="false"
            type="year"
            placeholder="选择年"
            value-format="yyyy"
          ></el-date-picker>
        </div>
      </div>
      <div class="choose_frame">
        <!-- 月 -->
        <div v-show="radio == 2">
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
      <!-- 季度 -->
      <div v-show="radio == 3">
        <el-select
          v-model="chooseQuarter"
          @change="changeQuarter"
          :clearable="false"
          placeholder="请选择"
        >
          <el-option
            v-for="item in optionsQuarter"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 时间段 -->
      <div v-show="radio == 4">
        <el-date-picker
          class="date_picker"
          v-model="eleTiemRange"
          @change="changeTiemRange"
          :clearable="false"
          :editable="false"
          type="monthrange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy/MM"
        ></el-date-picker>
      </div>
      <!-- 相关按钮 计算 导出 -->
      <div class="button_out">
        <el-button type="success" size="medium" @click="calculation"
          >计算</el-button
        >
        <el-button type="success" size="medium" @click="handleExport"
          >导出</el-button
        >
        <el-button
          type="success"
          size="medium"
          @click="handleGoback"
          v-if="isTable"
          >返回</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getDeptList } from "@/api";
import { date } from "@/utils/date.js";
export default {
  data() {
    return {
      calculations: sessionStorage.getItem("calculationIsok"),
      isTable: false,
      radio: 2,
      // 选择年
      chooseYear: "",
      // 选择月
      chooseMonth: "",
      // 选择季度
      chooseQuarter: "",
      optionsQuarter: [],
      // 选择时间范围
      eleTiemRange: [],
      tiemRange: [],
      selectDate: null,
      //限制只能选一年数据
      pickerOptions: {
        disabledDate: time => {
          if (this.selectDate == null) {
            return false;
          } else {
            return this.selectDate.getFullYear() != time.getFullYear();
          }
        },
        onPick: date => {
          // 如果只选择一个则保存至selectDate 否则selectDate 为空
          if (date.minDate && !date.maxDate) {
            this.selectDate = date.minDate;
          } else {
            this.selectDate = null;
          }
        }
      },
      //单选框跳转 table/echart页面
      chartRadio: 1,
      //院内科室
      yuanneiScreenValue: this.$route.query.deptname
        ? this.$route.query.deptname
        : "",
      yuanneiScreenLabel: "",
      optionsYuanneiScreen: []
    };
  },
  watch: {
    radio: function(newName, oldName) {
      this.$emit("radioSel", newName);
    }
  },
  props: ["yuanneiScreen", "chartTable", "tip", "tips"],
  created() {
    //判断为chart页面还是table页面
    this.chartOrTablrRadio = this.$route.name.substring(
      this.$route.name.length - 5
    );
    if (this.chartOrTablrRadio !== "Table") {
      this.isTable = false;
    } else if (this.chartOrTablrRadio == "Table") {
      this.isTable = true;
    }
    // 初始化日期数据
    this.radio = 2;
    let dateTime = new Date();
    this.chooseYear = date(new Date(), "yyyy");
    let sjMonths = date(new Date(), "yyyy-MM");
    this.chooseMonth =
      dateTime.getMonth() == 0 ? Number(this.chooseYear) - 1 + "-12" : sjMonths;
    let months = dateTime.getMonth() + 1;
    this.tiemRange =
      dateTime.getMonth() == 0
        ? `${Number(this.chooseYear) - 1}/12 - ${Number(this.chooseYear) -
            1}/12`
        : `${this.chooseYear}/01 - ${date(new Date(), "yyyy/MM")}`;
    this.eleTiemRange =
      dateTime.getMonth() == 0
        ? [
            `${Number(this.chooseYear) - 1}/12`,
            `${Number(this.chooseYear) - 1}/12`
          ]
        : [this.chooseYear + "/01", date(new Date(), "yyyy/MM")];
    if (months <= 3) {
      this.chooseQuarter = this.chooseYear + "-q-1";
    } else if (months > 3 && months <= 6) {
      this.chooseQuarter = this.chooseYear + "-q-2";
    } else if (months > 6 && months <= 9) {
      this.chooseQuarter = this.chooseYear + "-q-3";
    } else if (months > 9 && months <= 12) {
      this.chooseQuarter = this.chooseYear + "-q-4";
    }
    if (sessionStorage.getItem("radioSelect")) {
      this.radio = Number(sessionStorage.getItem("radioSelect"));
    } else {
      sessionStorage.setItem("radioSelect", this.radio);
    }
    if (sessionStorage.getItem("chooseYear")) {
      this.chooseYear = sessionStorage.getItem("chooseYear");
    } else {
      sessionStorage.setItem("chooseYear", this.chooseYear);
    }
    if (sessionStorage.getItem("chooseMonth")) {
      this.chooseMonth = sessionStorage.getItem("chooseMonth");
    } else {
      sessionStorage.setItem("chooseMonth", this.chooseMonth);
    }
    if (sessionStorage.getItem("chooseQuarter")) {
      this.chooseQuarter = sessionStorage.getItem("chooseQuarter");
    } else {
      sessionStorage.setItem("chooseQuarter", this.chooseQuarter);
    }
    if (sessionStorage.getItem("timeDateRange")) {
      this.tiemRange = sessionStorage.getItem("timeDateRange");
      this.eleTiemRange = [sessionStorage.startDate, sessionStorage.endDate];
    } else {
      sessionStorage.setItem("timeDateRange", this.tiemRange);
      sessionStorage.setItem("startDate", this.eleTiemRange[0]);
      sessionStorage.setItem("endDate", this.eleTiemRange[1]);
    } //院内科室
    if (sessionStorage.optionsYuanneiScreen) {
      console.log(sessionStorage.yuanneiScreenValue, "非科室");
      this.optionsYuanneiScreen = JSON.parse(
        sessionStorage.optionsYuanneiScreen
      );
      this.yuanneiScreenValue = sessionStorage.yuanneiScreenValue;
      this.yuanneiScreenLabel = sessionStorage.yuanneiScreenLabel;
      this.$emit(
        "childYuanneiScreen",
        this.yuanneiScreenValue,
        this.yuanneiScreenLabel
      );
    } else {
      console.log(sessionStorage.yuanneiScreenValue, "科室");
      getDeptList().then(res => {
        console.log(res, "科室");
        this.yuanneiScreenValue = "";
        this.yuanneiScreenLabel = "";
        this.optionsYuanneiScreen = [];
        if (res.code == "10000") {
          res.object.forEach(item => {
            this.optionsYuanneiScreen.push({
              label: item.deptName,
              value: item.id
            });
          });
        } else {
          this.yuanneiScreenValue = "";
          this.yuanneiScreenLabel = "";
          this.optionsYuanneiScreen = [];
        }
        if (this.$route.query.deptname) {
          this.yuanneiScreenValue = this.$route.query.deptname;
        } else {
          this.yuanneiScreenValue =
            this.optionsYuanneiScreen.length > 0
              ? this.optionsYuanneiScreen[0].value
              : "";
          this.yuanneiScreenLabel =
            this.optionsYuanneiScreen.length > 0
              ? this.optionsYuanneiScreen[0].label
              : "";
        }
        sessionStorage.setItem(
          "optionsYuanneiScreen",
          JSON.stringify(this.optionsYuanneiScreen)
        );
        sessionStorage.setItem("yuanneiScreenValue", this.yuanneiScreenValue);
        sessionStorage.setItem("yuanneiScreenLabel", this.yuanneiScreenLabel);
        this.$emit(
          "childYuanneiScreen",
          this.yuanneiScreenValue,
          this.yuanneiScreenLabel
        );
      });
    }
    // 将初始化的数据传至子组件
    this.$emit("childyear", this.chooseYear);
    this.$emit("childmonth", this.chooseMonth);
    this.$emit("childquarter", this.chooseQuarter);
    this.$emit("childgrange", this.tiemRange);
    this.$emit("radioSel", this.radio);
    this.optionsQuarter = [
      {
        value: this.chooseYear + "-q-1",
        label: "第一季度"
      },
      {
        value: this.chooseYear + "-q-2",
        label: "第二季度"
      },
      {
        value: this.chooseYear + "-q-3",
        label: "第三季度"
      },
      {
        value: this.chooseYear + "-q-4",
        label: "第四季度"
      }
    ];
  },
  methods: {
    handleGoback() {
      this.$router.go(-1);
    },
    //单选框跳转 table/echart页面
    handleTableTo() {
      if (this.chartRadio === 2) {
        this.$router.push("/" + this.$route.name + "Table");
      } else if (this.chartRadio === 1) {
      }
    },
    // 年
    changeYear() {
      sessionStorage.setItem("radioSelect", 1);
      this.optionsQuarter = [
        {
          value: this.chooseYear + "-q-1",
          label: "第一季度"
        },
        {
          value: this.chooseYear + "-q-2",
          label: "第二季度"
        },
        {
          value: this.chooseYear + "-q-3",
          label: "第三季度"
        },
        {
          value: this.chooseYear + "-q-4",
          label: "第四季度"
        }
      ];
      let months = new Date().getMonth() + 1;
      if (months <= 3) {
        this.chooseQuarter = this.chooseYear + "-q-1";
      } else if (months > 3 && months <= 6) {
        this.chooseQuarter = this.chooseYear + "-q-2";
      } else if (months > 6 && months <= 9) {
        this.chooseQuarter = this.chooseYear + "-q-3";
      } else if (months > 9 && months <= 12) {
        this.chooseQuarter = this.chooseYear + "-q-4";
      }
      let monthList = this.chooseMonth.split("-");
      this.chooseMonth = this.chooseYear + "-" + monthList[1];
      this.$emit("childyear", this.chooseYear);
      this.$emit("childmonth", this.chooseMonth);
      this.$emit("childquarter", this.chooseQuarter);
    },
    // 月
    changeMonth() {
      sessionStorage.setItem("radioSelect", 2);
      let monthList = this.chooseMonth.split("-");
      this.chooseYear = monthList[0];
      this.optionsQuarter = [
        {
          value: this.chooseYear + "-q-1",
          label: "第一季度"
        },
        {
          value: this.chooseYear + "-q-2",
          label: "第二季度"
        },
        {
          value: this.chooseYear + "-q-3",
          label: "第三季度"
        },
        {
          value: this.chooseYear + "-q-4",
          label: "第四季度"
        }
      ];
      let months = new Date().getMonth() + 1;
      if (months <= 3) {
        this.chooseQuarter = this.chooseYear + "-q-1";
      } else if (months > 3 && months <= 6) {
        this.chooseQuarter = this.chooseYear + "-q-2";
      } else if (months > 6 && months <= 9) {
        this.chooseQuarter = this.chooseYear + "-q-3";
      } else if (months > 9 && months <= 12) {
        this.chooseQuarter = this.chooseYear + "-q-4";
      }
      this.$emit("childyear", this.chooseYear);
      this.$emit("childmonth", this.chooseMonth);
      this.$emit("childquarter", this.chooseQuarter);
    },
    // 季度
    changeQuarter() {
      sessionStorage.setItem("radioSelect", 3);
      this.$emit("childquarter", this.chooseQuarter);
    },
    // 时间段
    changeTiemRange() {
      sessionStorage.setItem("radioSelect", 4);
      let startDate = "";
      let endDate = "";
      startDate = this.eleTiemRange[0];
      endDate = this.eleTiemRange[1];
      let timeDateRange = "";
      timeDateRange = startDate + " - " + endDate;
      sessionStorage.setItem("timeDateRange", timeDateRange);
      sessionStorage.setItem("startDate", startDate);
      sessionStorage.setItem("endDate", endDate);
      this.$emit("childgrange", timeDateRange);
    },
    //院内科室
    changeYuanneiScreen() {
      this.optionsYuanneiScreen.forEach(item => {
        if (this.yuanneiScreenValue == item.value) {
          this.yuanneiScreenLabel = item.label;
        }
      });
      sessionStorage.setItem("yuanneiScreenValue", this.yuanneiScreenValue);
      sessionStorage.setItem("yuanneiScreenLabel", this.yuanneiScreenLabel);
      this.$emit(
        "childYuanneiScreen",
        this.yuanneiScreenValue,
        this.yuanneiScreenLabel
      );
    },
    // 计算按钮
    calculation() {
      sessionStorage.setItem("radioSelect", this.radio);
      if (this.radio == 1) {
        this.optionsQuarter = [
          {
            value: this.chooseYear + "-q-1",
            label: "第一季度"
          },
          {
            value: this.chooseYear + "-q-2",
            label: "第二季度"
          },
          {
            value: this.chooseYear + "-q-3",
            label: "第三季度"
          },
          {
            value: this.chooseYear + "-q-4",
            label: "第四季度"
          }
        ];
        let months = new Date().getMonth() + 1;
        if (months <= 3) {
          this.chooseQuarter = this.chooseYear + "-q-1";
        } else if (months > 3 && months <= 6) {
          this.chooseQuarter = this.chooseYear + "-q-2";
        } else if (months > 6 && months <= 9) {
          this.chooseQuarter = this.chooseYear + "-q-3";
        } else if (months > 9 && months <= 12) {
          this.chooseQuarter = this.chooseYear + "-q-4";
        }
        this.$emit("childquarter", this.chooseQuarter);
      } else if (this.radio == 2) {
      } else if (this.radio == 3) {
      } else if (this.radio == 4) {
        let startDate = "";
        let endDate = "";
        //时间段选择
        if (
          sessionStorage.getItem("startDate") &&
          sessionStorage.getItem("endDate")
        ) {
          startDate = sessionStorage.getItem("startDate");
          endDate = sessionStorage.getItem("endDate");
        } else {
          startDate = this.eleTiemRange[0];
          endDate = this.eleTiemRange[1];
        }
        let timeDateRange = "";
        timeDateRange = startDate + "-" + endDate;
        sessionStorage.setItem("timeDateRange", timeDateRange);
        sessionStorage.setItem("startDate", startDate);
        sessionStorage.setItem("endDate", endDate);
      }
      sessionStorage.setItem("chooseYear", this.chooseYear);
      //月份选择
      sessionStorage.setItem("chooseMonth", date(this.chooseMonth, "yyyy-MM"));
      sessionStorage.setItem("chooseQuarter", this.chooseQuarter);
      this.$emit("calculation", "计算");
    },
    handleExport() {
      this.$emit("handleExport", "导出");
    }
  }
};
</script>

<style lang="scss" scoped>
.times {
  width: 100%;
  height: 50px;
  position: fixed;
  z-index: 999;
  box-shadow: 1px 2px 1px #ccc;
  .times_wrap {
    width: 100%;
    height: 100%;
    display: flex;
    background: #fff;
    align-items: center;
    justify-content: flex-start;
    .date_radio {
      //   flex: 2;
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
      //   flex: 2;
    }
    .choose_department {
      font-size: 15px;
      margin-left: 20px;
      //   flex: 2;
      .el-select {
        width: 150px;
      }
      .dept_select {
        width: 200px;
      }
      .free_select {
        width: 400px;
      }
      .el-icon-question {
        color: #2ba7d8;
      }
    }
    .chart_table {
      margin-left: 20px;
      //   flex: 1;
    }
    .button_out {
      margin-left: 20px;
      //   flex: 1;
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
