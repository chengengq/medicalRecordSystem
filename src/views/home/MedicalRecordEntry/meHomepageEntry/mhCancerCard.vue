<template>
  <!-- 肿瘤卡 -->
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
            class="demo-ruleForm"
          >
            <div class="main_hearder_items">
              <div class="hearder_item">
                <el-form-item label="肿瘤分期类型" prop="fzltypebh">
                  <el-select
                    ref="fzltypebh"
                    v-model="formList.fzltypebh"
                    filterable
                    clearable
                    size="mini"
                    placeholder="肿瘤分期类型"
                  >
                    <el-option
                      v-for="(item, index) in formList.fzltypeList"
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
                <el-form-item label="T" prop="ft">
                  <el-select
                    ref="ft"
                    v-model="formList.ft"
                    filterable
                    clearable
                    size="mini"
                    placeholder="T"
                  >
                    <el-option label="0" value="1" style="text-align: center">
                    </el-option>
                    <el-option label="1" value="2" style="text-align: center">
                    </el-option>
                    <el-option label="2" value="3" style="text-align: center">
                    </el-option>
                    <el-option label="3" value="4" style="text-align: center">
                    </el-option>
                    <el-option label="4" value="5" style="text-align: center">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="N" prop="fn">
                  <el-select
                    ref="fn"
                    v-model="formList.fn"
                    filterable
                    clearable
                    size="mini"
                    placeholder="N"
                  >
                    <el-option label="0" value="1" style="text-align: center">
                    </el-option>
                    <el-option label="1" value="2" style="text-align: center">
                    </el-option>
                    <el-option label="2" value="3" style="text-align: center">
                    </el-option>
                    <el-option label="3" value="4" style="text-align: center">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="M" prop="fm">
                  <el-select
                    ref="fm"
                    v-model="formList.fm"
                    filterable
                    clearable
                    size="mini"
                    placeholder="M"
                  >
                    <el-option label="0" value="1" style="text-align: center">
                    </el-option>
                    <el-option label="1" value="2" style="text-align: center">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="总分期" prop="fzfq">
                  <el-input
                    ref="fzfq"
                    v-model="formList.fzfq"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="main_hearder_items">
              <div class="hearder_item">
                <el-form-item label="I放疗方式" prop="fflyypebh">
                  <el-select
                    ref="fflyypebh"
                    v-model="formList.fflyypebh"
                    filterable
                    clearable
                    size="mini"
                    placeholder="I放疗方式"
                  >
                    <el-option
                      v-for="(item, index) in formList.fflyypeList"
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
                <el-form-item label="I放疗程式" prop="fflcxbh">
                  <el-select
                    ref="fflcxbh"
                    v-model="formList.fflcxbh"
                    filterable
                    clearable
                    size="mini"
                    placeholder="I放疗程式"
                  >
                    <el-option
                      v-for="(item, index) in formList.fflcxList"
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
                <el-form-item label="I放疗装置" prop="fflzzbh">
                  <el-select
                    ref="fflzzbh"
                    v-model="formList.fflzzbh"
                    filterable
                    clearable
                    size="mini"
                    placeholder="I放疗装置"
                  >
                    <el-option
                      v-for="(item, index) in formList.fflzzList"
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
              <div class="hearder_item" style="width: 28%;">
                <el-form-item label="1.原发灶(首次，复次)剂量" prop="fyjy">
                  <el-input
                    ref="fyjy"
                    v-model="formList.fyjy"
                    size="mini"
                    style="width: 24%;"
                  ></el-input>
                  GY/
                  <el-input
                    ref="fycs"
                    v-model="formList.fycs"
                    size="mini"
                    style="width: 24%;"
                  ></el-input
                  >次/
                  <el-input
                    ref="fyts"
                    v-model="formList.fyts"
                    size="mini"
                    style="width: 24%;"
                  ></el-input
                  >天
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="起止日期" prop="yfzDate">
                  <el-date-picker
                    v-model="formList.yfzDate"
                    type="daterange"
                    size="mini"
                    :unlink-panels="true"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    placeholder="yyyy-MM-dd"
                    title="选择日期yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="main_hearder_items">
              <div class="hearder_item" style="width: 28%;">
                <el-form-item label="2.区域淋巴结(首次，复次)" prop="fqjy">
                  <el-input
                    ref="fqjy"
                    v-model="formList.fqjy"
                    size="mini"
                    style="width: 24%;"
                  ></el-input>
                  GY/
                  <el-input
                    ref="fqcs"
                    v-model="formList.fqcs"
                    size="mini"
                    style="width: 24%;"
                  ></el-input
                  >次/
                  <el-input
                    ref="fqts"
                    v-model="formList.fqts"
                    size="mini"
                    style="width: 24%;"
                  ></el-input
                  >天
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="起止日期" prop="lbjDate">
                  <el-date-picker
                    v-model="formList.lbjDate"
                    type="daterange"
                    size="mini"
                    :unlink-panels="true"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    placeholder="yyyy-MM-dd"
                    title="选择日期yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="main_hearder_items">
              <div class="hearder_item" style="width: 28%;">
                <el-form-item label="3.转移灶剂量" prop="fzjy">
                  <el-input
                    ref="fzjy"
                    v-model="formList.fzjy"
                    size="mini"
                    style="width: 24%;"
                  ></el-input>
                  GY/
                  <el-input
                    ref="fzcs"
                    v-model="formList.fzcs"
                    size="mini"
                    style="width: 24%;"
                  ></el-input
                  >次/
                  <el-input
                    ref="fzts"
                    v-model="formList.fzts"
                    size="mini"
                    style="width: 24%;"
                  ></el-input
                  >天
                </el-form-item>
              </div>
              <div class="hearder_item">
                <el-form-item label="起止日期" prop="zyzDate">
                  <el-date-picker
                    v-model="formList.zyzDate"
                    type="daterange"
                    size="mini"
                    :unlink-panels="true"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    placeholder="yyyy-MM-dd"
                    title="选择日期yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="main_hearder_items">
              <div class="hearder_item">
                <el-form-item label="II化疗方式" prop="fiifl">
                  <el-select
                    ref="fiifl"
                    v-model="formList.fiifl"
                    filterable
                    clearable
                    size="mini"
                    placeholder="II化疗方式"
                  >
                    <el-option
                      v-for="(item, index) in formList.fiiflList"
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
                <el-form-item label="方法" prop="fiiff">
                  <el-select
                    ref="fiiff"
                    v-model="formList.fiiff"
                    filterable
                    clearable
                    size="mini"
                    placeholder="II化疗方法"
                  >
                    <el-option
                      v-for="(item, index) in formList.fiiffList"
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
            <el-row :gutter="5">
              <el-col :span="4"
                ><div class="grid-content bg-purple">起始日期</div></el-col
              >
              <el-col :span="4"
                ><div class="grid-content bg-purple">结束日期</div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple">
                  药物名称(剂量)
                </div></el-col
              >
              <el-col :span="4"
                ><div class="grid-content bg-purple">疗程</div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple">疗效</div></el-col
              >
            </el-row>
            <el-row
              :gutter="5"
              v-for="(item, index) in formList.list"
              :key="index"
            >
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fhlrq' + index" id="form_item">
                    <el-date-picker
                      v-model="formList.list[index].fhlrq"
                      :id="'fhlrq' + index"
                      :ref="'fhlrq' + index"
                      type="date"
                      size="mini"
                      style="width:95%"
                      :editable="true"
                      format="yyyy-MM-dd"
                      placeholder="选择日期yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item></div
              ></el-col>
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fhlrq1' + index" id="form_item">
                    <el-date-picker
                      v-model="formList.list[index].fhlrq1"
                      :id="'fhlrq1' + index"
                      :ref="'fhlrq1' + index"
                      type="date"
                      size="mini"
                      style="width:95%"
                      :editable="true"
                      format="yyyy-MM-dd"
                      placeholder="选择日期yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item></div
              ></el-col>
              <el-col :span="5"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fhldrug' + index" id="form_item">
                    <el-input
                      :id="'fhldrug' + index"
                      :ref="'fhldrug' + index"
                      v-model="formList.list[index].fhldrug"
                      clearable
                      size="mini"
                      style="width: 90%;"
                    ></el-input>
                  </el-form-item></div
              ></el-col>
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fhlproc' + index" id="form_item">
                    <el-input
                      :id="'fhlproc' + index"
                      :ref="'fhlproc' + index"
                      v-model="formList.list[index].fhlproc"
                      clearable
                      size="mini"
                      style="width: 90%;"
                    ></el-input>
                  </el-form-item></div
              ></el-col>
              <el-col :span="5"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fhllxbh' + index" id="form_item">
                    <el-select
                      v-model="formList.list[index].fhllxbh"
                      :id="'fhllxbh' + index"
                      :ref="'fhllxbh' + index"
                      filterable
                      clearable
                      style="width: 90%;"
                      size="mini"
                      placeholder="I助"
                    >
                      <el-option
                        v-for="(items, indexs) in formList.list[index]
                          .fhllxList"
                        :key="indexs"
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
                  </el-form-item>
                </div>
              </el-col>
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
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  postAddTumour,
  getNeoplasmStagingList,
  getRadiotherapyMethods,
  getPatternList,
  getDeviceList,
  getChemotherapyList,
  getChemotherapyMethodsList,
  getCurativeEffectList
} from "@/api";
import EntryButton from "@/components/EntryButton";
export default {
  components: {
    EntryButton
  },
  data() {
    return {
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
      deptObj: {
        list0: []
      },
      //保存 参数
      postData: {},
      formList: {
        //肿瘤分期类型
        fzltypebh: "",
        fzltypeList: [],
        //T
        ft: "",
        //N
        fn: "",
        //M
        fm: "",
        //总分期
        fzfq: "",
        //I放疗方式
        fflyypebh: "",
        fflyypeList: [],
        //I放疗程式
        fflcxbh: "",
        fflcxList: [],
        //I放疗装置
        fflzzbh: "",
        fflzzList: [],
        //原发灶(首次，复次)剂量
        fyjy: "",
        //原发灶 次
        fycs: "",
        //原发灶 天
        fyts: "",
        //原发灶 起止日期
        yfzDate: [],
        //区域淋巴结(首次，复次)剂量
        fqjy: "",
        //区域淋巴结 次
        fqcs: "",
        //区域淋巴结 天
        fqts: "",
        //区域淋巴结 起止日期
        lbjDate: [],
        //转移灶(首次，复次)剂量
        fzjy: "",
        //转移灶 次
        fzcs: "",
        //转移灶 天
        fzts: "",
        //转移灶 起止日期
        zyzDate: [],
        //II化疗方式
        fiifl: "",
        fiiflList: [],
        //II化疗方法
        fiiff: "",
        fiiffList: [],
        list: [
          {
            //化疗日期 (开始时间）
            fhlrq: "",
            //化疗日期 (结束时间）
            fhlrq1: "",
            //药物名称(剂量)
            fhldrug: "",
            //化疗疗程
            fhlproc: "",
            //疗效编号
            fhllxbh: "",
            fhllxList: []
          }
        ]
      },
      rules: {}
    };
  },
  created() {
    this.getFzltypeList();
    this.getFflyypeList();
    this.getFflcxList();
    this.getFflzzList();
    this.getFiiflList();
    this.getFiiffList();
    this.getFhllxList();
  },
  methods: {
    //获取肿瘤分期类型
    getFzltypeList(val) {
      let data = {
        dictCode: val
      };
      getNeoplasmStagingList(data).then(res => {
        console.log(res, "获取肿瘤分期类型");
        this.formList.fzltypeList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.fzltypeList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.fzltypeList = [];
        }
      });
    },
    //I放疗方式
    getFflyypeList(val) {
      let data = {
        dictCode: val
      };
      getRadiotherapyMethods(data).then(res => {
        console.log(res, "I放疗方式");
        this.formList.fflyypeList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.fflyypeList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.fflyypeList = [];
        }
      });
    },
    //获取程式
    getFflcxList(val) {
      let data = {
        dictCode: val
      };
      getPatternList(data).then(res => {
        console.log(res, "获取程式");
        this.formList.fflcxList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.fflcxList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.fflcxList = [];
        }
      });
    },
    //获取装置
    getFflzzList(val) {
      let data = {
        dictCode: val
      };
      getDeviceList(data).then(res => {
        console.log(res, "获取装置");
        this.formList.fflzzList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.fflzzList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.fflzzList = [];
        }
      });
    },
    //获取化疗方式
    getFiiflList(val) {
      let data = {
        dictCode: val
      };
      getChemotherapyList(data).then(res => {
        console.log(res, "获取化疗方式");
        this.formList.fiiflList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.fiiflList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.fiiflList = [];
        }
      });
    },
    //获取化疗方法
    getFiiffList(val) {
      let data = {
        dictCode: val
      };
      getChemotherapyMethodsList(data).then(res => {
        console.log(res, "获取化疗方法");
        this.formList.fiiffList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.fiiffList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.fiiffList = [];
        }
      });
    },
    //获取疗效
    getFhllxList(val) {
      let data = {
        dictCode: val
      };
      getCurativeEffectList(data).then(res => {
        console.log(res, "获取疗效");
        this.formList.list[0].fhllxList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.list[0].fhllxList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.list[0].fhllxList = [];
        }
      });
    },
    //添加多个
    addDomain() {
      this.formList.list.push({
        //化疗日期 (开始时间）
        fhlrq: "",
        //化疗日期 (结束时间）
        fhlrq1: "",
        //药物名称(剂量)
        fhldrug: "",
        //化疗疗程
        fhlproc: "",
        //疗效编号
        fhllxbh: "",
        fhllxList: this.formList.list[0].fhllxList
      });
      console.log(this.formList.list, this.formList.list.length, this.rules);
    },
    //删除数据
    removeDomain(item) {
      let index = this.formList.list.indexOf(item);
      if (index !== -1) {
        this.formList.list.splice(index, 1);
      }
      console.log(this.formList.list, this.formList);
    },
    // 校验按钮
    handleCheck(data) {
      console.log(data);
      let arr = JSON.parse(JSON.stringify(this.formList.list));
      let tumourChemotherapy = [];
      tumourChemotherapy = arr.filter(item => delete item.fhllxList);

      let arrZl = [];
      tumourChemotherapy.forEach(item => {
        if (
          item.fhlrq == "" &&
          item.fhlrq1 == "" &&
          item.fhldrug == "" &&
          item.fhlproc == "" &&
          item.fhllxbh == ""
        ) {
        } else {
          arrZl.push(item);
        }
      });
      this.postData = {
        //肿瘤分期类型
        fzltypebh: this.formList.fzltypebh,
        //T
        ft: this.formList.ft,
        //N
        fn: this.formList.fn,
        //M
        fm: this.formList.fm,
        //总分期
        fzfq: this.formList.fzfq,
        //I放疗方式
        fflyypebh: this.formList.fflyypebh,
        //I放疗程式
        fflcxbh: this.formList.fflcxbh,
        //I放疗装置
        fflzzbh: this.formList.fflzzbh,
        //原发灶(首次，复次)剂量
        fyjy: this.formList.fyjy,
        //原发灶 次
        fycs: this.formList.fycs,
        //原发灶 天
        fyts: this.formList.fyts,
        //原发灶 起止日期
        fstartdate:
          this.formList.yfzDate.length == 2 ? this.formList.yfzDate[0] : "",
        fenddate:
          this.formList.yfzDate.length == 2 ? this.formList.yfzDate[1] : "",
        //区域淋巴结(首次，复次)剂量
        fqjy: this.formList.fqjy,
        //区域淋巴结 次
        fqcs: this.formList.fqcs,
        //区域淋巴结 天
        fqts: this.formList.fqts,
        //区域淋巴结 起止日期
        fqrq1:
          this.formList.lbjDate.length == 2 ? this.formList.lbjDate[0] : "",
        fqrq2:
          this.formList.lbjDate.length == 2 ? this.formList.lbjDate[1] : "",
        //转移灶(首次，复次)剂量
        fzjy: this.formList.fzjy,
        //转移灶 次
        fzcs: this.formList.fzcs,
        //转移灶 天
        fzts: this.formList.fzts,
        //转移灶 起止日期
        fzrq1:
          this.formList.zyzDate.length == 2 ? this.formList.zyzDate[0] : "",
        fzrq2:
          this.formList.zyzDate.length == 2 ? this.formList.zyzDate[1] : "",
        //II化疗方式
        fiifl: this.formList.fiifl,
        //II化疗方法
        fiiff: this.formList.fiiff,
        //妇婴卡信息
        tumourChemotherapy: arrZl.length == 0 ? "" : JSON.stringify(arrZl)
      };
      var arrs = Object.values(this.postData).filter(function(item) {
        if (item !== "") {
          return true; //过滤掉为空的项
        }
      });
      if (arrs.length === 0) {
        this.isSaves = true;
        this.$message.warning("未输入数据时不需要保存!");
      } else {
        this.$refs["formList"].validate((valid, value) => {
          if (valid) {
            this.isSaves = false;
          } else {
            this.isSaves = true;
            return false;
          }
        });
      }
    },
    // 保存按钮
    handleSave(data) {
      //病案号
      this.postData["fprn"] = sessionStorage.fprn;
      //住院次数
      this.postData["ftimes"] = sessionStorage.ftimes;
      //录入员
      this.postData["userName"] = sessionStorage.userName;
      //录入日期
      this.postData["newDate"] = sessionStorage.entryDate;
      console.log(data);
      postAddTumour(this.$qs.stringify(this.postData)).then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.isSaves = true;
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
.hearder_item {
  width: 25%;
  span {
    display: inline-block;
    width: 41%;
    text-align: right;
  }
}
.demo-ruleForm {
  width: 100%;
}
/deep/ .el-form-item__label {
  width: 200px !important;
}
/deep/ .el-form-item__content {
  margin-left: 200px !important;
}
.el-form-item {
  margin-bottom: 0px !important;
}
.main_hearder_items {
  height: 40px;
  line-height: 40px;
  margin: 6px 0px 6px 0px;
  background-color: #f3f3f3;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
}
.hearder_content {
  text-align: center;
  width: 30%;
}
.main_hearder_content {
  width: 47%;
  text-align: center;
}
.main_header_record_table >>> td {
  border: solid 1px #d6dbe1;
}
.main_header_record_table >>> th {
  background: #e5ebf5 !important;
  border: 0.5px solid #fefefe;
  // padding: 8px 0 8px 0;
  color: #636262 !important;
  font-size: 16px;
}
input:focus {
  outline: none;
}
/deep/ .el-input__inner {
  text-align: center;
}
.el-row {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  // #d3dce6
  background: #f3f3f3;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  line-height: 35px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-form-item {
  margin-bottom: 0px;
}
.el-button--mini.is-circle {
  margin-top: 4px;
  margin-left: 4px;
}
#form_item {
  /deep/ .el-form-item__content {
    margin-left: 0px !important;
  }
}
</style>
