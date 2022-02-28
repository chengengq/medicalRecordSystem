<template>
  <!-- 费用信息 -->
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
        <el-form
          :model="formList"
          ref="formList"
          label-width="100px"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-row :gutter="5">
            <el-col :span="3"
              ><div class="grid-content-head bg-purple">
                住院费用(元)：
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">总费用</div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="sumcost">
                      <el-input
                        v-model="formList.sumcost"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>

            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">自付金额：</div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzfje">
                      <el-input
                        :disabled="formList.sumcost == 0"
                        v-model="formList.fzfje"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="3"
              ><div class="grid-content-head bg-purple">
                综合医疗服务类
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    (1)一般医疗服务费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzhfwlylf">
                      <el-input
                        v-model="formList.fzhfwlylf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    中医辨证论治费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzhfwlylf01">
                      <el-input
                        v-model="formList.fzhfwlylf01"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    中医辨证论治会诊费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzhfwlylf02">
                      <el-input
                        v-model="formList.fzhfwlylf02"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-col :span="14"
                  ><div class="grid-content bg-purple">
                    (2)一般治疗操作费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzhfwlczf">
                      <el-input
                        v-model="formList.fzhfwlczf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-col :span="14"
                  ><div class="grid-content bg-purple">
                    (3)护理费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzhfwlhlf">
                      <el-input
                        v-model="formList.fzhfwlhlf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="3"><div>&nbsp;</div></el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    (4)其他费用:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzhfwlqtf">
                      <el-input
                        v-model="formList.fzhfwlqtf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="3"
              ><div class="grid-content-head bg-purple">诊断类</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    (5)病理诊断费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzdlblf">
                      <el-input
                        v-model="formList.fzdlblf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    (6)实验室诊断费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzdlsssf">
                      <el-input
                        v-model="formList.fzdlsssf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    (7)影像学诊断费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzdlyxf">
                      <el-input
                        v-model="formList.fzdlyxf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    (8)临床诊断项目费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzdllcf">
                      <el-input
                        v-model="formList.fzdllcf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="3"
              ><div class="grid-content-head bg-purple">治疗类</div></el-col
            >
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    (9)非手术治疗项目费:
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzllffssf">
                      <el-input
                        v-model="formList.fzllffssf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    临床物理治疗费:
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzllfwlzwlf">
                      <el-input
                        v-model="formList.fzllfwlzwlf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple">
                <el-col :span="7"
                  ><div class="grid-content bg-purple">
                    (10)手术治疗项目费:
                  </div></el-col
                >
                <el-col :span="3"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzllfssf">
                      <el-input
                        v-model="formList.fzllfssf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="3"
                  ><div class="grid-content bg-purple">
                    (麻醉费:
                  </div></el-col
                >
                <el-col :span="3"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzllfmzf">
                      <el-input
                        v-model="formList.fzllfmzf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="3"
                  ><div class="grid-content bg-purple">
                    手术费:
                  </div></el-col
                >
                <el-col :span="3"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzllfsszlf">
                      <el-input
                        v-model="formList.fzllfsszlf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="1"
                  ><div class="grid-content bg-purple">
                    )
                  </div></el-col
                >
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="3"
              ><div class="grid-content-head bg-purple">康复类</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">(11)康复费:</div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fkflkff">
                      <el-input
                        v-model="formList.fkflkff"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="3"
              ><div class="grid-content-head bg-purple">中医类</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    (12)中医诊断:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzylzdf">
                      <el-input
                        v-model="formList.fzylzdf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
            <el-col :span="16"
              ><div class="grid-content bg-purple">
                <el-col :span="3"
                  ><div class="grid-content bg-purple">
                    (13)中医治疗:
                  </div></el-col
                >
                <el-col :span="2"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzylzlf">
                      <el-input
                        v-model="formList.fzylzlf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="2"
                  ><div class="grid-content bg-purple">(中医外治:</div></el-col
                >
                <el-col :span="2"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzylzlf01">
                      <el-input
                        v-model="formList.fzylzlf01"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="2"
                  ><div class="grid-content bg-purple">中医骨伤:</div></el-col
                >
                <el-col :span="2"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzylzlf02">
                      <el-input
                        v-model="formList.fzylzlf02"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="2"
                  ><div class="grid-content bg-purple">针刺与灸法:</div></el-col
                >
                <el-col :span="2"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzylzlf03">
                      <el-input
                        v-model="formList.fzylzlf03"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="3"
                  ><div class="grid-content bg-purple">
                    中医推拿治疗:
                  </div></el-col
                >
                <el-col :span="2"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzylzlf04">
                      <el-input
                        v-model="formList.fzylzlf04"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="3"><div>&nbsp;</div></el-col>
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-col :span="14"
                  ><div class="grid-content bg-purple">
                    中医肛肠治疗:
                  </div></el-col
                ><el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzylzlf05">
                      <el-input
                        v-model="formList.fzylzlf05"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="1"
                  ><div class="grid-content bg-purple">
                    )
                  </div></el-col
                >
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    中医特殊治疗:
                  </div></el-col
                ><el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzylzlf06">
                      <el-input
                        v-model="formList.fzylzlf06"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
            <el-col :span="10"
              ><div class="grid-content bg-purple">
                <el-col :span="4"
                  ><div class="grid-content bg-purple">
                    (14)中医其他:
                  </div></el-col
                ><el-col :span="3"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzylqtf">
                      <el-input
                        v-model="formList.fzylqtf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="6"
                  ><div class="grid-content bg-purple">
                    (中药特殊调配加工:
                  </div></el-col
                ><el-col :span="3"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzylqtf01">
                      <el-input
                        v-model="formList.fzylqtf01"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="3"
                  ><div class="grid-content bg-purple">
                    辨证施膳:
                  </div></el-col
                ><el-col :span="3"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzylqtf02">
                      <el-input
                        v-model="formList.fzylqtf02"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="1"
                  ><div class="grid-content bg-purple">
                    )
                  </div></el-col
                >
              </div></el-col
            >
          </el-row>
          <el-row :gutter="5">
            <el-col :span="3"
              ><div class="grid-content-head bg-purple">西药类</div></el-col
            >
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-col :span="7"
                  ><div class="grid-content bg-purple">
                    (15)西药费:
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fxyf">
                      <el-input
                        v-model="formList.fxyf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="7"
                  ><div class="grid-content bg-purple">
                    (抗菌药物费用:
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fxylgjf">
                      <el-input
                        v-model="formList.fxylgjf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="1"
                  ><div class="grid-content bg-purple">
                    )
                  </div></el-col
                >
              </div></el-col
            >
          </el-row>
          <el-row :gutter="5">
            <el-col :span="3"
              ><div class="grid-content-head bg-purple">中药类</div></el-col
            >
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-col :span="6"
                  ><div class="grid-content bg-purple">
                    (16)中成药费:
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzchyf">
                      <el-input
                        v-model="formList.fzchyf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="9"
                  ><div class="grid-content bg-purple">
                    (医疗机构中药制剂费:
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzcljgzjf">
                      <el-input
                        v-model="formList.fzcljgzjf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="1"
                  ><div class="grid-content bg-purple">
                    )
                  </div></el-col
                >
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    (17)中草药费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fzcyf">
                      <el-input
                        v-model="formList.fzcyf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="3"
              ><div class="grid-content-head bg-purple">
                血液和血液制品类
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    (18)血费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fxylxf">
                      <el-input
                        v-model="formList.fxylxf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    (19)白蛋白类制品费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fxylbqbf">
                      <el-input
                        v-model="formList.fxylbqbf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    (20)球蛋白类制品费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fxylqdbf">
                      <el-input
                        v-model="formList.fxylqdbf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    (21)凝血因子类制品费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fxylyxyzf">
                      <el-input
                        v-model="formList.fxylyxyzf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">
                    (22)细胞因子类制品费:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fxylxbyzf">
                      <el-input
                        v-model="formList.fxylxbyzf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="3"
              ><div class="grid-content-head bg-purple">
                耗材类
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <el-col :span="16"
                  ><div class="grid-content bg-purple">
                    (23)检查用一次性医用材料费:
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fhclcjf">
                      <el-input
                        v-model="formList.fhclcjf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-col :span="16"
                  ><div class="grid-content bg-purple">
                    (24)治疗用一次性医用材料费:
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fhclzlf">
                      <el-input
                        v-model="formList.fhclzlf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-col :span="16"
                  ><div class="grid-content bg-purple">
                    (25)手术用一次性医用材料费:
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fhclssf">
                      <el-input
                        v-model="formList.fhclssf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="3"
              ><div class="grid-content-head bg-purple">其它类</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-col :span="15"
                  ><div class="grid-content bg-purple">(26)其他费:</div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fqtf">
                      <el-input
                        v-model="formList.fqtf"
                        @click.native="selectValue($event)"
                        size="mini"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content bg-purple" id="zdsum">
                <el-col :span="15"
                  ><div class="grid-content bg-purple" style="color:#67c23a">
                    自动计算分项合计:
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item prop="fsubentrycost">
                      <el-input
                        size="mini"
                        v-model="fsubentrycost"
                        readonly
                        autocomplete="off"
                      ></el-input>
                    </el-form-item></div
                ></el-col></div
            ></el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import EntryButton from "@/components/EntryButton";
import { postAddCost, getVerifyOperationCost } from "@/api";
export default {
  components: {
    EntryButton
  },
  data() {
    var validateApi = (rule, value) => {
      return new Promise((resolve, reject) => {
        let data = {
          //病案号
          fprn: sessionStorage.fprn,
          //住院次数
          ftimes: sessionStorage.ftimes,
          // 治疗类 => 手术治疗费 => 麻醉费
          fzllfmzf: this.formList.fzllfmzf,
          // 治疗类 => 手术治疗费 => 手术费
          fzllfsszlf: this.formList.fzllfsszlf
        };
        getVerifyOperationCost(data).then(res => {
          console.log(res);
          if (res.state == "10000") {
            resolve(res);
          } else if (res.state == "30000") {
            reject(new Error("请输入费用"));
          } else {
            reject(new Error(res.message));
          }
        });
      });
    };
    // 检查手术费麻醉费是否异常
    var validatePass1 = async (rule, value, callback) => {
      try {
        const res = await validateApi(rule, value);
        // console.log(res, "res", rule);
        callback();
      } catch (error) {
        callback(new Error(error.message));
      }
    };
    // 费用规则验证
    var validatePass = (rule, value, callback) => {
      // /^([0-9][0-9]*)+(\.[0-9]{1,5})?$/ 验证数字和小数点后5位
      var reg = /^(\d|([1-9]\d+))(\.\d{1,5})?$/;
      console.log(rule, value);
      if (rule.field == "fzfje") {
        if (this.formList.sumcost < this.formList.fzfje) {
          return callback(new Error("自付金额不能大于总费用!"));
        }
        if (value === "") {
          return callback(new Error("请输入费用"));
        }
        setTimeout(() => {
          if (!reg.test(value)) {
            callback(new Error("费用格式错误"));
          } else {
            callback();
          }
        }, 100);
      } else {
        if (value === "") {
          return callback(new Error("请输入费用"));
        }
        setTimeout(() => {
          if (!reg.test(value)) {
            callback(new Error("费用格式错误"));
          } else {
            callback();
          }
        }, 100);
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
      formList: {
        // 住院总费用 => 总费用
        sumcost: 0,
        // 住院总费用 => 自付金额
        fzfje: 0,
        // 综合医疗服务类 =>  1.一般医疗服务费
        fzhfwlylf: 0,
        // 综合医疗服务类 =>  一般医疗服务费=>中医辨证论治费（中医）
        fzhfwlylf01: 0,
        // 综合医疗服务类 =>  一般医疗服务费=>中医辨证论治会诊费（中医）
        fzhfwlylf02: 0,
        // 综合医疗服务类 =>  2.一般治疗操作费
        fzhfwlczf: 0,
        // 综合医疗服务类 =>  3.一般护理费
        fzhfwlhlf: 0,
        // 综合医疗服务类 =>  4.其他费用
        fzhfwlqtf: 0,
        // 诊断类 => 5.病理诊断费
        fzdlblf: 0,
        // 诊断类 => 6.实验室诊断费
        fzdlsssf: 0,
        // 诊断类 => 7.影像学诊断费
        fzdlyxf: 0,
        // 诊断类 => 8.临床诊断项目费
        fzdllcf: 0,
        // 治疗类 => 9.非手术治疗项目费
        fzllffssf: 0,
        // 治疗类 => 非手术治疗项目费 => 临床物理治疗费
        fzllfwlzwlf: 0,
        // 治疗类 => 10.手术治疗费
        fzllfssf: 0,
        // 治疗类 => 手术治疗费 => 麻醉费
        fzllfmzf: 0,
        // 治疗类 => 手术治疗费 => 手术费
        fzllfsszlf: 0,
        // 康复类 => 11.康复费
        fkflkff: 0,
        // 中医类 => 12.中医诊断
        fzylzdf: 0,
        // 中医类 => 13.中医治疗
        fzylzlf: 0,
        // 中医类 => 中医治疗 => 中医外治
        fzylzlf01: 0,
        // 中医类 => 中医治疗 => 中医骨伤
        fzylzlf02: 0,
        // 中医类 => 中医治疗 => 针刺与灸法
        fzylzlf03: 0,
        // 中医类 => 中医治疗 => 中医推拿治疗
        fzylzlf04: 0,
        // 中医类 => 中医治疗 => 中医肛肠治疗
        fzylzlf05: 0,
        // 中医类 => 中医治疗 => 中医特殊治疗
        fzylzlf06: 0,
        // 中医类 => 14.中医其他
        fzylqtf: 0,
        // 中医类 => 中医其他 => 中药特殊调配加工
        fzylqtf01: 0,
        // 中医类 => 中医其他 => 辨证施膳
        fzylqtf02: 0,
        // 西药类 => 15.西药费
        fxyf: 0,
        // 西药类 => 西药费 => 抗菌药物费用
        fxylgjf: 0,
        // 中药类 => 16.中成药费
        fzchyf: 0,
        // 中药类 => 中成药费 => 医疗机构中药制剂费
        fzcljgzjf: 0,
        // 中药类 => 17.中草药费
        fzcyf: 0,
        // 血液和血液制品类 => 18.血费
        fxylxf: 0,
        // 血液和血液制品类 => 19.白蛋白类制品费
        fxylbqbf: 0,
        // 血液和血液制品类 => 20.球蛋白类制品费
        fxylqdbf: 0,
        // 血液和血液制品类 => 21.凝血因子类制品费
        fxylyxyzf: 0,
        // 血液和血液制品类 => 22.细胞因子类制品费
        fxylxbyzf: 0,
        // 耗材类 => 23.检查用一次性医用材料费
        fhclcjf: 0,
        // 耗材类 => 24.治疗用一次性医用材料费
        fhclzlf: 0,
        // 耗材类 => 25.手术用一次性医用材料费
        fhclssf: 0,
        // 其它类 => 26.其他费
        fqtf: 0
      },
      rules: {
        // 总费用
        sumcost: [{ validator: validatePass, trigger: "blur" }],
        // 自付金额
        fzfje: [{ validator: validatePass, trigger: "blur" }],
        // 1.一般医疗服务费
        fzhfwlylf: [{ validator: validatePass, trigger: "blur" }],
        // 中医辨证论治费
        fzhfwlylf01: [{ validator: validatePass, trigger: "blur" }],
        // 中医辨证论治会诊费
        fzhfwlylf02: [{ validator: validatePass, trigger: "blur" }],
        // 2.一般治疗操作费
        fzhfwlczf: [{ validator: validatePass, trigger: "blur" }],
        // 3.护理费
        fzhfwlhlf: [{ validator: validatePass, trigger: "blur" }],
        // 4.其他费用
        fzhfwlqtf: [{ validator: validatePass, trigger: "blur" }],
        // 5.病理诊断费
        fzdlblf: [{ validator: validatePass, trigger: "blur" }],
        // 6.实验室诊断费
        fzdlsssf: [{ validator: validatePass, trigger: "blur" }],
        // 7.影像学诊断费
        fzdlyxf: [{ validator: validatePass, trigger: "blur" }],
        // 8.临床诊断项目费
        fzdllcf: [{ validator: validatePass, trigger: "blur" }],
        // 9.非手术治疗项目费
        fzllffssf: [{ validator: validatePass, trigger: "blur" }],
        // 临床物理治疗费
        fzllfwlzwlf: [{ validator: validatePass, trigger: "blur" }],
        // 10.手术治疗项目费
        fzllfssf: [{ validator: validatePass, trigger: "blur" }],
        // 麻醉费
        fzllfmzf: [{ validator: validatePass1, trigger: "blur" }],
        // 手术费
        fzllfsszlf: [{ validator: validatePass1, trigger: "blur" }],
        // 11.康复费
        fkflkff: [{ validator: validatePass, trigger: "blur" }],
        // 12.中医诊断
        fzylzdf: [{ validator: validatePass, trigger: "blur" }],
        // 13.中医治疗
        fzylzlf: [{ validator: validatePass, trigger: "blur" }],
        // 中医外治
        fzylzlf01: [{ validator: validatePass, trigger: "blur" }],
        // 中医骨伤
        fzylzlf02: [{ validator: validatePass, trigger: "blur" }],
        // 针刺与灸法
        fzylzlf03: [{ validator: validatePass, trigger: "blur" }],
        // 中医推拿治疗
        fzylzlf04: [{ validator: validatePass, trigger: "blur" }],
        // 中医肛肠治疗
        fzylzlf05: [{ validator: validatePass, trigger: "blur" }],
        // 中医特殊治疗
        fzylzlf06: [{ validator: validatePass, trigger: "blur" }],
        // 14.中医其他
        fzylqtf: [{ validator: validatePass, trigger: "blur" }],
        // 中药特殊调配加工
        fzylqtf01: [{ validator: validatePass, trigger: "blur" }],
        // 辨证施膳
        fzylqtf02: [{ validator: validatePass, trigger: "blur" }],
        // 15.西药费
        fxyf: [{ validator: validatePass, trigger: "blur" }],
        // 抗菌药物费用
        fxylgjf: [{ validator: validatePass, trigger: "blur" }],
        // 16.中成药费
        fzchyf: [{ validator: validatePass, trigger: "blur" }],
        // 医疗机构中药制剂费
        fzcljgzjf: [{ validator: validatePass, trigger: "blur" }],
        // 17.中草药费
        fzcyf: [{ validator: validatePass, trigger: "blur" }],
        // 18.血费
        fxylxf: [{ validator: validatePass, trigger: "blur" }],
        // 19.白蛋白类制品费
        fxylbqbf: [{ validator: validatePass, trigger: "blur" }],
        // 20.球蛋白类制品费
        fxylqdbf: [{ validator: validatePass, trigger: "blur" }],
        // 21.凝血因子类制品费
        fxylyxyzf: [{ validator: validatePass, trigger: "blur" }],
        // 22.细胞因子类制品费
        fxylxbyzf: [{ validator: validatePass, trigger: "blur" }],
        // 23.检查用一次性医用材料费
        fhclcjf: [{ validator: validatePass, trigger: "blur" }],
        // 24.治疗用一次性医用材料费
        fhclzlf: [{ validator: validatePass, trigger: "blur" }],
        // 25.手术用一次性医用材料费
        fhclssf: [{ validator: validatePass, trigger: "blur" }],
        // 26.其他费
        fqtf: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  computed: {
    fsubentrycost() {
      var object = Object.values(this.formList);
      // 除去总费用和自付费用
      var obj = object.slice(2);
      // 合计总费用
      var sum = 0;
      // 判断输入时是否为空
      for (let i = 0; i < obj.length; i++) {
        var sum1 = obj.filter(n => n);
      }
      // 费用相加
      for (let j = 0; j < sum1.length; j++) {
        //字符串转为数字
        sum = Number(sum) + Number(sum1[j]);
      }
      // Number对象有一个保留小数位数的方法：toFixed()传入一个需要保留的位数就OK
      // toFixed方法返回的是一个字符串
      return Number(sum.toFixed(10));
    }
  },
  methods: {
    //选定输入框,自动全选输入框内容
    selectValue(e) {
      console.log(e, "e");
      e.target.select();
    },
    // 校验按钮
    handleCheck(data) {
      console.log(data);
      if (this.formList.sumcost == this.fsubentrycost) {
        this.$refs["formList"].validate((valid, value) => {
          if (valid) {
            this.isSaves = false;
          } else {
            this.isSaves = true;
            return false;
          }
        });
      } else {
        this.isSaves = true;
        this.$message({
          type: "error",
          message: "总费用不等!"
        });
      }
    },
    // 保存
    handleSave() {
      let data = {
        //病案号
        fprn: sessionStorage.fprn,
        //住院次数
        ftimes: sessionStorage.ftimes,
        // 住院总费用 => 总费用
        sumcost: this.formList.sumcost,
        // 住院总费用 => 自付金额
        fzfje: this.formList.fzfje,
        // 综合医疗服务类 =>  1.一般医疗服务费
        fzhfwlylf: this.formList.fzhfwlylf,
        // 综合医疗服务类 =>  一般医疗服务费=>中医辨证论治费（中医）
        fzhfwlylf01: this.formList.fzhfwlylf01,
        // 综合医疗服务类 =>  一般医疗服务费=>中医辨证论治会诊费（中医）
        fzhfwlylf02: this.formList.fzhfwlylf02,
        // 综合医疗服务类 =>  2.一般治疗操作费
        fzhfwlczf: this.formList.fzhfwlczf,
        // 综合医疗服务类 =>  3.一般护理费
        fzhfwlhlf: this.formList.fzhfwlhlf,
        // 综合医疗服务类 =>  4.其他费用
        fzhfwlqtf: this.formList.fzhfwlqtf,
        // 诊断类 => 5.病理诊断费
        fzdlblf: this.formList.fzdlblf,
        // 诊断类 => 6.实验室诊断费
        fzdlsssf: this.formList.fzdlsssf,
        // 诊断类 => 7.影像学诊断费
        fzdlyxf: this.formList.fzdlyxf,
        // 诊断类 => 8.临床诊断项目费
        fzdllcf: this.formList.fzdllcf,
        // 治疗类 => 9.非手术治疗项目费
        fzllffssf: this.formList.fzllffssf,
        // 治疗类 => 非手术治疗项目费 => 临床物理治疗费
        fzllfwlzwlf: this.formList.fzllfwlzwlf,
        // 治疗类 => 10.手术治疗费
        fzllfssf: this.formList.fzllfssf,
        // 治疗类 => 手术治疗费 => 麻醉费
        fzllfmzf: this.formList.fzllfmzf,
        // 治疗类 => 手术治疗费 => 手术费
        fzllfsszlf: this.formList.fzllfsszlf,
        // 康复类 => 11.康复费
        fkflkff: this.formList.fkflkff,
        // 中医类 => 12.中医诊断
        fzylzdf: this.formList.fzylzdf,
        // 中医类 => 13.中医治疗
        fzylzlf: this.formList.fzylzlf,
        // 中医类 => 中医治疗 => 中医外治
        fzylzlf01: this.formList.fzylzlf01,
        // 中医类 => 中医治疗 => 中医骨伤
        fzylzlf02: this.formList.fzylzlf02,
        // 中医类 => 中医治疗 => 针刺与灸法
        fzylzlf03: this.formList.fzylzlf03,
        // 中医类 => 中医治疗 => 中医推拿治疗
        fzylzlf04: this.formList.fzylzlf04,
        // 中医类 => 中医治疗 => 中医肛肠治疗
        fzylzlf05: this.formList.fzylzlf05,
        // 中医类 => 中医治疗 => 中医特殊治疗
        fzylzlf06: this.formList.fzylzlf06,
        // 中医类 => 14.中医其他
        fzylqtf: this.formList.fzylqtf,
        // 中医类 => 中医其他 => 中药特殊调配加工
        fzylqtf01: this.formList.fzylqtf01,
        // 中医类 => 中医其他 => 辨证施膳
        fzylqtf02: this.formList.fzylqtf02,
        // 西药类 => 15.西药费
        fxyf: this.formList.fxyf,
        // 西药类 => 西药费 => 抗菌药物费用
        fxylgjf: this.formList.fxylgjf,
        // 中药类 => 16.中成药费
        fzchyf: this.formList.fzchyf,
        // 中药类 => 中成药费 => 医疗机构中药制剂费
        fzcljgzjf: this.formList.fzcljgzjf,
        // 中药类 => 17.中草药费
        fzcyf: this.formList.fzcyf,
        // 血液和血液制品类 => 18.血费
        fxylxf: this.formList.fxylxf,
        // 血液和血液制品类 => 19.白蛋白类制品费
        fxylbqbf: this.formList.fxylbqbf,
        // 血液和血液制品类 => 20.球蛋白类制品费
        fxylqdbf: this.formList.fxylqdbf,
        // 血液和血液制品类 => 21.凝血因子类制品费
        fxylyxyzf: this.formList.fxylyxyzf,
        // 血液和血液制品类 => 22.细胞因子类制品费
        fxylxbyzf: this.formList.fxylxbyzf,
        // 耗材类 => 23.检查用一次性医用材料费
        fhclcjf: this.formList.fhclcjf,
        // 耗材类 => 24.治疗用一次性医用材料费
        fhclzlf: this.formList.fhclzlf,
        // 耗材类 => 25.手术用一次性医用材料费
        fhclssf: this.formList.fhclssf,
        // 其它类 => 26.其他费
        fqtf: this.formList.fqtf,
        // 分计费用之和
        fsubentrycost: this.fsubentrycost
      };
      postAddCost(this.$qs.stringify(data)).then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.$message.success("保存成功!");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    resetForm() {
      this.$refs["formList"].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 18px;
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
.grid-content-head {
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  line-height: 35px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  text-align: left;
  line-height: 35px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-form-item {
  margin-bottom: 0px;
}
.main_wraps {
  height: 100%;
  font-size: 14px;
  color: #515355;
  padding-top: 10px;
}
/deep/ .el-form-item__content {
  margin-left: 0 !important;
  line-height: inherit;
}
/deep/ .el-input__inner {
  text-align: center;
}
#zdsum {
  /deep/ .el-input__inner {
    color: #67c23a;
  }
}
</style>
