<!-- 直接上报>生成病案首页 -->
<template>
  <div class="main">
    <div class="main_wrap">
      <div class="main_wraps">
        <div class="table_main">
          <div class="table_top">
            <div class="table_top_wrap">
              <div class="table_top_left">
                <div class="date_radio">
                  <el-radio-group v-model="radio">
                    <el-radio :label="1">年</el-radio>
                    <el-radio :label="2">月</el-radio>
                  </el-radio-group>
                </div>
                <div class="choose_frame">
                  <!-- 年 -->
                  <div v-show="radio == 1 || radio == 3">
                    <el-date-picker
                      size="mini"
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
                      size="mini"
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
              </div>
              <div class="table_top_right"></div>
            </div>
          </div>
          <div class="table_form">
            <div class="table_form_wrap">
              <div class="table_form_row">
                <span>费别：</span
                ><el-select
                  v-model="ffbbh"
                  size="mini"
                  clearable
                  filterable
                  placeholder="请选择"
                  :filter-method="
                    val => getListCy(val, 'ffbbhListSech', 'ffbbhList')
                  "
                >
                  <el-option
                    v-for="(item, index) in ffbbhListSech"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    style="text-align: center"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.value }}</span
                    >
                  </el-option>
                </el-select>
              </div>
              <div class="table_form_row">
                <span>性别：</span
                ><el-select
                  v-model="sex"
                  size="mini"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in sexList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    style="text-align: center"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="table_form_row">
                <span>婚姻：</span>
                <el-select
                  v-model="fstatus"
                  size="mini"
                  clearable
                  filterable
                  placeholder="请选择"
                  :filter-method="
                    val => getListCy(val, 'fstatusListSech', 'fstatusList')
                  "
                >
                  <el-option
                    v-for="(item, index) in fstatusListSech"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    style="text-align: center"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.code }}</span
                    >
                  </el-option>
                </el-select>
              </div>
              <div class="table_form_row">
                <span>病案质量：</span>
                <el-select
                  v-model="fqualitybh"
                  size="mini"
                  clearable
                  filterable
                  placeholder="请选择病案质量"
                  :filter-method="
                    val => getListCy(val, 'fqualityListSech', 'fqualityList')
                  "
                >
                  <el-option
                    v-for="(item, index) in fqualityListSech"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    style="text-align: center"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.code }}</span
                    >
                  </el-option>
                </el-select>
              </div>
              <div class="table_form_row">
                <span>出院科室：</span>
                <el-select
                  v-model="deptbh"
                  size="mini"
                  clearable
                  filterable
                  placeholder="请选择出院科室"
                  :filter-method="
                    val => getListCy(val, 'deptCyListSech', 'deptCyList')
                  "
                >
                  <el-option
                    v-for="(item, index) in deptCyListSech"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    style="text-align: center"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.code }}</span
                    >
                  </el-option>
                </el-select>
              </div>
              <div class="table_form_row">
                <span>入院情况：</span
                ><el-select
                  v-model="fryinfobh"
                  size="mini"
                  clearable
                  placeholder="请选择入院情况"
                >
                  <el-option
                    v-for="(item, index) in fryinfobhList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    style="text-align: center"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="table_form_row">
                <span>住院医生：</span>
                <el-select
                  v-model="fzydoctbh"
                  size="mini"
                  clearable
                  filterable
                  placeholder="请选择住院医生"
                  :filter-method="
                    val => getListCy(val, 'fzydoctListSech', 'fzydoctList')
                  "
                >
                  <el-option
                    v-for="(item, index) in fzydoctListSech"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    style="text-align: center"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.code }}</span
                    >
                  </el-option>
                </el-select>
              </div>
              <div class="table_form_row">
                <el-button size="small" type="primary" @click="handleCheck"
                  >核查首页</el-button
                >
                <el-button
                  :disabled="isExport"
                  title="核查通过后可生成!"
                  size="small"
                  type="primary"
                  @click="handleGenerate"
                  >生成病案首页</el-button
                >
                <el-dropdown
                  size="small"
                  type="primary"
                  @command="handleDropdown"
                  title="核查通过后可导出!"
                >
                  <el-button type="primary" size="small">
                    导出病案<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      command="a"
                      class="clearfix"
                      :disabled="isExport"
                      >导出病案首页</el-dropdown-item
                    >
                    <el-dropdown-item
                      command="b"
                      class="clearfix"
                      :disabled="isExport"
                      >导出医保病案首页</el-dropdown-item
                    >
                    <el-dropdown-item
                      command="c"
                      class="clearfix"
                      :disabled="isExport"
                      >导出网络直报数据</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
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
                prop="fprn"
                label="病案号"
                width="100"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="ftimes"
                label="住院次数"
                width="80"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fname"
                label="姓名"
                width="80"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fname"
                label="出院科别"
                width="200"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fexplain"
                label="提示内容"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="fhint"
                label="说明"
              ></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <new-pagination
            layout="total"
            :total="pagsOne.total"
          ></new-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPaymentList,
  getMarriageList,
  getMedicalQualityList,
  getDeptList,
  getDoctorList,
  postInspectList,
  postExportUpload
} from "@/api";
import { date } from "@/utils/date.js";
export default {
  data() {
    return {
      isExport: true,
      radio: 2,
      // 选择年
      chooseYear: "",
      // 选择月
      chooseMonth: "",
      //费别
      ffbbh: "",
      //费别数组
      ffbbhList: [{ label: "全部", value: "", code: "QB" }],
      ffbbhListSech: [{ label: "全部", value: "", code: "QB" }],
      //性别
      sex: "",
      sexList: [
        { label: "全部", value: "", code: "QB" },
        { label: "男", value: "1" },
        { label: "女", value: "2" }
      ],
      //婚姻
      fstatus: "",
      fstatusList: [{ label: "全部", value: "", code: "QB" }],
      fstatusListSech: [{ label: "全部", value: "", code: "QB" }],
      //病案质量
      fqualitybh: "",
      fqualityList: [{ label: "全部", value: "", code: "QB" }],
      fqualityListSech: [{ label: "全部", value: "", code: "QB" }],
      //出院科别
      deptbh: "",
      deptCyList: [{ label: "全院", value: "", code: "QY" }],
      deptCyListSech: [{ label: "全院", value: "", code: "QY" }],
      //入院情况
      fryinfobh: "",
      fryinfobhList: [
        { label: "全部", value: "" },
        {
          label: "危",
          value: "1"
        },
        {
          label: "急",
          value: "2"
        },
        {
          label: "一般",
          value: "3"
        }
      ],
      //住院医生
      fzydoctbh: "",
      fzydoctList: [{ label: "全部", value: "", code: "QB" }],
      fzydoctListSech: [{ label: "全部", value: "", code: "QB" }],
      //分页
      pagsOne: {
        total: 0
      },
      tableList: []
    };
  },
  created() {
    // 初始化日期数据
    this.radio = 2;
    let dateTime = new Date();
    this.chooseYear = date(new Date(), "yyyy");
    let sjMonths = date(new Date(), "yyyy-MM");
    this.chooseMonth =
      dateTime.getMonth() == 0 ? Number(this.chooseYear) - 1 + "-12" : sjMonths;
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
    this.getFfbbhList();
    this.getFstatusList();
    this.getFqualityList();
    this.getdeptList();
    this.getDoctor();
  },
  methods: {
    //核查首页
    handleCheck() {
      let data = {
        dateType: this.radio,
        year: this.chooseYear,
        month: this.chooseMonth,
        payType: this.ffbbh,
        sex: this.sex,
        maritalStatus: this.fstatus,
        medicalQuality: this.fquality,
        fcydept: this.deptbh,
        admissionStatus: this.fryinfobh,
        doctor: this.fzydoctbh
      };
      postInspectList(data).then(res => {
        console.log(res, "核查首页");
        if (res.state === "10000") {
          this.isExport = true;
          this.tableList = res.result;
          this.pagsOne.total = Number(res.result.length);
          this.$message.warning("前往首页录入修改病案后可生成/导出病案!");
        } else if (res.state === "10002") {
          this.isExport = false;
          this.$message.success("核查通过!");
          this.tableList = [];
          this.pagsOne.total = 0;
        } else {
          this.isExport = true;
          this.$message.error(res.message);
          this.tableList = [];
          this.pagsOne.total = 0;
        }
      });
    },
    //生成病案首页
    handleGenerate() {
      let data = {
        dateType: this.radio,
        year: this.chooseYear,
        month: this.chooseMonth,
        payType: this.ffbbh,
        sex: this.sex,
        maritalStatus: this.fstatus,
        medicalQuality: this.fquality,
        fcydept: this.deptbh,
        admissionStatus: this.fryinfobh,
        doctor: this.fzydoctbh
      };
      postExportUpload(data).then(res => {
        console.log(res);
        if (res.state === "200") {
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //导出病案首页 a/医保病案首页 b/网络直报数据 c
    handleDropdown(e) {
      console.log(e);
      let data = {
        dateType: this.radio,
        year: this.chooseYear,
        month: this.chooseMonth,
        payType: this.ffbbh,
        sex: this.sex,
        maritalStatus: this.fstatus,
        medicalQuality: this.fquality,
        fcydept: this.deptbh,
        admissionStatus: this.fryinfobh,
        doctor: this.fzydoctbh
      };
      if (e == "a") {
      } else if (e == "b") {
      } else {
      }
    },
    //医疗付费方式
    getFfbbhList() {
      getPaymentList().then(res => {
        console.log(res, "医疗付费方式");
        this.ffbbhList = [{ label: "全部", value: "", code: "QB" }];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.ffbbhList.push({
              label: item.fkfs,
              value: item.fkfsbh
            });
          });
          this.ffbbhListSech = this.ffbbhList;
          this.ffbbh = this.ffbbhList[0].value;
        } else {
          this.ffbbhList = [{ label: "全部", value: "", code: "QB" }];
          this.ffbbhListSech = this.ffbbhList;
          this.ffbbh = "";
        }
      });
    },
    //婚姻
    getFstatusList() {
      getMarriageList().then(res => {
        console.log(res, "婚姻");
        this.fstatusList = [{ label: "全部", value: "", code: "QB" }];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fstatusList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
          this.fstatusListSech = this.fstatusList;
          this.fstatus = this.fstatusList[0].value;
        } else {
          this.fstatusList = [{ label: "全部", value: "", code: "QB" }];
          this.fstatusListSech = this.fstatusList;
          this.fstatus = "";
        }
      });
    },
    //病案质量
    getFqualityList() {
      getMedicalQualityList().then(res => {
        console.log(res, "病案质量");
        this.fqualityList = [{ label: "全部", value: "", code: "QB" }];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fqualityList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
          this.fqualityListSech = this.fqualityList;
          this.fquality = this.fqualityList[0].value;
        } else {
          this.fqualityList = [{ label: "全部", value: "", code: "QB" }];
          this.fqualityListSech = this.fqualityList;
          this.fquality = "";
        }
      });
    },
    //出院科室
    getdeptList() {
      let data = {
        type: 2
      };
      getDeptList(data).then(res => {
        console.log(res, "科室");
        this.deptCyList = [{ label: "全院", value: "", code: "QY" }];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.deptCyList.push({
              label: item.dept,
              value: String(item.deptbh),
              code: item.fremember
            });
          });
          this.deptCyListSech = this.deptCyList;
          this.deptbh = this.deptCyList[0].value;
        } else {
          this.deptCyList = [{ label: "全院", value: "", code: "QY" }];
          this.deptCyListSech = this.deptCyList;
          this.deptbh = "";
        }
      });
    },
    //住院医生
    getDoctor() {
      getDoctorList().then(res => {
        this.fzydoctList = [{ label: "全部", value: "", code: "QB" }];
        console.log(res, "住院医生");
        this.docList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fzydoctList.push({
              label: item.docName,
              value: item.docId,
              code: item.fremember
            });
          });
          this.fzydoctListSech = this.fzydoctList;
          this.fzydoctbh = this.fzydoctList[0].value;
        } else {
          this.fzydoctList = [{ label: "全部", value: "", code: "QB" }];
          this.fzydoctListSech = this.fzydoctList;
          this.fzydoctbh = "";
        }
      });
    },
    //医疗付费方式/婚姻/病案质量/出院科室/住院医生查询
    getListCy(val, arr, arr1) {
      if (val !== "") {
        this[arr] = this[arr1].filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(val) > -1
            );
          });
        });
      } else {
        this[arr] = this[arr1];
      }
    },
    // 年
    changeYear() {
      sessionStorage.setItem("radioSelect", 1);
      let monthList = this.chooseMonth.split("-");
      this.chooseMonth = this.chooseYear + "-" + monthList[1];
    },
    // 月
    changeMonth() {
      sessionStorage.setItem("radioSelect", 2);
      let monthList = this.chooseMonth.split("-");
      this.chooseYear = monthList[0];
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
      .table_top_left {
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .date_radio {
          .el-radio-group {
            width: 100%;
            display: flex;
            .el-radio {
              align-items: center;
              margin-right: 10px;
            }
          }
        }
      }
      .table_top_right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row-reverse;
      }
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
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      .table_form_row {
        width: 24%;
        height: 50px;
        line-height: 50px;
        padding-left: 5px;
        .el-select {
          width: 200px;
        }
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
