<template>
  <!-- 住院信息 -->
  <div class="main">
    <Entry-Button
      :pprns="fprn"
      :names="names"
      :ftimes="ftimes"
      :ages="fages"
      :isSave="isSaves"
      @handleCheck="handleCheck"
      @handleSave="handleSave"
      @resetForm="resetForm"
    ></Entry-Button>
    <div class="main_wrap">
      <div class="main_wraps">
        <!-- 基本信息 -->
        <div class="basicMess_main">
          <el-form
            :model="formList"
            :rules="rules"
            ref="formList"
            label-width="100px"
            class="demo-ruleForm"
          >
            <div class="main_hearder_items">
              <div class="hearder_item">
                <el-form-item label="入院途径" prop="frytjbh">
                  <el-select
                    v-model="formList.frytjbh"
                    size="mini"
                    ref="frytjbh"
                    remote
                    clearable
                    filterable
                    placeholder="请选择"
                    :remote-method="getFrytjbhList"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="(item, index) in frytjbhList"
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
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="入院日期" prop="ryDate">
                  <el-date-picker
                    class="ry_date"
                    ref="ryDate"
                    size="mini"
                    v-model="formList.ryDate"
                    :editable="true"
                    type="datetime"
                    :picker-options="pickerOptions"
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
              <!-- <div class="hearder_item">
                <el-form-item label="入院时间" prop="frytime">
                  <el-input
                    ref="frytime"
                    v-model="formList.frytime"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div> -->
              <div class="hearder_item">
                <el-form-item label="入院科别" prop="frytykh">
                  <el-select
                    v-model="formList.frytykh"
                    size="mini"
                    ref="frytykh"
                    remote
                    filterable
                    placeholder="请选择"
                    :remote-method="getdeptListRy"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="(item, index) in deptObj.deptRyList"
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
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="入院病区" prop="finpatientward">
                  <el-input
                    ref="finpatientward"
                    v-model="formList.finpatientward"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div
              class="main_hearder_items"
              v-for="(item, index) in formList.zkList"
              :key="index"
            >
              <div class="hearder_item">
                <el-form-item
                  :label="'转科日期' + index"
                  :prop="'fzkdate' + index"
                >
                  <el-date-picker
                    :picker-options="pickerOptionsStart"
                    class="ry_date"
                    :id="'fzkdate' + index"
                    :ref="'fzkdate' + index"
                    size="mini"
                    v-model="formList.zkList[index].fzkdate"
                    :editable="true"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
              <!-- <div class="hearder_item">
                <el-form-item
                  :label="'转科时间' + index"
                  :prop="'fzktime' + index"
                >
                  <el-input
                    :ref="'fzktime' + index"
                    v-model="formList.zkList[index].fzktime"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div> -->
              <div class="hearder_item" style="width: 48%;">
                <el-form-item
                  :label="'转科科别' + index"
                  :prop="'fzktykh' + index"
                >
                  <el-select
                    v-model="formList.zkList[index].fzktykh"
                    size="mini"
                    :id="'fzktykh' + index"
                    :ref="'fzktykh' + index"
                    remote
                    filterable
                    clearable
                    placeholder="请选择"
                    style="width: 38%;"
                  >
                    <el-option
                      v-for="(items, indexs) in deptObj['deptList' + index]"
                      :key="'option' + index + 'key' + indexs"
                      :label="items.label"
                      :value="items.value"
                      style="text-align: center"
                    >
                      <span style="float: left">{{ items.label }}</span>
                      <span
                        style="float: right; color: #8492a6; font-size: 13px"
                        >{{ items.code }}</span
                      >
                    </el-option>
                  </el-select>
                  <el-button
                    size="mini"
                    type="success"
                    icon="el-icon-plus"
                    circle
                    @click="addDomain"
                  ></el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    v-if="index != 0"
                    icon="el-icon-delete"
                    circle
                    @click="removeDomain(item)"
                  ></el-button>
                </el-form-item>
              </div>
              <div class="hearder_item"></div>
            </div>
            <div class="main_hearder_items">
              <div class="hearder_item">
                <el-form-item label="出院日期" prop="cyDate">
                  <el-date-picker
                    class="ry_date"
                    ref="cyDate"
                    size="mini"
                    v-model="formList.cyDate"
                    :editable="true"
                    type="datetime"
                    :picker-options="pickerOptionsEnd"
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
              <!-- <div class="hearder_item">
                <el-form-item label="出院时间" prop="fcytime">
                  <el-input
                    ref="fcytime"
                    v-model="formList.fcytime"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div> -->
              <div class="hearder_item">
                <el-form-item label="出院科别" prop="deptbh">
                  <el-select
                    v-model="formList.deptbh"
                    size="mini"
                    ref="deptbh"
                    remote
                    filterable
                    placeholder="请选择"
                    :remote-method="getdeptListCy"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="(item, index) in deptObj.deptCyList"
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
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="出院病区" prop="fcyinpatientward">
                  <el-input
                    ref="fcyinpatientward"
                    v-model="formList.fcyinpatientward"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="实际住院天数" prop="fsjzyts">
                  <el-input
                    :readonly="true"
                    ref="fsjzyts"
                    v-model="formList.fsjzyts"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="main_hearder_items">
              <div class="hearder_item" style="width: 48%;">
                <el-form-item label="门（急）诊诊断" prop="fmzzdbh">
                  <el-select
                    v-model="formList.fmzzdbh"
                    size="mini"
                    ref="fmzzdbh"
                    filterable
                    placeholder="请选择"
                    :filter-method="getFmzzdList"
                    style="width: 56%;"
                    @change="handleFmzzd"
                  >
                    <el-option
                      v-for="(item, index) in fmzzdList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      style="text-align: center"
                    >
                      <div style="display: flex;text-align: center;">
                        <span style="flex: 2;text-align: left;">{{
                          item.label
                        }}</span>
                        <span style="flex: 1;">{{ item.value }}</span>
                        <span style="flex: 1;">{{ item.code }}</span>
                        <span style="flex: 1;text-align: right;">{{
                          item.type
                        }}</span>
                      </div>
                    </el-option>
                  </el-select>
                  <el-input
                    style="width:14%;"
                    v-model="formList.fmzzdbh"
                    size="mini"
                    disabled
                  ></el-input>
                  <el-switch
                    @change="handleSwitch"
                    style="width:28%;"
                    v-model="fmzzdSwitch"
                    active-color="#13ce66"
                    inactive-color="#409eff"
                    active-text="广东码"
                    inactive-text="国家码"
                  >
                  </el-switch>
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="门（急）诊医生" prop="fmzdoctbh">
                  <el-select
                    v-model="formList.fmzdoctbh"
                    size="mini"
                    ref="fmzdoctbh"
                    filterable
                    placeholder="请选择"
                    :filter-method="getDoctor"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="(item, index) in docList"
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
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="入院时情况" prop="fryinfobh">
                  <el-select
                    v-model="formList.fryinfobh"
                    size="mini"
                    ref="fryinfobh"
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="(item, index) in fryinfoList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      style="text-align: center"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="main_hearder_items">
              <div class="hearder_item" style="width: 48%;">
                <el-form-item label="入院诊断" prop="fryzdbh">
                  <el-select
                    v-model="formList.fryzdbh"
                    size="mini"
                    ref="fryzdbh"
                    filterable
                    placeholder="请选择"
                    :filter-method="getFryzdList"
                    style="width: 56%;"
                    @change="handleFryzd"
                  >
                    <el-option
                      v-for="(item, index) in fryzdList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      style="text-align: center"
                    >
                      <div style="display: flex;text-align: center;">
                        <span style="flex: 2;text-align: left;">{{
                          item.label
                        }}</span>
                        <span style="flex: 1;">{{ item.value }}</span>
                        <span style="flex: 1;">{{ item.code }}</span>
                        <span style="flex: 1;text-align: right;">{{
                          item.type
                        }}</span>
                      </div>
                    </el-option>
                  </el-select>
                  <el-input
                    style="width:14%;"
                    v-model="formList.fryzdbh"
                    size="mini"
                    disabled
                  ></el-input>
                  <el-switch
                    @change="handleSwitchs"
                    style="width:28%;"
                    v-model="fryzdbhSwitch"
                    active-color="#13ce66"
                    inactive-color="#409eff"
                    active-text="广东码"
                    inactive-text="国家码"
                  >
                  </el-switch>
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="入院后确诊日期" prop="fqzdate">
                  <el-date-picker
                    class="ry_date"
                    ref="fqzdate"
                    size="mini"
                    v-model="formList.fqzdate"
                    :editable="true"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>
            <!-- <el-table border style="width: 89%;margin-left: 23px;">
              <el-table-column prop="date" label="日期"> </el-table-column>
              <el-table-column prop="name" label="姓名"> </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
            </el-table>
            <div class="main_hearder_items">
              <div class="hearder_item" style="width:20%">
                <el-form-item label="治疗类别" prop="name">
                  <el-input
                    ref="name"
                    v-model="formList.name"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="门诊诊断中医（病）" prop="name">
                  <el-input
                    ref="name"
                    v-model="formList.name"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="main_hearder_items">
              <div class="hearder_item" style="width:20%">
                <el-form-item label="门诊诊断中医(证)" prop="name">
                  <el-input
                    ref="name"
                    v-model="formList.name"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="实施临床路径" prop="name">
                  <el-input
                    ref="name"
                    v-model="formList.name"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="main_hearder_items">
              <div class="hearder_item" style="width:20%">
                <el-form-item label="使用医疗机构中药制剂" prop="name">
                  <el-input
                    ref="name"
                    v-model="formList.name"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="使用中医诊疗设备" prop="name">
                  <el-input
                    ref="name"
                    v-model="formList.name"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="辩证施护" prop="name">
                  <el-input
                    ref="name"
                    v-model="formList.name"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div>
            </div> -->
          </el-form>
        </div>
        <!-- 说明 -->
        <div class="basicMess_foot">
          <div class="main_hearder_items">
            说明：入院日期、门（急）诊诊断、门（急）诊医生、门诊诊断中医（病）、门诊诊断中医（证）、实施临床路径为强制录入
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  postAddHospitalized,
  getCheckRyDate,
  getPeopleFdays,
  getRYTJList,
  getDeptList,
  getDiagnoseList,
  getDoctorList
} from "@/api";
import EntryButton from "@/components/EntryButton";
export default {
  components: {
    EntryButton
  },
  data() {
    var validateApi = (rule, value) => {
      return new Promise((resolve, reject) => {
        let data = {
          fprn: sessionStorage.fprn,
          ftimes: sessionStorage.ftimes,
          ryDate: value
        };
        // data[rule.field] = value;
        getCheckRyDate(data).then(res => {
          console.log(res, "date");
          if (res.state === "10000") {
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
    };
    //接口校验规则
    var validatePass = async (rule, value, callback) => {
      try {
        const res = await validateApi(rule, value);
        await this.getHod();
        console.log(res, "res", rule);
      } catch (error) {
        callback(new Error(error.message));
      }
    };
    const validatePassHod = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请填写入院日期/出院日期"));
      } else if (Number(value) < 0) {
        callback(new Error("出院日期必须大于入院日期！"));
      } else {
        callback();
      }
    };
    const validateEndTime = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请选择出院日期！"));
      } else {
        if (!this.formList.ryDate) {
          callback(new Error("请选择入院日期！"));
        } else if (Date.parse(this.formList.ryDate) >= Date.parse(value)) {
          callback(new Error("出院日期必须大于入院日期！"));
        } else {
          callback();
          this.getHod();
        }
      }
    };
    var validateZkTime = (rule, value, callback) => {
      console.log(rule, value, callback);
      let listLength = Number(rule.field.substr(rule.field.length - 1, 1));
      console.log(listLength);
      if (
        !this.formList.zkList[listLength].fzkdate &&
        this.formList.zkList[listLength].fzktykh
      ) {
        callback(new Error("请填写转科日期！"));
      } else {
        if (
          Date.parse(this.formList.ryDate) >=
          Date.parse(this.formList.zkList[listLength].fzkdate)
        ) {
          callback(new Error("转科日期必须大于入院日期！"));
        } else {
          callback();
        }
      }
    };
    var validateZk = (rule, value, callback) => {
      console.log(rule, value, callback);
      let listLength = Number(rule.field.substr(rule.field.length - 1, 1));
      console.log(listLength);
      if (
        this.formList.zkList[listLength].fzkdate &&
        !this.formList.zkList[listLength].fzktykh
      ) {
        callback(new Error("请选择转科科别！"));
      } else {
        callback();
      }
    };
    const validateQzTime = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请选择入院后确诊日期！"));
      } else {
        if (!this.formList.ryDate) {
          callback(new Error("请选择入院日期！"));
        } else if (!this.formList.cyDate) {
          callback(new Error("请选择出院日期！"));
        } else if (Date.parse(this.formList.ryDate) >= Date.parse(value)) {
          callback(new Error("入院后确诊日期必须大于入院日期！"));
        } else if (Date.parse(this.formList.cyDate) <= Date.parse(value)) {
          callback(new Error("入院后确诊日期必须小于出院日期！"));
        } else {
          callback();
        }
      }
    };
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pickerOptionsStart: {
        disabledDate: time => {
          let startDateVal = this.formList.ryDate;
          let endDateVal = this.formList.cyDate;
          if (startDateVal && startDateVal) {
            return (
              new Date(endDateVal).getTime() >
              time.getTime() >
              new Date(startDateVal).getTime()
            );
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.formList.ryDate;
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal).getTime();
          }
        }
      },
      //病案号
      fprn: sessionStorage.fprn,
      //姓名
      names: sessionStorage.name,
      //住院次数
      ftimes: sessionStorage.ftimes,
      //年龄
      fages: sessionStorage.fage,
      //校验之后才能保存!
      isSaves: true,
      //入院途径数组
      frytjbhList: [],
      //科室数组 入院
      frydeptList: [],
      //科室数组 转科
      fzkdeptList: [],
      //科室数组 出院
      fcydeptList: [],
      //门急诊诊断
      fmzzdList: [],
      //医生
      docList: [],
      //入院时情况
      fryinfoList: [
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
      //入院诊断
      fryzdList: [],
      deptObj: {
        deptRyList: [],
        deptList0: [],
        deptCyList: []
      },
      //门（急）诊诊断国家码/广东码
      fmzzdSwitch: false,
      //入院诊断国家码/广东码
      fryzdbhSwitch: false,
      formList: {
        //入院途径
        frytj: "",
        //入院途径编号
        frytjbh: "",
        //入院日期
        ryDate: "",
        //入院时间
        // frytime: "",
        //入院科别
        frydept: "",
        //入院科别编号
        frytykh: "",
        //入院病区
        finpatientward: "",
        zkList: [
          {
            //转科日期
            fzkdate: "",
            // fzktime: "",
            //转科科别
            fzktykh: ""
          }
        ],
        //出院日期
        cyDate: "",
        //出院时间
        // fcytime: "",
        //出院科别
        dept: "",
        //出院科别编号
        deptbh: "",
        //出院病区
        fcyinpatientward: "",
        //实际住院天数
        fsjzyts: "",
        //门（急）诊诊断
        fmzzd: "",
        //门（急）诊诊断编号
        fmzzdbh: "",
        //门（急）诊医生
        fmzdoct: "",
        //门（急）诊医生编号
        fmzdoctbh: "",
        //入院时情况编号
        fryinfobh: "",
        //入院诊断
        fryzd: "",
        //入院诊断编号
        fryzdbh: "",
        //入院后确诊日期
        fqzdate: ""
      },
      //用来动态生成转科信息校验规则
      validateZkTimes: validateZkTime,
      validateZks: validateZk,
      //校验规则
      rules: {
        //入院途径编号
        // frytjbh: [
        //   {
        //     validator: validatePassDate,
        //     trigger: "blur"
        //   }
        // ],
        //入院日期
        ryDate: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //转科日期
        fzkdate0: [
          {
            validator: validateZkTime,
            trigger: ["blur", "change"]
          }
        ],
        // fzktime0: [
        //   {
        //     validator: validatePassDate,
        //     trigger: "blur"
        //   }
        // ],
        //转科科别
        fzktykh0: [
          {
            validator: validateZk,
            trigger: ["blur", "change"]
          }
        ],
        //出院日期
        cyDate: [
          {
            required: true,
            validator: validateEndTime,
            trigger: ["blur", "change"]
          }
        ],
        fsjzyts: [
          {
            required: true,
            validator: validatePassHod,
            trigger: "blur"
          }
        ],
        //入院后确诊日期
        fqzdate: [
          {
            required: true,
            validator: validateQzTime,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  created() {
    this.getFrytjbhList();
    this.getdeptLists();
    this.getFmzzdList();
    this.getFryzdList();
    this.getDoctor();
  },
  methods: {
    //入院途径
    getFrytjbhList(val) {
      let data = {
        dictCode: val
      };
      getRYTJList(data).then(res => {
        console.log(res, "入院途径");
        this.frytjbhList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.frytjbhList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
          setTimeout(() => {
            this.formList.frytjbh = this.frytjbhList[0].value;
          }, 200);
        } else {
          this.frytjbhList = [];
          this.formList.frytjbh = "";
        }
      });
    },
    //科室
    getdeptLists() {
      let data = {
        type: 2
      };
      getDeptList(data).then(res => {
        console.log(res, "科室");
        this.frydeptList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.frydeptList.push({
              label: item.dept,
              value: String(item.deptbh),
              code: item.fremember
            });
          });
          this.deptObj.deptRyList = this.frydeptList;
          this.formList.frytykh = this.frydeptList[0].value;
          this.deptObj.deptList0 = this.frydeptList;
          this.deptObj.deptCyList = this.frydeptList;
          this.formList.deptbh = this.frydeptList[0].value;
        } else {
          this.frydeptList = [];
          this.deptObj.deptRyList = [];
          this.formList.frytykh = "";
          this.deptObj.deptList0 = [];
          this.deptObj.deptCyList = [];
          this.formList.deptbh = "";
        }
      });
    },
    //获取住院天数
    getHod() {
      let data = {
        ryDate: this.formList.ryDate,
        cyDate: this.formList.cyDate
      };
      getPeopleFdays(data).then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.formList.fsjzyts = res.result;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //门急诊诊断
    getFmzzdList(val) {
      let data = {
        fzjc: val,
        type: this.fmzzdSwitch ? 1 : 2
      };
      getDiagnoseList(data).then(res => {
        console.log(res, "门急诊诊断");
        this.fmzzdList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fmzzdList.push({
              label: item.icdmName,
              value: item.icdm,
              code: item.fzjc,
              type: item.type
            });
          });
          setTimeout(() => {
            this.formList.fmzzdbh = this.fmzzdList[0].value;
          }, 200);
        } else {
          this.fmzzdList = [];
          this.formList.fmzzdbh = "";
        }
      });
    },
    //门急诊诊断 匹配label
    handleFmzzd(val, index, arr) {
      console.log(val, index, arr);
      this.fmzzdList.forEach((items, indexs) => {
        if (val == items.value) {
          this.formList.fmzzd = items.label;
        }
      });
      console.log(this.formList.fmzzd);
    },
    //切换门急诊诊断国家码/广东码
    handleSwitch() {
      this.getFmzzdList();
    },
    //入院诊断
    getFryzdList(val) {
      let data = {
        fzjc: val,
        type: this.fryzdbhSwitch ? 1 : 2
      };
      getDiagnoseList(data).then(res => {
        console.log(res, "入院诊断");
        this.fryzdList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fryzdList.push({
              label: item.icdmName,
              value: item.icdm,
              code: item.fzjc,
              type: item.type
            });
          });
          setTimeout(() => {
            this.formList.fryzdbh = this.fryzdList[0].value;
          }, 200);
        } else {
          this.fryzdList = [];
          this.formList.fryzdbh = "";
        }
      });
    },
    //门急诊诊断 匹配label
    handleFryzd(val, index, arr) {
      console.log(val, index, arr);
      this.fryzdList.forEach((items, indexs) => {
        if (val == items.value) {
          this.formList.fryzd = items.label;
        }
      });
      console.log(this.formList.fryzd);
    },
    //切换入院诊断国家码/广东码
    handleSwitchs() {
      this.getFryzdList();
    },
    //医生
    getDoctor(val) {
      let data = {
        fremember: val
      };
      getDoctorList(data).then(res => {
        console.log(res, "医生");
        this.docList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.docList.push({
              label: item.docName,
              value: item.docId,
              code: item.fremember
            });
          });
          setTimeout(() => {
            this.formList.fmzdoctbh = this.docList[0].value;
          }, 200);
        } else {
          this.docList = [];
          this.formList.fmzdoctbh = "";
        }
      });
    },
    //入院科室查询
    getdeptListRy(val) {
      if (val !== "") {
        this.deptObj.deptRyList = this.frydeptList.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(val) > -1
            );
          });
        });
      } else {
        this.deptObj.deptRyList = this.frydeptList;
      }
    },
    //转科科室查询-bug不可用
    getdeptListZk(val, id) {
      console.log(val, id);
      console.log(this.fzkdeptList, this.deptObj);
      if (val !== "") {
        this.deptObj["deptList" + id] = this.fzkdeptList.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(val) > -1
            );
          });
        });
      } else {
        this.deptObj["deptList" + id] = this.fzkdeptList;
      }
    },
    //出院科室查询
    getdeptListCy(val) {
      if (val !== "") {
        this.deptObj.deptCyList = this.frydeptList.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(val) > -1
            );
          });
        });
      } else {
        this.deptObj.deptCyList = this.frydeptList;
      }
    },
    //添加多个转科数据
    addDomain() {
      this.formList.zkList.push({
        fzkdate: "",
        // fzktime: "",
        fzktykh: ""
      });
      this.rules["fzkdate" + (this.formList.zkList.length - 1)] = [
        {
          validator: this.validateZkTimes,
          trigger: ["blur", "change"]
        }
      ];
      this.rules["fzktykh" + (this.formList.zkList.length - 1)] = [
        {
          validator: this.validateZks,
          trigger: ["blur", "change"]
        }
      ];
      this.deptObj[
        "deptList" + (this.formList.zkList.length - 1)
      ] = this.frydeptList;

      console.log(
        this.formList.zkList,
        this.formList.zkList.length,
        this.rules,
        this.deptObj
      );
    },
    //删除转科数据
    removeDomain(item) {
      let index = this.formList.zkList.indexOf(item);
      if (index !== -1) {
        this.formList.zkList.splice(index, 1);
      }
      console.log(this.formList.zkList, this.formList);
    },
    // 校验
    handleCheck(data) {
      console.log(data);
      this.$refs["formList"].validate(valid => {
        if (valid) {
          this.isSaves = false;
          this.$message.success("校验成功");
        } else {
          this.isSaves = true;
          return false;
        }
      });
    },
    //保存
    handleSave(data) {
      //过滤掉为空的项的肿瘤卡信息
      let zkFilterData = Object.values(this.formList.zkList).filter(function(
        item
      ) {
        if (item !== "") {
          return true; //过滤掉为空的项
        }
      });
      let datas = {
        //病案号
        fprn: sessionStorage.fprn,
        //住院次数
        ftimes: sessionStorage.ftimes,
        //入院途径
        // frytj: this.formList.frytj,
        //入院途径编号
        frytjbh: this.formList.frytjbh,
        //入院日期
        ryDate: this.formList.ryDate,
        //入院科别
        // frydept: this.formList.frydept,
        //入院科别编号
        frytykh: this.formList.frytykh,
        //入院病区
        finpatientward: this.formList.finpatientward,
        zkList: JSON.stringify(zkFilterData),
        //出院日期
        cyDate: this.formList.cyDate,
        //出院科别
        // dept: this.formList.dept,
        //出院科别编号
        deptbh: this.formList.deptbh,
        //出院病区
        fcyinpatientward: this.formList.fcyinpatientward,
        //实际住院天数
        fsjzyts: this.formList.fsjzyts,
        //门（急）诊诊断
        fmzzd: this.formList.fmzzd,
        //门（急）诊诊断编号
        fmzzdbh: this.formList.fmzzdbh,
        //门（急）诊医生
        // fmzdoct: this.formList.fmzdoct,
        //门（急）诊医生编号
        fmzdoctbh: this.formList.fmzdoctbh,
        //入院时情况编号
        fryinfobh: this.formList.fryinfobh,
        //入院时情况编号
        fryinfobh: this.formList.fryinfobh,
        //入院诊断
        fryzd: this.formList.fryzd,
        //入院诊断编号
        fryzdbh: this.formList.fryzdbh,
        //入院后确诊日期
        fqzdate: this.formList.fqzdate
      };
      postAddHospitalized(this.$qs.stringify(datas)).then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.$message.success("保存成功!");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 清空表单验证
    resetForm() {
      this.$refs["formList"].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.main_wraps {
  height: 100%;
  font-size: 14px;
  color: #515355;
}
.demo-ruleForm {
  width: 100%;
}
/deep/ .el-form-item__label {
  width: 154px !important;
}
/deep/ .el-form-item__content {
  margin-left: 154px !important;
}
.el-form-item {
  margin-bottom: 0px !important;
}
.hearder_item {
  width: 24%;
  display: inline-block;
}
.main_hearder_items {
  height: 40px;
  line-height: 40px;
  margin: 15px 0px 15px 0px;
  background-color: #f3f3f3;
  padding: 0px 10px 0px 15px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
}
// .hearder_content {
//   border-top-style: none;
//   border-right-style: none;
//   border-left-style: none;
//   border-bottom-style: solid;
//   border-bottom: solid 1px #000;
//   text-align: center;
//   width: 36%;
// }
// .main_hearder_content {
//   border-top-style: none;
//   border-right-style: none;
//   border-left-style: none;
//   border-bottom-style: solid;
//   border-bottom: solid 1px #000;
//   text-align: center;
// }
// /* 输入框 */
// .paperview-input-text-f >>> .el-input__inner {
//   width: 60%;
//   height: 18px;
//   line-height: 18px;
//   -webkit-appearance: none;
//   background-image: none;
//   border: 0px;
//   border-bottom: solid 1px red;
//   border-radius: 0px;
// }
.ry_date {
  width: 240px;
}
/deep/ .el-input__inner {
  text-align: center;
}
input:focus {
  outline: none;
}
.basicMess_tip {
  border: solid 1px #d0d0d0;
  background-color: #fbfbfb;
  width: 55%;
  margin-left: 10px;
}
.tip {
  color: #31860b;
  font-weight: 700;
}
</style>
