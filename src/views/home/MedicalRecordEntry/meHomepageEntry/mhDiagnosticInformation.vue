<template>
  <!-- 诊断信息 -->
  <div class="main">
    <Entry-Button
      :pprns="fprn"
      :names="names"
      :ftimes="ftimes"
      :ages="fages"
      :IsSwitch="true"
      :isSave="isSaves"
      @handleSwitch="handleSwitch"
      @handleCheck="handleCheck"
      @handleSave="handleSave"
      @resetForm="resetForm"
    ></Entry-Button>
    <div class="main_wrap">
      <div class="main_wraps">
        <!-- 基本信息 -->
        <div class="main_header_record_table">
          <el-row :gutter="5">
            <el-col :span="3"
              ><div class="grid-content bg-purple">类型</div></el-col
            >
            <el-col :span="9"
              ><div class="grid-content bg-purple">出院诊断</div></el-col
            >
            <el-col :span="3"
              ><div class="grid-content bg-purple">疾病编码</div></el-col
            >
            <el-col :span="3"
              ><div class="grid-content bg-purple">入院病情</div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple">附属</div></el-col
            >
          </el-row>
          <el-form
            :model="formList"
            :rules="rules"
            ref="formList"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row :gutter="5">
              <el-col :span="3"
                ><div class="grid-content bg-purple">
                  <span style="color:red;">*</span> 主要诊断
                </div></el-col
              >
              <el-col :span="9"
                ><div class="grid-content bg-purple">
                  <el-form-item prop="zyficdm">
                    <el-select
                      v-model="formList.list[0].ficdm"
                      size="mini"
                      ref="zyficdm"
                      filterable
                      placeholder="主要诊断"
                      :filter-method="getZdList"
                      style="width: 95%;"
                      @change="query => handleZd(query, 0, 'zyList')"
                    >
                      <el-option
                        v-for="(item, index) in deptObj.zyList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: right"
                      >
                        <div style="display: flex;">
                          <span style="flex: 2;text-align: left;">{{
                            item.label
                          }}</span>
                          <span style="flex: 1;">{{ item.value }}</span>
                          <span style="flex: 1;">{{ item.code }}</span>
                        </div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div></el-col
              >
              <el-col :span="3"
                ><div class="grid-content bg-purple">
                  <el-form-item>
                    <el-input
                      v-model="formList.list[0].ficdm"
                      disabled
                      size="mini"
                      style="width: 90%;"
                    ></el-input>
                  </el-form-item></div
              ></el-col>
              <el-col :span="3"
                ><div class="grid-content bg-purple">
                  <el-form-item prop="zyfrybqbh">
                    <el-select
                      v-model="formList.list[0].frybqbh"
                      size="mini"
                      ref="zyfrybqbh"
                      placeholder="入院病情"
                      style="width: 90%;"
                      @change="query => handleBq(query, 0, 'zybqList')"
                    >
                      <el-option
                        v-for="(item, index) in deptObj.zybqList"
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
                </div></el-col
              >
            </el-row>
            <el-row :gutter="5">
              <el-col :span="3"
                ><div class="grid-content bg-purple">附属诊断</div></el-col
              >
              <el-col :span="9"
                ><div class="grid-content bg-purple">
                  <el-form-item prop="fsficdm">
                    <el-select
                      v-model="formList.list[1].ficdm"
                      size="mini"
                      ref="fsficdm"
                      filterable
                      clearable
                      placeholder="附属诊断"
                      :filter-method="getZdList"
                      style="width: 95%;"
                      @change="query => handleZd(query, 0, 'fsList')"
                    >
                      <el-option
                        v-for="(item, index) in deptObj.fsList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: right"
                      >
                        <div style="display: flex;">
                          <span style="flex: 2;text-align: left;">{{
                            item.label
                          }}</span>
                          <span style="flex: 1;">{{ item.value }}</span>
                          <span style="flex: 1;">{{ item.code }}</span>
                        </div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div></el-col
              >
              <el-col :span="3"
                ><div class="grid-content bg-purple">
                  <el-form-item>
                    <el-input
                      v-model="formList.list[1].ficdm"
                      disabled
                      size="mini"
                      style="width: 90%;"
                    ></el-input>
                  </el-form-item></div
              ></el-col>
              <el-col :span="3"
                ><div class="grid-content bg-purple">
                  <el-form-item prop="fsfrybqbh">
                    <el-select
                      v-model="formList.list[1].frybqbh"
                      size="mini"
                      ref="fsfrybqbh"
                      clearable
                      placeholder="入院病情"
                      style="width: 90%;"
                      @change="query => handleBq(query, 1, 'fsbqList')"
                    >
                      <el-option
                        v-for="(item, index) in deptObj.fsbqList"
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
                </div></el-col
              >
            </el-row>
            <el-row
              :gutter="5"
              v-for="(item, index) in formList.qtList"
              :key="index"
            >
              <el-col :span="3"
                ><div class="grid-content bg-purple">其它诊断</div></el-col
              >
              <el-col :span="9"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'qtficdm' + index">
                    <el-select
                      v-model="formList.qtList[index].ficdm"
                      size="mini"
                      :ref="'qtficdm' + index"
                      filterable
                      clearable
                      placeholder="其它诊断"
                      style="width: 95%;"
                      @change="query => handleQtZd(query, index)"
                    >
                      <el-option
                        v-for="(items, indexs) in deptObj['qtList' + index]"
                        :key="'options' + index + 'key' + indexs"
                        :label="items.label"
                        :value="items.value"
                        style="text-align: right"
                      >
                        <div style="display: flex;">
                          <span style="flex: 2;text-align: left;">{{
                            items.label
                          }}</span>
                          <span style="flex: 1;">{{ items.value }}</span>
                          <span style="flex: 1;">{{ items.code }}</span>
                        </div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div></el-col
              >
              <el-col :span="3"
                ><div class="grid-content bg-purple">
                  <el-form-item>
                    <el-input
                      v-model="formList.qtList[index].ficdm"
                      disabled
                      size="mini"
                      style="width: 90%;"
                    ></el-input>
                  </el-form-item></div
              ></el-col>
              <el-col :span="3"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'qtfrybqbh' + index">
                    <el-select
                      v-model="formList.qtList[index].frybqbh"
                      size="mini"
                      :ref="'qtfrybqbh' + index"
                      clearable
                      placeholder="入院病情"
                      style="width: 90%;"
                      @change="query => handleQtBq(query, index)"
                    >
                      <el-option
                        v-for="(items, indexs) in deptObj['qtbqList' + index]"
                        :key="'qtbqList' + index + 'key' + indexs"
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
                </div></el-col
              >
              <el-col :span="2"
                ><div class="el_botton_div">
                  <el-button
                    style="margin-left: 5px"
                    size="small"
                    type="success"
                    icon="el-icon-plus"
                    circle
                    @click="addDomain"
                  ></el-button>
                  <el-button
                    size="small"
                    type="danger"
                    v-if="index != 0"
                    icon="el-icon-delete"
                    circle
                    @click="removeDomain(item)"
                  ></el-button></div
              ></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="3"
                ><div class="grid-content bg-purple">损伤中毒</div></el-col
              >
              <el-col :span="9"
                ><div class="grid-content bg-purple">
                  <el-form-item prop="ssficdm">
                    <el-select
                      v-model="formList.list[2].ficdm"
                      size="mini"
                      ref="ssficdm"
                      filterable
                      clearable
                      :disabled="isSsfzdlx"
                      placeholder="损伤中毒"
                      :filter-method="getZdList"
                      style="width: 95%;"
                      @change="query => handleZd(query, 0, 'ssList')"
                    >
                      <el-option
                        v-for="(item, index) in deptObj.ssList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: right"
                      >
                        <div style="display: flex;">
                          <span style="flex: 2;text-align: left;">{{
                            item.label
                          }}</span>
                          <span style="flex: 1;">{{ item.value }}</span>
                          <span style="flex: 1;">{{ item.code }}</span>
                        </div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div></el-col
              >
              <el-col :span="6"
                ><div class="grid-content bg-purple">
                  <el-form-item>
                    <el-input
                      v-model="formList.list[2].ficdm"
                      disabled
                      size="mini"
                      style="width: 95%;"
                    ></el-input>
                  </el-form-item></div
              ></el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getVerufyInjuryPoisoning,
  postAddDiagnose,
  getDiagnoseList,
  getRyBQList
} from "@/api";
import EntryButton from "@/components/EntryButton";
export default {
  components: {
    EntryButton
  },
  data() {
    var validateZyZd = (rule, value, callback, index) => {
      console.log(rule, 2, value, 3, callback, 4, index);
      if (index == 0) {
        if (!this.formList.list[index].ficdm) {
          callback(new Error("主要诊断为必填项！"));
        } else {
          callback();
        }
      } else if (index == 3) {
        let listLength = Number(rule.field.substr(rule.field.length - 1, 1));
        console.log(listLength);
        if (
          !this.formList.qtList[listLength].ficdm &&
          this.formList.qtList[listLength].frybqbh
        ) {
          callback(new Error("请选择其他诊断！"));
        } else {
          callback();
        }
      } else {
        if (
          !this.formList.list[index].ficdm &&
          this.formList.list[index].frybqbh
        ) {
          callback(new Error("请填写出院诊断！"));
        } else {
          callback();
        }
      }
    };
    var validateBq = (rule, value, callback, index) => {
      console.log(rule, value, callback, index);
      if (index == 0) {
        if (!this.formList.list[index].frybqbh) {
          callback(new Error("主要诊断入院病情为必填项！"));
        } else {
          callback();
        }
      } else if (index == 3) {
        let listLength = Number(rule.field.substr(rule.field.length - 1, 1));
        console.log(listLength);
        if (
          this.formList.qtList[listLength].ficdm &&
          !this.formList.qtList[listLength].frybqbh
        ) {
          callback(new Error("请选择其他诊断入院病情！"));
        } else {
          callback();
        }
      } else {
        if (
          this.formList.list[index].ficdm &&
          !this.formList.list[index].frybqbh
        ) {
          callback(new Error("请填写入院病情！"));
        } else {
          callback();
        }
      }
    };
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
      isSwitch: false,
      //损伤中毒
      isSsfzdlx: false,
      //诊断数组
      zdList: [],
      //入院病情数组
      bqList: [],
      formList: {
        list: [
          {
            //病案号
            fprn: sessionStorage.fprn,
            //住院次数
            ftimes: sessionStorage.ftimes,
            fzdlx: "1",
            //疾病编码
            ficdm: "",
            //诊断名称
            fjbname: "",
            //入院病情
            frybq: "",
            //入院病情
            frybqbh: ""
          },
          {
            fzdlx: "f",
            //疾病编码
            ficdm: "",
            //诊断名称
            fjbname: "",
            //入院病情
            frybq: "",
            //入院病情
            frybqbh: ""
          },
          {
            fzdlx: "s",
            //疾病编码
            ficdm: "",
            //诊断名称
            fjbname: "",
            //入院病情
            frybq: "",
            //入院病情
            frybqbh: ""
          }
        ],
        qtList: [
          {
            fzdlx: "2",
            //疾病编码
            ficdm: "",
            //诊断名称
            fjbname: "",
            //入院病情
            frybq: "",
            //入院病情编码
            frybqbh: ""
          }
        ]
      },
      deptObj: {
        //主要诊断
        zyList: [],
        //主要入院病情
        zybqList: [],
        //附属诊断
        fsList: [],
        //附属入院病情
        fsbqList: [],
        //损伤中毒
        ssList: [],
        //损伤中毒病情
        ssbqList: [],
        //其他诊断
        qtList0: [],
        //其他诊断病情
        qtbqList0: []
      },
      //用来动态生成其他诊断校验规则
      validateZyZds: validateZyZd,
      validateBqs: validateBq,
      //校验规则
      rules: {
        zyficdm: [
          {
            required: true,
            validator: (rule, value, callback) =>
              validateZyZd(rule, value, callback, 0),
            trigger: ["change", "blur"]
          }
        ],
        zyfrybqbh: [
          {
            required: true,
            validator: (rule, value, callback) =>
              validateBq(rule, value, callback, 0),
            trigger: ["change", "blur"]
          }
        ],
        fsficdm: [
          {
            required: true,
            validator: (rule, value, callback) =>
              validateZyZd(rule, value, callback, 1),
            trigger: ["change", "blur"]
          }
        ],
        fsfrybqbh: [
          {
            required: true,
            validator: (rule, value, callback) =>
              validateBq(rule, value, callback, 1),
            trigger: ["change", "blur"]
          }
        ],
        qtficdm0: [
          {
            required: true,
            validator: (rule, value, callback) =>
              validateZyZd(rule, value, callback, 3),
            trigger: ["change", "blur"]
          }
        ],
        qtfrybqbh0: [
          {
            required: true,
            validator: (rule, value, callback) =>
              validateBq(rule, value, callback, 3),
            trigger: ["change", "blur"]
          }
        ]
      }
    };
  },
  created() {
    this.getZdList();
    this.getBqList();
  },
  methods: {
    //诊断
    getZdList(val) {
      let data = {
        fzjc: val,
        type: this.isSwitch ? 1 : 2
      };
      getDiagnoseList(data).then(res => {
        console.log(res, "门急诊诊断");
        this.zdList = [];
        this.deptObj.zyList = [];
        this.deptObj.fsList = [];
        this.deptObj.ssList = [];
        this.deptObj.qtList0 = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.zdList.push({
              label: item.icdmName,
              value: item.icdm,
              code: item.fzjc,
              type: item.type
            });
          });
          this.deptObj.zyList = this.zdList;
          this.deptObj.fsList = this.zdList;
          this.deptObj.ssList = this.zdList;
          this.deptObj.qtList0 = this.zdList;
          this.formList.list[0].ficdm = this.deptObj.zyList[0].value;
        } else {
          this.zdList = [];
          this.deptObj.zyList = [];
          this.deptObj.fsList = [];
          this.deptObj.ssList = [];
          this.deptObj.qtList0 = [];
          this.formList.list[0].ficdm = "";
        }
      });
    },
    //入院病情
    getBqList(val) {
      let data = {
        fzjc: val,
        type: this.isSwitch ? 1 : 2
      };
      getRyBQList(data).then(res => {
        console.log(res, "入院病情");
        this.bqList = [];
        this.deptObj.zybqList = [];
        this.deptObj.fsbqList = [];
        this.deptObj.qtbqList0 = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.bqList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
          this.deptObj.zybqList = this.bqList;
          this.deptObj.fsbqList = this.bqList;
          this.deptObj.ssbqList = this.bqList;
          this.deptObj.qtbqList0 = this.bqList;
        } else {
          this.bqList = [];
          this.deptObj.zybqList = [];
          this.deptObj.fsbqList = [];
          this.deptObj.qtbqList0 = [];
        }
      });
    },
    //主要诊断/附属诊断/损伤中毒 出院诊断
    handleZd(val, index, arr) {
      console.log(val, index, arr);
      this.deptObj[arr].forEach((items, indexs) => {
        if (val == items.value) {
          this.formList.list[index].fjbname = items.label;
        }
      });
      if (arr == "zyList") {
        let data = {
          ficdm: val
        };
        getVerufyInjuryPoisoning(data).then(res => {
          console.log(res);
          if (res.state === "10000") {
            this.isSsfzdlx = true;
            this.rules["ssficdm"] = [
              {
                required: false,
                trigger: ["change", "blur"]
              }
            ];
            this.formList.list[2].ficdm = "";
          } else if (res.state === "10031") {
            this.isSsfzdlx = false;
            this.rules["ssficdm"] = [
              {
                required: true,
                message: "主要诊断为损伤码时,损伤中毒诊断为必填项",
                trigger: ["change", "blur"]
              }
            ];
          }
        });
      }
      console.log(this.formList.list[index].fjbname);
    },
    //其他诊断 出院诊断
    handleQtZd(val, index) {
      console.log(val, index);
      this.deptObj["qtList" + index].forEach((items, indexs) => {
        if (val == items.value) {
          this.formList.qtList[index].fjbname = items.label;
        }
      });
      console.log(this.formList.qtList[index].fjbname);
    },
    //主要诊断/附属诊断 入院病情
    handleBq(val, index, arr) {
      console.log(val, index, arr);
      this.deptObj[arr].forEach((items, indexs) => {
        if (val == items.value) {
          this.formList.list[index].frybq = items.label;
        }
      });
      console.log(this.formList.list[index].frybq);
    },
    //其他诊断 入院病情
    handleQtBq(val, index) {
      console.log(val, index);
      this.deptObj["qtbqList" + index].forEach((items, indexs) => {
        if (val == items.value) {
          this.formList.qtList[index].frybq = items.label;
        }
      });
      console.log(this.formList.qtList[index].frybq);
    },
    //添加多个
    addDomain() {
      this.formList.qtList.push({
        fzdlx: "2",
        //疾病编码
        ficdm: "",
        //诊断名称
        fjbname: "",
        //入院病情
        frybqbh: ""
      });
      this.rules["qtficdm" + (this.formList.qtList.length - 1)] = [
        {
          validator: (rule, value, callback) =>
            this.validateZyZds(rule, value, callback, 3),
          trigger: ["blur", "change"]
        }
      ];
      this.rules["qtfrybqbh" + (this.formList.qtList.length - 1)] = [
        {
          validator: (rule, value, callback) =>
            this.validateBqs(rule, value, callback, 3),
          trigger: ["blur", "change"]
        }
      ];
      this.deptObj["qtList" + (this.formList.qtList.length - 1)] = this.zdList;
      this.deptObj[
        "qtbqList" + (this.formList.qtList.length - 1)
      ] = this.bqList;
      console.log(
        this.formList.qtList,
        this.formList.qtList.length,
        this.rules,
        this.deptObj
      );
    },
    //删除数据
    removeDomain(item) {
      let index = this.formList.qtList.indexOf(item);
      if (index !== -1) {
        this.formList.qtList.splice(index, 1);
      }
      console.log(this.formList.qtList, this.formList);
    },
    // 切换诊断国家码/广东码
    handleSwitch(data) {
      console.log(data);
      this.isSwitch = data;
      this.getZdList();
    },
    // 校验
    handleCheck(data) {
      console.log(data);
      this.$refs["formList"].validate(valid => {
        if (valid) {
          this.isSaves = false;
          console.log("submit!!", this.isSaves);
          this.$message.success("校验成功");
        } else {
          this.isSaves = true;
          console.log("error submit!!", this.isSaves);
          return false;
        }
      });
    },
    //保存
    handleSave(data) {
      // console.log(data)
      //主要诊断/附属诊断/损伤中毒 数据
      let arrZd = [];
      //其他诊断 数据
      let arrQtZd = [];
      this.formList.list.forEach(item => {
        if (
          item.ficdm == "" &&
          item.fjbname == "" &&
          item.frybq == "" &&
          item.frybqbh == ""
        ) {
        } else {
          arrZd.push(item);
        }
      });
      this.formList.qtList.forEach(items => {
        if (
          items.ficdm == "" &&
          items.fjbname == "" &&
          items.frybq == "" &&
          items.frybqbh == ""
        ) {
        } else {
          arrQtZd.push(items);
        }
      });
      let datas = {
        //主要诊断/附属诊断/损伤中毒 数据
        diagnose: JSON.stringify(arrZd),
        //其他诊断 数据
        otherDiagnostic: JSON.stringify(arrQtZd)
      };
      postAddDiagnose(this.$qs.stringify(datas)).then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.$message.success("保存成功!");
        } else {
          this.$message.error(res.message);
        }
      });
      console.log(arrZd, arrQtZd);
    },
    // 清空表单验证
    resetForm() {
      this.$refs["formList"].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-button--mini.is-circle  {
    margin: 4px 0;
}
.el-row {
  margin-bottom: 20px;
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
.el_botton_div {
  line-height: 35px;
}
/deep/ .el-form-item__content {
  margin-left: 0px !important;
}
/deep/ .el-input__inner {
  text-align: center;
}
</style>
