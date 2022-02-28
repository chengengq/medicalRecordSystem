<template>
  <!-- 基本信息 -->
  <div class="main">
    <Entry-Button
      :pprns="formList.fprn"
      :names="formList.name"
      :ftimes="formList.ftimes"
      :ages="formList.fage"
      :isSave="isSaves"
      @handleCheck="handleCheck"
      @handleSave="handleSave"
      @resetForm="resetForm"
    ></Entry-Button>
    <div class="main_wrap">
      <div class="main_wraps">
        <div class="basicMess">
          <div class="basicMess_hearder">
            <el-form
              :model="formList"
              :rules="rules"
              ref="formList"
              label-width="150px"
              class="demo-ruleForm"
            >
              <!-- 头部信息 -->
              <div class="hearder_items">
                <div class="hearder_item">
                  <el-form-item label="病案号" prop="fprn">
                    <el-input
                      :disabled="isPprn"
                      ref="fprn"
                      v-model="formList.fprn"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item
                    label="住院次数"
                    prop="ftimes"
                    style="width: 78%;"
                  >
                    <el-input
                      disabled
                      ref="ftimes"
                      v-model="formList.ftimes"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="医疗付费方式" prop="ffbbh">
                    <el-select
                      v-model="formList.ffbbh"
                      size="mini"
                      ref="ffbbh"
                      remote
                      clearable
                      filterable
                      placeholder="请选择"
                      :remote-method="getFfbbhList"
                    >
                      <el-option
                        v-for="(item, index) in ffbbhList"
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
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="健康卡号" prop="zyid">
                    <el-input
                      ref="zyid"
                      v-model="formList.zyid"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <!-- 基本信息 -->
              <div class="main_hearder_items">
                <div class="hearder_item">
                  <el-form-item label="姓名" prop="name" style="width: 78%;">
                    <el-input
                      ref="name"
                      v-model="formList.name"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="性别" prop="sexBh">
                    <el-select
                      v-model="formList.sexBh"
                      size="mini"
                      ref="sexBh"
                      placeholder="请选择"
                    >
                      <el-option
                        label="男"
                        value="1"
                        style="text-align: center"
                      >
                      </el-option>
                      <el-option
                        label="女"
                        value="2"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="出生日期" prop="fbirthday">
                    <el-date-picker
                      ref="fbirthday"
                      size="mini"
                      style="width: 235px"
                      v-model="formList.fbirthday"
                      :editable="true"
                      type="date"
                      :format="formatDate"
                      placeholder="选择日期yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      @change="getpeopleYearByBirthDay"
                      @focus="dateFocus"
                      @blur="dateBlur"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="年龄" prop="fage">
                    <el-input
                      ref="fage"
                      v-model="formList.fage"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item">
                  <el-form-item label="国籍" prop="fcountrybh">
                    <el-select
                      v-model="formList.fcountrybh"
                      size="mini"
                      ref="fcountrybh"
                      remote
                      clearable
                      filterable
                      placeholder="请选择"
                      :remote-method="handlenationalityList"
                      @change="handlenationalityList"
                    >
                      <el-option
                        v-for="(item, index) in nationalityList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                        ><span style="float: left">{{ item.label }}</span>
                        <span
                          style="float: right; color: #8492a6; font-size: 13px"
                          >{{ item.code }}</span
                        >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="民族" prop="fnationalitybh">
                    <el-select
                      v-model="formList.fnationalitybh"
                      size="mini"
                      ref="fnationalitybh"
                      remote
                      clearable
                      filterable
                      placeholder="请选择"
                      :remote-method="getfnationalitybhList"
                    >
                      <el-option
                        v-for="(item, index) in fnationalitybhList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                        ><span style="float: left">{{ item.label }}</span>
                        <span
                          style="float: right; color: #8492a6; font-size: 13px"
                          >{{ item.code }}</span
                        >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="新生儿出生体重" prop="fcstz">
                    <el-input
                      ref="fcstz"
                      v-model="formList.fcstz"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="新生儿入院体重" prop="frytz">
                    <el-input
                      ref="frytz"
                      v-model="formList.frytz"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item" style="width:48%">
                  <el-form-item label="出生地" prop="fbirthplace">
                    <el-cascader
                      size="mini"
                      :options="options"
                      v-model="fbirthplaceAddress"
                      @change="handleFbirthplace"
                      style="width: 30%"
                    >
                    </el-cascader>
                    <el-input
                      placeholder="请输入详细地址"
                      style="width: 65%"
                      ref="fbirthplace"
                      v-model="formList.fbirthplace"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item" style="width:48%">
                  <el-form-item label="籍贯" prop="fnative">
                    <el-cascader
                      size="mini"
                      :options="option"
                      v-model="fnativeAddress"
                      @change="handleFnative"
                      style="width: 30%"
                    >
                    </el-cascader>
                    <el-input
                      placeholder="请输入详细地址"
                      style="width: 65%"
                      ref="fnative"
                      v-model="formList.fnative"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item">
                  <el-form-item label="身份证号" prop="fidcard">
                    <el-input
                      ref="fidcard"
                      v-model="formList.fidcard"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="职业" prop="fjob">
                    <el-select
                      v-model="formList.fjob"
                      size="mini"
                      ref="fjob"
                      remote
                      clearable
                      filterable
                      placeholder="请选择"
                      :remote-method="getFjobList"
                      style="width: 83%;"
                    >
                      <el-option
                        v-for="(item, index) in fjobList"
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
                  <el-form-item label="婚姻" prop="fstatus">
                    <el-select
                      v-model="formList.fstatus"
                      size="mini"
                      ref="fstatus"
                      remote
                      clearable
                      filterable
                      placeholder="请选择"
                      :remote-method="getFstatusList"
                      style="width: 83%;"
                    >
                      <el-option
                        v-for="(item, index) in fstatusList"
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
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item" style="width: 48%">
                  <el-form-item label="现住址" prop="fcurraddr">
                    <el-cascader
                      size="mini"
                      :options="options"
                      v-model="fcurraddrAddress"
                      @change="handleFcurraddr"
                      style="width: 30%"
                    >
                    </el-cascader>
                    <el-input
                      placeholder="请输入详细地址"
                      ref="fcurraddr"
                      v-model="formList.fcurraddr"
                      size="mini"
                      style="width: 65%"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="电话" prop="fcurrtele">
                    <el-input
                      ref="fcurrtele"
                      v-model="formList.fcurrtele"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="邮政编码" prop="fcurrpost">
                    <el-input
                      ref="fcurrpost"
                      v-model="formList.fcurrpost"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item" style="width: 48%">
                  <el-form-item label="户口住址" prop="fhkaddr">
                    <el-cascader
                      size="mini"
                      :options="options"
                      v-model="fhkaddrAddress"
                      @change="handleFhkaddr"
                      style="width: 30%"
                    >
                    </el-cascader>
                    <el-input
                      placeholder="请输入详细地址"
                      ref="fhkaddr"
                      v-model="formList.fhkaddr"
                      size="mini"
                      style="width: 65%"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="病人来源" prop="fsourcebh">
                    <el-select
                      v-model="formList.fsourcebh"
                      size="mini"
                      ref="fsourcebh"
                      remote
                      clearable
                      filterable
                      placeholder="请选择"
                      :remote-method="getFsourcebhList"
                      style="width: 83%;"
                    >
                      <el-option
                        v-for="(item, index) in FsourcebhList"
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
                  <el-form-item label="邮政编码" prop="fhlpost">
                    <el-input
                      ref="fhlpost"
                      v-model="formList.fhlpost"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item" style="width: 48%">
                  <el-form-item label="工作单位及住址" prop="fdwaddr">
                    <el-cascader
                      size="mini"
                      :options="options"
                      v-model="fdwaddrAddress"
                      @change="handleFdwaddr"
                      style="width: 30%"
                    >
                    </el-cascader>
                    <el-input
                      placeholder="请输入详细地址"
                      ref="fdwaddr"
                      v-model="formList.fdwaddr"
                      size="mini"
                      style="width: 65%"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="单位电话" prop="fdwtele">
                    <el-input
                      ref="fdwtele"
                      v-model="formList.fdwtele"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="邮政编码" prop="fdwpost">
                    <el-input
                      ref="fdwpost"
                      v-model="formList.fdwpost"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item" style="width: 48%">
                  <el-form-item label="联系人地址" prop="flxaddr">
                    <el-cascader
                      size="mini"
                      :options="options"
                      v-model="flxaddrAddress"
                      @change="handleFlxaddr"
                      style="width: 30%"
                    >
                    </el-cascader>
                    <el-input
                      ref="flxaddr"
                      v-model="formList.flxaddr"
                      size="mini"
                      style="width: 65%"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item" style="width: 14%">
                  <el-form-item label="联系人姓名" prop="flxname">
                    <el-input
                      ref="flxname"
                      v-model="formList.flxname"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item" style="width: 19%">
                  <el-form-item label="联系人关系" prop="frelate">
                    <el-select
                      v-model="formList.frelate"
                      size="mini"
                      ref="frelate"
                      remote
                      clearable
                      filterable
                      placeholder="请选择"
                      :remote-method="getFrelateList"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="(item, index) in frelateList"
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
                <div class="hearder_item" style="width: 15%">
                  <el-form-item label="联系人电话" prop="flxphone">
                    <el-input
                      ref="flxphone"
                      v-model="formList.flxphone"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
          <!-- 提示信息 -->
          <!-- 说明 -->
          <div class="basicMess_foot">
            <div class="main_hearder_items">
              说明：病案号、付费方式、姓名、出生年月职业为强制录入
            </div>
          </div>
        </div>
        <el-dialog
          title="提示"
          :visible.sync="isDialog"
          width="20%"
          :before-close="handleClose"
          center
        >
          <div style="text-align: center;">{{ dialogContent }}</div>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="handleCloses">取消</el-button>
            <el-button
              v-if="isDialogPprn == 0"
              size="mini"
              type="primary"
              @click="handleRehospitalization"
              >再次重新住院</el-button
            >
            <el-button size="mini" type="primary" @click="handleAddPprn"
              >新增病案号</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import {
  getVerifyKeyValue,
  postAddBasicInformation,
  postBasicInformationVerify,
  getCheckFprn,
  getFindFTimes,
  getNewFprn,
  getPeopleYearByBirthDay,
  getPaymentList,
  getNationalityList,
  getNationList,
  getJobList,
  getMarriageList,
  getRelationList,
  getSourceList
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
          key: rule.field,
          value: value
        };
        // data[rule.field] = value;
        getVerifyKeyValue(data).then(res => {
          if (res.state === "10000") {
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
    };
    var validateApi1 = value => {
      return new Promise((resolve, reject) => {
        let data = {
          fprn: value
        };
        getCheckFprn(data).then(res => {
          if (res.state === "10007") {
            resolve(res);
            this.isDialogPprn = 0;
          } else if (res.state === "10008") {
            resolve(res);
            this.isDialogPprn = 1;
          } else {
            reject(res);
          }
        });
      });
    };
    //接口校验规则
    var validatePass = async (rule, value, callback, id, ref) => {
      try {
        const res = await validateApi(rule, value);
        console.log(res, "res", rule);
        if (res.result.code == 30004) {
          if (res.result.rulePopupError == 1) {
            callback(new Error(res.result.message));
            // this.$refs[rule.field].focus();
          } else {
            if (rule.field == "fprn" && this.isPprnTwo) {
              const resPprn = validateApi1(value);
              console.log(resPprn, 1);
              this.dialogContent = resPprn.message;
              this.isDialog = true;
            } else {
              callback();
            }
          }
        } else if (res.result.code == 10000) {
          if (rule.field == "fprn" && this.isPprnTwo) {
            validateApi1(value).then(resPprn => {
              console.log(resPprn, resPprn.message, 2);
              this.dialogContent = resPprn.message;
              this.isDialog = true;
            });
          } else {
            callback();
          }
        } else if (res.result.code == 70000) {
          if (rule.field == "fprn" && this.isPprnTwo) {
            const resPprn = validateApi1(value);
            console.log(resPprn, 3);
            this.dialogContent = resPprn.message;
            this.isDialog = true;
          } else {
            callback();
          }
        }
      } catch (error) {
        callback(new Error(error.message));
      }
    };
    //身份证
    const idCardValidity = (rule, code, callback) => {
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
      };
      var tip = "";
      var pass = true;
      if (
        !code ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
          code
        )
      ) {
        tip = "身份证号格式错误";
        pass = false;
      } else if (!city[code.substr(0, 2)]) {
        // tip = "地址编码错误"
        tip = "身份证输入错误";
        pass = false;
      } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length === 18) {
          code = code.split("");
          // ∑(ai×Wi)(mod 11)
          // 加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          // 校验位
          var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            // tip = "校验位错误"
            tip = "身份证输入错误";
            pass = false;
          }
        }
      }
      if (!pass) {
        callback(new Error(tip));
      } else {
        callback();
      }
    };
    //是否手机号码或者固话.
    const phoneRules = (rule, value, callback) => {
      const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
      if (value == "" || value == undefined || value == null) {
        callback();
      } else {
        if (!reg.test(value) && value != "") {
          callback(new Error("请输入正确的电话号码或者固话号码"));
        } else {
          callback();
        }
      }
    };
    // 设置手机号的验证规则
    const phoneTwoRules = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入联系方式"));
      } else {
        const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的电话"));
        }
      }
    };
    return {
      //日期输入格式
      formatDate: "",
      //校验之后才能保存!
      isSaves: true,
      //选择再次住院 病案号输入框禁用
      isPprn: false,
      //当前是单条校验病案号还是保存时全部校验
      isPprnTwo: true,
      //病案号不存在时为1 隐藏选择再次住院按钮
      isDialogPprn: 0,
      //提示dialog框
      isDialog: false,
      //提示dialog显示文字
      dialogContent: "",
      //医疗付费方式
      ffbbhList: [],
      //国籍
      nationalityList: [],
      //民族
      fnationalitybhList: [],
      //职业
      fjobList: [],
      //婚姻
      fstatusList: [],
      //病人来源
      FsourcebhList: [],
      //关系
      frelateList: [],
      //二级地址
      option: provinceAndCityData,
      fnativeAddress: [],
      //三级地址
      options: regionData,
      //出生地
      fbirthplaceAddress: [],
      //现住址
      fcurraddrAddress: [],
      //户口住址
      fhkaddrAddress: [],
      //工作单位及住址
      fdwaddrAddress: [],
      //联系人住址
      flxaddrAddress: [],
      formList: {
        //病案号
        fprn: "",
        //住院次数
        ftimes: "",
        //医疗付费方式名称
        ffb: "",
        //医疗付费方式
        ffbbh: "",
        //健康卡号
        zyid: "",
        //姓名
        name: "",
        //性别名称
        sex: "男",
        //性别
        sexBh: "1",
        //出生日期
        fbirthday: "",
        //年龄
        fage: "",
        //国籍名称
        fcountry: "",
        //国籍
        fcountrybh: "",
        //民族名称
        fnationality: "",
        //民族
        fnationalitybh: "",
        //新生儿出生体重
        fcstz: "",
        //新生儿入院体重
        frytz: "",
        //出生地
        fbirthplace: "",
        //籍贯
        fnative: "",
        //身份证号
        fidcard: "",
        //职业
        fjob: "",
        //婚姻
        fstatus: "",
        //现住址
        fcurraddr: "",
        //电话
        fcurrtele: "",
        //现住址邮政编码
        fcurrpost: "",
        //户口住址
        fhkaddr: "",
        //病人来源名称
        fsource: "",
        //病人来源
        fsourcebh: "",
        //户口邮政编码
        fhlpost: "",
        //工作单位及住址
        fdwaddr: "",
        //单位电话
        fdwtele: "",
        //工作单位邮政编码
        fdwpost: "",
        //住院流水号
        flsid: "",
        //联系人姓名
        flxname: "",
        //关系
        frelate: "",
        //联系人地址
        flxaddr: "",
        //联系人电话
        flxphone: ""
      },
      rules: {
        //病案号
        fprn: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //住院次数
        ftimes: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //医疗付费方式
        ffbbh: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //健康卡号
        zyid: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //姓名
        name: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //性别
        sexBh: [
          {
            validator: validatePass,
            trigger: "change"
          }
        ],
        //出生日期
        fbirthday: [
          {
            validator: validatePass,
            trigger: "change"
          }
        ],
        //年龄
        fage: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //国籍
        fcountrybh: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //民族
        fnationalitybh: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //新生儿出生体重
        fcstz: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //新生儿入院体重
        frytz: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //出生地
        fbirthplace: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //籍贯
        fnative: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //身份证号
        fidcard: [
          {
            pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: "请输入正确的证件号"
          },
          { validator: idCardValidity, trigger: "blur" }
        ],
        //职业
        fjob: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //婚姻
        fstatus: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //现住址
        fcurraddr: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //电话
        fcurrtele: [{ validator: validatePass, trigger: "blur" }],
        //现住址邮政编码
        fcurrpost: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //户口住址
        fhkaddr: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //病人来源
        fsourcebh: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //户口邮政编码
        fhlpost: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //工作单位及住址
        fdwaddr: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //单位电话
        fdwtele: [{ validator: validatePass, trigger: "blur" }],
        //工作单位邮政编码
        fdwpost: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //联系人姓名
        flxname: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //关系
        frelate: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //联系人地址
        flxaddr: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        //联系人电话
        flxphone: [{ validator: validatePass, trigger: "blur" }]
      },
      saveData: {},
      formId: ""
    };
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  created() {
    this.getFfbbhList();
    this.getnationalityList();
    this.getFjobList();
    this.getFstatusList();
    this.getFsourcebhList();
    this.getFrelateList();
  },
  methods: {
    //病案号校验-取消定位病案号输入框
    handleClose(done) {
      this.$refs["fprn"].focus();
      done();
    },
    //病案号校验-取消定位病案号输入框
    handleCloses() {
      this.$refs["fprn"].focus();
      this.isDialog = false;
    },
    //病案号校验-再次重新住院
    handleRehospitalization() {
      let data = {
        fprn: this.formList.fprn
      };
      getFindFTimes(data).then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.formList = {
            //病案号
            fprn: res.result.fprn,
            //住院次数
            ftimes: res.result.ftimes,
            //医疗付费方式名称
            ffb: res.result.ffb,
            //医疗付费方式
            ffbbh: String(res.result.ffbbh),
            //健康卡号
            zyid: res.result.zyid,
            //姓名
            name: res.result.name,
            //性别
            sexBh: String(res.result.sexBh),
            //出生日期
            fbirthday: res.result.fbirthday,
            //年龄
            fage: res.result.fage,
            //国籍名称
            fcountry: res.result.fcountry,
            //国籍
            fcountrybh: res.result.fcountrybh,
            //民族名称
            fnationality: res.result.fnationality,
            //民族
            fnationalitybh: res.result.fnationalitybh,
            //新生儿出生体重
            fcstz: res.result.fcstz,
            //新生儿入院体重
            frytz: res.result.frytz,
            //出生地
            fbirthplace: res.result.fbirthplace,
            //籍贯
            fnative: res.result.fnative,
            //身份证号
            fidcard: res.result.fidcard,
            //职业
            fjob: res.result.fjob,
            //婚姻
            fstatus: res.result.fstatus,
            //现住址
            fcurraddr: res.result.fcurraddr,
            //电话
            fcurrtele: res.result.fcurrtele,
            //现住址邮政编码
            fcurrpost: res.result.fcurrpost,
            //户口住址
            fhkaddr: res.result.fhkaddr,
            //病人来源名称
            fsource: res.result.fsource,
            //病人来源
            fsourcebh: res.result.fsourcebh,
            //户口邮政编码
            fhlpost: res.result.fhlpost,
            //工作单位及住址
            fdwaddr: res.result.fdwaddr,
            //单位电话
            fdwtele: res.result.fdwtele,
            //工作单位邮政编码
            fdwpost: res.result.fdwpost,
            //联系人姓名
            flxname: res.result.flxname,
            //关系
            frelate: res.result.frelate,
            //联系人地址
            flxaddr: res.result.flxaddr,
            //联系人电话
            flxphone: res.result.flxphone
          };
          let reg = /.+?(省|市|自治区|自治州|县|区|區)/g;
          this.fbirthplaceAddress = this.formList.fbirthplace.match(reg);
          console.log(this.fbirthplaceAddress, "dizhi");
          //选择出生日期时获取真实年龄
          this.getpeopleYearByBirthDay();
          this.isDialog = false;
          this.$message.success("再次重新住院成功!");
          this.isPprn = true;
          sessionStorage.setItem("fprn", this.formList.fprn);
          sessionStorage.setItem("name", this.formList.name);
          sessionStorage.setItem("ftimes", this.formList.ftimes);
          sessionStorage.setItem("fage", this.formList.fage);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //病案号校验-新增病案号
    handleAddPprn() {
      getNewFprn().then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.formList.fprn = res.result;
          this.formList.ftimes = 1;
          this.isPprn = true;
          this.isDialog = false;
          this.$message.success("新增病案号成功!");
          sessionStorage.setItem("fprn", this.formList.fprn);
          sessionStorage.setItem("name", this.formList.name);
          sessionStorage.setItem("ftimes", this.formList.ftimes);
          sessionStorage.setItem("fage", this.formList.fage);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //医疗付费方式
    getFfbbhList(val) {
      let data = {
        fzjc: val
      };
      getPaymentList(data).then(res => {
        console.log(res, "医疗付费方式");
        this.ffbbhList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.ffbbhList.push({
              label: item.fkfs,
              value: item.fkfsbh
            });
          });
          this.formList.ffbbh = this.ffbbhList[0].value;
        } else {
          this.ffbbhList = [];
          this.formList.ffbbh = "";
        }
      });
    },
    //获取国籍 默认中国
    getnationalityList() {
      getNationalityList().then(res => {
        console.log(res, "获取国籍");
        this.nationalityList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.nationalityList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
          this.formList.fcountrybh = "CHN";
          this.getfnationalitybhList();
        } else {
          this.nationalityList = [];
          this.formList.fcountrybh = "";
        }
      });
    },
    //修改国籍/模糊查询国籍
    handlenationalityList(val) {
      let data = {
        dictCode: val
      };
      getNationalityList(data).then(res => {
        console.log(res, "修改国籍");
        this.nationalityList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.nationalityList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
          this.formList.fcountrybh = this.nationalityList[0].value;
          if (this.formList.fcountrybh == "CHN") {
            this.formList.fnationalitybh = this.fnationalitybhList[0].value;
          } else {
            this.formList.fnationalitybh = "99";
          }
        } else {
          this.nationalityList = [];
          this.formList.fcountrybh = "";
        }
      });
    },
    //获取民族 当国籍为中国时,默认汉族 国籍非中国时,默认其他
    getfnationalitybhList() {
      getNationList().then(res => {
        console.log(res, "获取民族");
        this.fnationalitybhList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fnationalitybhList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
          if (this.formList.fcountrybh == "CHN") {
            this.formList.fnationalitybh = this.fnationalitybhList[0].value;
          } else {
            this.formList.fnationalitybh = "99";
          }
        } else {
          this.fnationalitybhList = [];
          this.formList.fnationalitybh = "";
        }
      });
    },
    //选择出生日期时获取真实年龄
    getpeopleYearByBirthDay() {
      let data = {
        birthDay: this.formList.fbirthday
      };
      getPeopleYearByBirthDay(data).then(res => {
        console.log(res, "获取真实年龄");
        if (res.state === "10000") {
          this.formList.fage = res.result;
        } else {
          this.formList.fage = "";
        }
      });
    },
    //选择日期选中输入框改变格式
    dateFocus(vm) {
      console.log(vm);
      this.formatDate = "yyyyMMdd";
    },
    //选择日期选离开输入框改变格式
    dateBlur(vm) {
      console.log(vm);
      this.formatDate = "yyyy-MM-dd";
    },
    //职业
    getFjobList(val) {
      let data = {
        dictCode: val
      };
      getJobList(data).then(res => {
        console.log(res, "职业");
        this.fjobList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fjobList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
          this.formList.fjob = this.fjobList[0].value;
        } else {
          this.fjobList = [];
          this.formList.fjob = "";
        }
      });
    },
    //婚姻
    getFstatusList(val) {
      let data = {
        dictCode: val
      };
      getMarriageList(data).then(res => {
        console.log(res, "婚姻");
        this.fstatusList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fstatusList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
          this.formList.fstatus = this.fstatusList[0].value;
        } else {
          this.fstatusList = [];
          this.formList.fstatus = "";
        }
      });
    },
    //病人来源
    getFsourcebhList(val) {
      let data = {
        dictCode: val
      };
      getSourceList(data).then(res => {
        console.log(res, "病人来源");
        this.FsourcebhList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.FsourcebhList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
          this.formList.fsourcebh = this.FsourcebhList[0].value;
        } else {
          this.FsourcebhList = [];
          this.formList.fsourcebh = "";
        }
      });
    },
    //关系
    getFrelateList(val) {
      let data = {
        dictCode: val
      };
      getRelationList(data).then(res => {
        console.log(res, "关系");
        this.frelateList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.frelateList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
          this.formList.frelate = this.frelateList[0].value;
        } else {
          this.frelateList = [];
          this.formList.frelate = "";
        }
      });
    },
    //出生地
    handleFbirthplace(val) {
      // 将区域码转换成汉字
      console.log(CodeToText[val[0]]);
      console.log(CodeToText[val[1]]);
      console.log(CodeToText[val[2]]);
      if (
        CodeToText[val[0]] == "香港特别行政区" ||
        CodeToText[val[0]] == "澳门特别行政区"
      ) {
        this.formList.fbirthplace = CodeToText[val[0]] + CodeToText[val[1]];
      } else {
        this.formList.fbirthplace =
          CodeToText[val[1]] == "市辖区" ||
          CodeToText[val[1]] == "县" ||
          CodeToText[val[1]] == "自治区直辖县级行政区划"
            ? CodeToText[val[0]] + CodeToText[val[2]]
            : CodeToText[val[0]] + CodeToText[val[1]] + CodeToText[val[2]];
      }
    },
    //籍贯
    handleFnative(val) {
      // 将区域码转换成汉字
      console.log(CodeToText[val[0]]);
      console.log(CodeToText[val[1]]);
      this.formList.fnative =
        CodeToText[val[1]] == "市辖区" ||
        CodeToText[val[1]] == "县" ||
        CodeToText[val[1]] == "自治区直辖县级行政区划"
          ? CodeToText[val[0]]
          : CodeToText[val[0]] + CodeToText[val[1]];
    },
    //现住址
    handleFcurraddr(val) {
      // 将区域码转换成汉字
      console.log(CodeToText[val[0]]);
      console.log(CodeToText[val[1]]);
      console.log(CodeToText[val[2]]);
      if (
        CodeToText[val[0]] == "香港特别行政区" ||
        CodeToText[val[0]] == "澳门特别行政区"
      ) {
        this.formList.fcurraddr = CodeToText[val[0]] + CodeToText[val[1]];
      } else {
        this.formList.fcurraddr =
          CodeToText[val[1]] == "市辖区" ||
          CodeToText[val[1]] == "县" ||
          CodeToText[val[1]] == "自治区直辖县级行政区划"
            ? CodeToText[val[0]] + CodeToText[val[2]]
            : CodeToText[val[0]] + CodeToText[val[1]] + CodeToText[val[2]];
      }
    },
    //户口住址
    handleFhkaddr(val) {
      // 将区域码转换成汉字
      console.log(CodeToText[val[0]]);
      console.log(CodeToText[val[1]]);
      console.log(CodeToText[val[2]]);
      if (
        CodeToText[val[0]] == "香港特别行政区" ||
        CodeToText[val[0]] == "澳门特别行政区"
      ) {
        this.formList.fhkaddr = CodeToText[val[0]] + CodeToText[val[1]];
      } else {
        this.formList.fhkaddr =
          CodeToText[val[1]] == "市辖区" ||
          CodeToText[val[1]] == "县" ||
          CodeToText[val[1]] == "自治区直辖县级行政区划"
            ? CodeToText[val[0]] + CodeToText[val[2]]
            : CodeToText[val[0]] + CodeToText[val[1]] + CodeToText[val[2]];
      }
    },
    //工作单位及住址
    handleFdwaddr(val) {
      // 将区域码转换成汉字
      console.log(CodeToText[val[0]]);
      console.log(CodeToText[val[1]]);
      console.log(CodeToText[val[2]]);
      if (
        CodeToText[val[0]] == "香港特别行政区" ||
        CodeToText[val[0]] == "澳门特别行政区"
      ) {
        this.formList.fdwaddr = CodeToText[val[0]] + CodeToText[val[1]];
      } else {
        this.formList.fdwaddr =
          CodeToText[val[1]] == "市辖区" ||
          CodeToText[val[1]] == "县" ||
          CodeToText[val[1]] == "自治区直辖县级行政区划"
            ? CodeToText[val[0]] + CodeToText[val[2]]
            : CodeToText[val[0]] + CodeToText[val[1]] + CodeToText[val[2]];
      }
    },
    //联系人住址
    handleFlxaddr(val) {
      // 将区域码转换成汉字
      console.log(CodeToText[val[0]]);
      console.log(CodeToText[val[1]]);
      console.log(CodeToText[val[2]]);
      if (
        CodeToText[val[0]] == "香港特别行政区" ||
        CodeToText[val[0]] == "澳门特别行政区"
      ) {
        this.formList.flxaddr = CodeToText[val[0]] + CodeToText[val[1]];
      } else {
        this.formList.flxaddr =
          CodeToText[val[1]] == "市辖区" ||
          CodeToText[val[1]] == "县" ||
          CodeToText[val[1]] == "自治区直辖县级行政区划"
            ? CodeToText[val[0]] + CodeToText[val[2]]
            : CodeToText[val[0]] + CodeToText[val[1]] + CodeToText[val[2]];
      }
    },
    preventBlur(event) {
      event.preventDefault();
    },
    // 校验
    handleCheck(data) {
      console.log(data);
      this.isPprnTwo = false;
      this.$refs["formList"].validate(valid => {
        if (valid) {
          this.isSaves = false;
          this.isPprnTwo = true;
          console.log("submit!!", this.isSaves);
        } else {
          this.isSaves = true;
          this.isPprnTwo = true;
          console.log("error submit!!", this.isSaves);
          return false;
        }
      });
    },
    handleSave(data) {
      console.log(data);
      this.saveData = {
        //病案号
        fprn: this.formList.fprn,
        //住院次数
        ftimes: this.formList.ftimes,
        //医疗付费方式名称
        ffb: this.formList.ffb,
        //医疗付费方式
        ffbbh: this.formList.ffbbh,
        //健康卡号
        zyid: this.formList.zyid,
        //姓名
        name: this.formList.name,
        //性别名称
        sex: this.formList.sex,
        //性别
        sexBh: this.formList.sexBh,
        //出生日期
        fbirthday: this.formList.fbirthday,
        //年龄
        fage: this.formList.fage,
        //国籍名称
        fcountry: this.formList.fcountry,
        //国籍
        fcountrybh: this.formList.fcountrybh,
        //民族名称
        fnationality: this.formList.fnationality,
        //民族
        fnationalitybh: this.formList.fnationalitybh,
        //新生儿出生体重
        fcstz: this.formList.fcstz,
        //新生儿入院体重
        frytz: this.formList.frytz,
        //出生地
        fbirthplace: this.formList.fbirthplace,
        //籍贯
        fnative: this.formList.fnative,
        //身份证号
        fidcard: this.formList.fidcard,
        //职业
        fjob: this.formList.fjob,
        //婚姻
        fstatus: this.formList.fstatus,
        //现住址
        fcurraddr: this.formList.fcurraddr,
        //电话
        fcurrtele: this.formList.fcurrtele,
        //现住址邮政编码
        fcurrpost: this.formList.fcurrpost,
        //户口住址
        fhkaddr: this.formList.fhkaddr,
        //病人来源名称
        fsource: this.formList.fsource,
        //病人来源
        fsourcebh: this.formList.fsourcebh,
        //户口邮政编码
        fhlpost: this.formList.fhlpost,
        //工作单位及住址
        fdwaddr: this.formList.fdwaddr,
        //单位电话
        fdwtele: this.formList.fdwtele,
        //工作单位邮政编码
        fdwpost: this.formList.fdwpost,
        //联系人姓名
        flxname: this.formList.flxname,
        //关系
        frelate: this.formList.frelate,
        //联系人地址
        flxaddr: this.formList.flxaddr,
        //联系人电话
        flxphone: this.formList.flxphone
      };
      postAddBasicInformation(this.$qs.stringify(this.saveData)).then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.isPprnTwo = true;
          this.$message.success("保存成功!");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    resetForm() {
      this.$refs["formList"].resetFields();
      this.isPprn = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.basicMess {
  height: 100%;
  font-size: 14px;
  color: #515355;
}
.hearder_items {
  // height: 40px;
  // line-height: 40px;
  background-color: #f3f3f3;
  border-radius: 4px;
  margin: 0px 2px 10px 2px;
  // padding: 10px 10px 10px 26px;
  display: flex;
  flex-direction: row;
  border-bottom: solid 1px #797979;
}
.demo-ruleForm {
  width: 100%;
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
  background-color: #f3f3f3;
  border-radius: 4px;
  margin: 15px 0px 15px 0px;
  // padding: 0px 10px 0px 26px;
  display: flex;
  flex-direction: row;
}
.hearder_content {
  text-align: center;
  width: 30%;
}
.main_hearder_content {
  text-align: center;
  width: 30%;
}
/* 输入框 */
.paperview-input-text-f >>> .el-input__inner {
  width: 60%;
  height: 18px;
  line-height: 18px;
  -webkit-appearance: none;
  background-image: none;
  border: 0px;
  border-bottom: solid 1px red;
  border-radius: 0px;
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
/deep/ .el-input__inner {
  text-align: center;
}
</style>
