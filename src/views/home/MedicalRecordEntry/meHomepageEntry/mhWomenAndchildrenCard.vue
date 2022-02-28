<template>
  <!-- 妇婴卡 -->
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
        <div class="main_header_record_table">
          <el-row :gutter="5">
            <el-col :span="2"
              ><div class="grid-content bg-purple">婴儿序号</div></el-col
            >
            <el-col :span="3"
              ><div class="grid-content bg-purple">性别</div></el-col
            >
            <el-col :span="3"
              ><div class="grid-content bg-purple">分娩结果</div></el-col
            >
            <el-col :span="3"
              ><div class="grid-content bg-purple">婴儿体重(g)</div></el-col
            >
            <el-col :span="3"
              ><div class="grid-content bg-purple">婴儿转归</div></el-col
            >
            <el-col :span="3"
              ><div class="grid-content bg-purple">呼吸</div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple">抢救次数</div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple">成功次数</div></el-col
            >
          </el-row>
          <el-form
            :model="formList"
            :rules="rules"
            ref="formList"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row
              :gutter="5"
              v-for="(item, index) in formList.list"
              :key="index"
            >
              <el-col :span="2"
                ><div class="grid-content bg-purple">
                  {{ index + 1 }}
                </div></el-col
              >
              <el-col :span="3"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fsexbh' + index">
                    <el-select
                      v-model="formList.list[index].fsexbh"
                      filterable
                      clearable
                      size="mini"
                      :ref="'fsexbh' + index"
                      placeholder="请选择性别"
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
                  </el-form-item></div
              ></el-col>
              <el-col :span="3"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fresultbh' + index">
                    <el-select
                      v-model="formList.list[index].fresultbh"
                      :id="'fresultbh' + index"
                      :ref="'fresultbh' + index"
                      filterable
                      clearable
                      style="width: 90%;"
                      size="mini"
                      placeholder="切口"
                    >
                      <el-option
                        v-for="(item, index) in formList.list[index]
                          .fresultList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item></div
              ></el-col>
              <el-col :span="3"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fbabyweight' + index">
                    <el-input
                      ref="fbabyweight"
                      v-model="formList.list[index].fbabyweight"
                      size="mini"
                      style="width: 90%;"
                      placeholder="请填写婴儿体重"
                    ></el-input>
                  </el-form-item></div
              ></el-col>
              <el-col :span="3"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'flyfsbh' + index">
                    <el-select
                      v-model="formList.list[index].flyfsbh"
                      :id="'flyfsbh' + index"
                      :ref="'flyfsbh' + index"
                      filterable
                      clearable
                      style="width: 90%;"
                      size="mini"
                      placeholder="请选择婴儿转归"
                    >
                      <el-option
                        v-for="(item, index) in formList.list[index].flyfsList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item></div
              ></el-col>
              <el-col :span="3"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fhxbh' + index">
                    <el-select
                      v-model="formList.list[index].fhxbh"
                      :id="'fhxbh' + index"
                      :ref="'fhxbh' + index"
                      filterable
                      clearable
                      style="width: 90%;"
                      size="mini"
                      placeholder="请选择呼吸"
                    >
                      <el-option
                        v-for="(item, index) in formList.list[index].fhxList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item></div
              ></el-col>
              <el-col :span="2"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fqjtimes' + index">
                    <el-input
                      :ref="'fqjtimes' + index"
                      v-model="formList.list[index].fqjtimes"
                      size="mini"
                      style="width: 90%;"
                      placeholder="请填写抢救次数"
                    ></el-input>
                  </el-form-item></div
              ></el-col>
              <el-col :span="2"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fqjsuctimes' + index">
                    <el-input
                      :ref="'fqjsuctimes' + index"
                      v-model="formList.list[index].fqjsuctimes"
                      size="mini"
                      style="width: 90%;"
                      placeholder="请填写抢救成功次数"
                    ></el-input>
                  </el-form-item></div
              ></el-col>
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
  postAddMaternityChild,
  getDeliveryList,
  getInfantOutcomeList,
  getBreatheList
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
      formList: {
        list: [
          {
            //病案号
            fprn: sessionStorage.fprn,
            //住院次数
            ftimes: sessionStorage.ftimes,
            //录入员
            userName: sessionStorage.userName,
            //录入日期
            newDate: sessionStorage.newDate,
            //性别
            fsexbh: "",
            //分娩结果
            fresultbh: "",
            fresultList: [],
            //婴儿体重
            fbabyweight: "",
            //婴儿转归
            flyfsbh: "",
            flyfsList: [],
            //呼吸编号
            fhxbh: "",
            fhxList: [],
            //抢救次数
            fqjtimes: "",
            //抢救成功次数
            fqjsuctimes: ""
          }
        ]
      },
      rules: {}
    };
  },
  created() {
    this.getFresultList();
    this.getFlyfsList();
    this.getFhxList();
  },
  methods: {
    //分娩结果
    getFresultList(val) {
      let data = {
        dictCode: val
      };
      getDeliveryList(data).then(res => {
        console.log(res, "分娩结果");
        this.formList.list[0].fresultList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.list[0].fresultList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.list[0].fresultList = [];
        }
      });
    },
    //婴儿转归
    getFlyfsList(val) {
      let data = {
        dictCode: val
      };
      getInfantOutcomeList(data).then(res => {
        console.log(res, "婴儿转归");
        this.formList.list[0].flyfsList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.list[0].flyfsList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.list[0].flyfsList = [];
        }
      });
    },
    //呼吸
    getFhxList(val) {
      let data = {
        dictCode: val
      };
      getBreatheList(data).then(res => {
        console.log(res, "呼吸");
        this.formList.list[0].fhxList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.list[0].fhxList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.list[0].fhxList = [];
        }
      });
    },
    //添加多个
    addDomain() {
      this.formList.list.push({
        //性别
        fsexbh: "",
        //分娩结果
        fresultbh: "",
        fresultList: this.formList.list[0].fresultList,
        //婴儿体重
        fbabyweight: "",
        //婴儿转归
        flyfsbh: "",
        flyfsList: this.formList.list[0].flyfsList,
        //呼吸编号
        fhxbh: "",
        fhxList: this.formList.list[0].fhxList,
        //抢救次数
        fqjtimes: "",
        //抢救成功次数
        fqjsuctimes: ""
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
      //妇婴数据
      let arrFy = [];
      this.formList.list.forEach(item => {
        if (
          item.fsexbh == "" &&
          item.fresultbh == "" &&
          item.fbabyweight == "" &&
          item.flyfsbh == "" &&
          item.fhxbh == "" &&
          item.fqjtimes == "" &&
          item.fqjsuctimes == ""
        ) {
        } else {
          arrFy.push(item);
        }
      });
      if (arrFy.length == 0) {
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
      console.log(data);
      let arr = JSON.parse(JSON.stringify(this.formList.list));
      let maternityChild = [];
      maternityChild = arr.filter(
        item =>
          delete item.fresultList &&
          delete item.flyfsList &&
          delete item.fhxList
      );
      let datas = {
        //妇婴卡信息
        maternityChild: JSON.stringify(maternityChild)
      };
      postAddMaternityChild(this.$qs.stringify(datas)).then(res => {
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
    resetForm() {}
  }
};
</script>

<style lang="scss" scoped>
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
  margin-top: 6px;
}
/deep/ .el-form-item__content {
  margin-left: 0px !important;
}
/deep/ .el-input__inner {
  text-align: center;
}
</style>
