<template>
  <!-- 符合情况 -->
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
        <div class="basicMess">
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
                  <el-form-item label="HBsAb" prop="fhbsagbh">
                    <el-select
                      v-model="formList.fhbsagbh"
                      size="mini"
                      ref="fhbsagbh"
                      filterable
                      placeholder="请选择HBsAb"
                    >
                      <el-option
                        v-for="(item, index) in fhbsagList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="HCV-Ab" prop="fhcvabbh">
                    <el-select
                      v-model="formList.fhcvabbh"
                      size="mini"
                      ref="fhcvabbh"
                      filterable
                      placeholder="请选择HCV-Ab"
                    >
                      <el-option
                        v-for="(item, index) in fhbsagList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="HIV-Ab" prop="fhivabbh">
                    <el-select
                      v-model="formList.fhivabbh"
                      size="mini"
                      ref="fhivabbh"
                      filterable
                      placeholder="请选择HCV-Ab"
                    >
                      <el-option
                        v-for="(item, index) in fhbsagList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="是否尸检" prop="fbodybh">
                    <el-switch
                      v-model="formList.fbodybh"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    >
                    </el-switch>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item">
                  <el-form-item label="病例分型" prop="fjbfxbh">
                    <el-select
                      v-model="formList.fjbfxbh"
                      size="mini"
                      ref="fjbfxbh"
                      filterable
                      placeholder="请选择病例分型"
                    >
                      <el-option
                        v-for="(item, index) in fjbfxList"
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
                  <el-form-item label="临床路径病例" prop="fycljbh">
                    <el-select
                      v-model="formList.fycljbh"
                      size="mini"
                      ref="fycljbh"
                      filterable
                      clearable
                      placeholder="请选择临床路径病例"
                    >
                      <el-option
                        v-for="(item, index) in fycljList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="抢救次数" prop="fqjtimes">
                    <el-input
                      ref="fqjtimes"
                      v-model="formList.fqjtimes"
                      size="mini"
                      placeholder="不填写默认为0"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="成功次数" prop="fqjsuctimes">
                    <el-input
                      ref="fqjsuctimes"
                      v-model="formList.fqjsuctimes"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item" style="width: 48.5%">
                  <el-form-item label="病理诊断" prop="fphzdcode">
                    <el-select
                      v-model="formList.fphzdcode"
                      size="mini"
                      ref="fphzdcode"
                      filterable
                      placeholder="请选择"
                      :filter-method="getFphzdList"
                      style="width: 75%;"
                      @change="handleFphzd"
                    >
                      <el-option
                        v-for="(item, index) in fphzdList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: right"
                      >
                        <div style="display: flex;">
                          <span style="flex: 4;text-align: left;">{{
                            item.label
                          }}</span>
                          <span style="flex: 1;">{{ item.value }}</span>
                          <span style="flex: 1;">{{ item.code }}</span>
                          <span style="flex: 1;">{{ item.type }}</span>
                        </div>
                      </el-option>
                    </el-select>
                    <el-input
                      style="width:24%;"
                      v-model="formList.fphzdcode"
                      size="mini"
                      disabled
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="病理号" prop="fphzdnum">
                    <el-input
                      ref="fphzdnum"
                      v-model="formList.fphzdnum"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item">
                  <el-form-item label="门诊与出院" prop="fmzcyaccobh">
                    <el-select
                      v-model="formList.fmzcyaccobh"
                      size="mini"
                      ref="fmzcyaccobh"
                      clearable
                      placeholder="请选择门诊与出院诊断符合情况"
                    >
                      <el-option
                        v-for="(item, index) in fmzcyaccoList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="术前与术后" prop="fsqshaccobh">
                    <el-select
                      v-model="formList.fsqshaccobh"
                      size="mini"
                      ref="fsqshaccobh"
                      clearable
                      placeholder="请选择术前与术后诊断符合情况"
                    >
                      <el-option
                        v-for="(item, index) in fmzcyaccoList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="入院与出院" prop="frycyaccobh">
                    <el-select
                      v-model="formList.frycyaccobh"
                      size="mini"
                      ref="frycyaccobh"
                      clearable
                      placeholder="请选择入院与出院诊断符合情况"
                    >
                      <el-option
                        v-for="(item, index) in fmzcyaccoList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="临床与病理" prop="flcblaccobh">
                    <el-select
                      v-model="formList.flcblaccobh"
                      size="mini"
                      ref="flcblaccobh"
                      clearable
                      placeholder="请选择临床与病理诊断符合情况"
                    >
                      <el-option
                        v-for="(item, index) in fmzcyaccoList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="放射与病理" prop="ffsblaccobh">
                    <el-select
                      v-model="formList.ffsblaccobh"
                      size="mini"
                      ref="ffsblaccobh"
                      clearable
                      placeholder="请选择放射与病理诊断符合情况"
                    >
                      <el-option
                        v-for="(item, index) in fmzcyaccoList"
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
                <div class="hearder_item">
                  <el-form-item label="药物过敏" prop="fifgmyw">
                    <el-select
                      v-model="formList.fifgmyw"
                      size="mini"
                      ref="fifgmyw"
                      filterable
                      clearable
                      placeholder="请选择有无药物过敏"
                    >
                      <el-option
                        v-for="(item, index) in fifgmywList"
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
                  <el-form-item label="过敏药物" prop="fgmyw">
                    <el-input
                      :disabled="formList.fifgmyw == 1 ? true : false"
                      ref="fgmyw"
                      v-model="formList.fgmyw"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item">
                  <el-form-item label="血型" prop="fblood">
                    <el-select
                      v-model="formList.fblood"
                      size="mini"
                      ref="fblood"
                      filterable
                      clearable
                      placeholder="请选择血型"
                    >
                      <el-option
                        v-for="(item, index) in fbloodList"
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
                  <el-form-item label="Rh" prop="frhbh">
                    <el-select
                      v-model="formList.frhbh"
                      size="mini"
                      ref="frhbh"
                      filterable
                      clearable
                      placeholder="请选择Rh"
                    >
                      <el-option
                        v-for="(item, index) in frhList"
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
                  <el-form-item label="输血反应" prop="fsxfybh">
                    <el-select
                      v-model="formList.fsxfybh"
                      size="mini"
                      ref="fsxfybh"
                      filterable
                      clearable
                      placeholder="请选择输血反应"
                    >
                      <el-option
                        v-for="(item, index) in fifgmywList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="输液反应" prop="fsyfybh">
                    <el-select
                      v-model="formList.fsyfybh"
                      size="mini"
                      ref="fsyfybh"
                      filterable
                      clearable
                      placeholder="请选择输液反应"
                    >
                      <el-option
                        v-for="(item, index) in fifgmywList"
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
                <div class="hearder_item">
                  <el-form-item label="科主任" prop="fkzrbh">
                    <el-select
                      v-model="formList.fkzrbh"
                      size="mini"
                      ref="fkzrbh"
                      filterable
                      placeholder="请选择"
                      :filter-method="
                        query => handleDocQuery(query, 'fkzrList')
                      "
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="(item, index) in fkzrList"
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
                  <el-form-item label="主任(副主任)医师" prop="fzrdoctbh">
                    <el-select
                      v-model="formList.fzrdoctbh"
                      size="mini"
                      ref="fzrdoctbh"
                      filterable
                      placeholder="请选择"
                      :filter-method="
                        query => handleDocQuery(query, 'fzrdoctList')
                      "
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="(item, index) in fzrdoctList"
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
                  <el-form-item label="主治医师" prop="fzzdoctbh">
                    <el-select
                      v-model="formList.fzzdoctbh"
                      size="mini"
                      ref="fzzdoctbh"
                      filterable
                      placeholder="请选择"
                      :filter-method="
                        query => handleDocQuery(query, 'fzzdoctList')
                      "
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="(item, index) in fzzdoctList"
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
                  <el-form-item label="住院医师" prop="fzydoctbh">
                    <el-select
                      v-model="formList.fzydoctbh"
                      size="mini"
                      ref="fzydoctbh"
                      filterable
                      placeholder="请选择"
                      :filter-method="
                        query => handleDocQuery(query, 'fzydoctList')
                      "
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="(item, index) in fzydoctList"
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
                <div class="hearder_item">
                  <el-form-item label="责任护士" prop="fzrnursebh">
                    <el-select
                      v-model="formList.fzrnursebh"
                      size="mini"
                      ref="fzrnursebh"
                      filterable
                      placeholder="请选择"
                      :filter-method="
                        query => handleDocQuery(query, 'fzrnurseList')
                      "
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="(item, index) in fzrnurseList"
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
                  <el-form-item label="进修医师" prop="fjxdoctbh">
                    <el-select
                      v-model="formList.fjxdoctbh"
                      size="mini"
                      ref="fjxdoctbh"
                      filterable
                      placeholder="请选择"
                      :filter-method="
                        query => handleDocQuery(query, 'fjxdoctList')
                      "
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="(item, index) in fjxdoctList"
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
                  <el-form-item label="实习医师" prop="fsxdoctbh">
                    <el-select
                      v-model="formList.fsxdoctbh"
                      size="mini"
                      ref="fsxdoctbh"
                      filterable
                      placeholder="请选择"
                      :filter-method="
                        query => handleDocQuery(query, 'fsxdoctList')
                      "
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="(item, index) in fsxdoctList"
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
                  <el-form-item label="编码员" prop="fbmybh">
                    <el-input
                      ref="fbmybh"
                      v-model="formList.fbmybh"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item">
                  <el-form-item label="病案质量" prop="fqualitybh">
                    <el-select
                      v-model="formList.fqualitybh"
                      size="mini"
                      ref="fqualitybh"
                      filterable
                      clearable
                      placeholder="请选择病案质量"
                    >
                      <el-option
                        v-for="(item, index) in fqualityList"
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
                  <el-form-item label="质控医师" prop="fzkdoctbh">
                    <el-select
                      v-model="formList.fzkdoctbh"
                      size="mini"
                      ref="fzkdoctbh"
                      filterable
                      placeholder="请选择"
                      :filter-method="
                        query => handleDocQuery(query, 'fzkdoctList')
                      "
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="(item, index) in fzkdoctList"
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
                  <el-form-item label="质控护士" prop="fzknursebh">
                    <el-select
                      v-model="formList.fzknursebh"
                      size="mini"
                      ref="fzknursebh"
                      filterable
                      placeholder="请选择"
                      :filter-method="
                        query => handleDocQuery(query, 'fzknurseList')
                      "
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="(item, index) in fzknurseList"
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
                  <el-form-item label="质控日期" prop="fzkrq">
                    <el-date-picker
                      ref="fbirthday"
                      size="mini"
                      style="width: 200px"
                      v-model="formList.fzkrq"
                      :editable="true"
                      type="date"
                      format="yyyy-MM-dd"
                      placeholder="选择日期yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item">
                  <el-form-item label="输血品种 1.红细胞" prop="fredcell">
                    <el-input
                      ref="fredcell"
                      v-model="formList.fredcell"
                      size="mini"
                      placeholder="红细胞"
                      style="width:80%;"
                    ></el-input>
                    <span style="width: 20%">单位</span>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="2.血小板" prop="fplaque">
                    <el-input
                      ref="fplaque"
                      v-model="formList.fplaque"
                      size="mini"
                      placeholder="血小板"
                      style="width:80%;"
                    ></el-input>
                    <span style="width: 20%">袋</span>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="3.血浆" prop="fserous">
                    <el-input
                      ref="fserous"
                      v-model="formList.fserous"
                      size="mini"
                      placeholder="血浆"
                      style="width:80%;"
                    ></el-input>
                    <span style="width: 20%">ml</span>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="4.全血" prop="fallblood">
                    <el-input
                      ref="fallblood"
                      v-model="formList.fallblood"
                      size="mini"
                      placeholder="全血"
                      style="width:80%;"
                    ></el-input>
                    <span style="width: 20%">ml</span>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="5.其他" prop="fotherblood">
                    <el-input
                      ref="fotherblood"
                      v-model="formList.fotherblood"
                      size="mini"
                      placeholder="其他"
                      style="width:80%;"
                    ></el-input>
                    <span style="width: 20%">ml</span>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item">
                  <el-form-item label="院际会诊" prop="fhzyj">
                    <el-input
                      ref="fhzyj"
                      v-model="formList.fhzyj"
                      size="mini"
                      placeholder="院际会诊"
                      style="width:80%;"
                    ></el-input>
                    <span style="width: 20%">次</span>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="远程会诊" prop="fhzyc">
                    <el-input
                      ref="fhzyc"
                      v-model="formList.fhzyc"
                      size="mini"
                      placeholder="远程会诊"
                      style="width:80%;"
                    ></el-input>
                    <span style="width: 20%">次</span>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="护理等级 1.特级" prop="fhltj">
                    <el-input
                      ref="fhltj"
                      v-model="formList.fhltj"
                      size="mini"
                      placeholder="特级护理"
                      style="width:80%;"
                    ></el-input>
                    <span style="width: 20%">小时</span>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="2.I级护理" prop="fhl1">
                    <el-input
                      ref="fhl1"
                      v-model="formList.fhl1"
                      size="mini"
                      placeholder="I级护理"
                      style="width:80%;"
                    ></el-input>
                    <span style="width: 20%">日</span>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="3.II级护理" prop="fhl2">
                    <el-input
                      ref="fhl2"
                      v-model="formList.fhl2"
                      size="mini"
                      placeholder="II级护理"
                      style="width:80%;"
                    ></el-input>
                    <span style="width: 20%">日</span>
                  </el-form-item>
                </div>
              </div>
              <div class="main_hearder_items">
                <div class="hearder_item">
                  <el-form-item label="4.III级护理" prop="fhl3">
                    <el-input
                      ref="fhl3"
                      v-model="formList.fhl3"
                      size="mini"
                      placeholder="III级护理"
                      style="width:80%;"
                    ></el-input>
                    <span style="width: 20%">日</span>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="5.重诊监护" prop="fhlzz">
                    <el-input
                      ref="fhlzz"
                      v-model="formList.fhlzz"
                      size="mini"
                      placeholder="重诊监护"
                      style="width:80%;"
                    ></el-input>
                    <span style="width: 20%">小时</span>
                  </el-form-item>
                </div>
                <div class="hearder_item">
                  <el-form-item label="6.特殊护理" prop="fhlts">
                    <el-input
                      ref="fhlts"
                      v-model="formList.fhlts"
                      size="mini"
                      placeholder="特殊护理"
                      style="width:80%;"
                    ></el-input>
                    <span style="width: 20%">日</span>
                  </el-form-item>
                </div>
                <div class="hearder_item"></div>
                <div class="hearder_item"></div>
              </div>
            </el-form>
          </div>
          <!-- 说明 -->
          <div class="basicMess_foot">
            <div class="main_hearder_items">
              提示：病例分型：A一般 B急 C疑难 D危重
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  /*符合情况录入*/ postAddComplianceInformation,
  getBlfxList,
  getDiagnoseList,
  getClinicList,
  getBloodList,
  getRhList,
  getDoctorList,
  getMedicalQualityList
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
      isSwitch: false,
      //HBsAb、HCV-Ab、HIV-Ab
      fhbsagList: [
        {
          label: "未做",
          value: "0"
        },
        {
          label: "阴性",
          value: "1"
        },
        {
          label: "阳性",
          value: "2"
        }
      ],
      //病例分型
      fjbfxList: [],
      //临床路径病例
      fycljList: [
        { label: "是", value: "1" },
        { label: "否", value: "2" }
      ],
      //病理诊断
      fphzdList: [],
      //门诊与出院/临床与病理
      fmzcyaccoList: [],
      //药物过敏/输血反应/输液反应
      fifgmywList: [
        { label: "无", value: "1" },
        { label: "有", value: "2" }
      ],
      //血型
      fbloodList: [],
      //RH
      frhList: [],
      //医生
      docList: [],
      //科主任
      fkzrList: [],
      //主任（副主任）医师
      fzrdoctList: [],
      //主治医师
      fzzdoctList: [],
      //住院医师
      fzydoctList: [],
      //责任护士
      fzrnurseList: [],
      //进修医师
      fjxdoctList: [],
      //实习医师
      fsxdoctList: [],
      //质控医师
      fzkdoctList: [],
      //质控护士
      fzknurseList: [],
      //病案质量
      fqualityList: [],
      formList: {
        //HBsAb
        fhbsagbh: "0",
        //HCV-Ab
        fhcvabbh: "0",
        //HIV-Ab
        fhivabbh: "0",
        //是否尸检
        fbodybh: false,
        //病例分型
        fjbfxbh: "",
        //临床路径病例
        fycljbh: "",
        //抢救次数
        fqjtimes: "",
        //成功次数
        fqjsuctimes: "",
        //病理诊断
        fphzd: "",
        //病理诊断编码
        fphzdcode: "",
        //病理号
        fphzdnum: "",
        //门诊与出院
        fmzcyaccobh: "",
        //入院与出院
        frycyaccobh: "",
        //术前与术后
        fsqshaccobh: "",
        //临床与病理
        flcblaccobh: "",
        //放射与病理
        ffsblaccobh: "",
        //药物过敏
        fifgmyw: "",
        //过敏药物
        fgmyw: "",
        //血型
        fblood: "",
        //Rh
        frhbh: "",
        //输血反应
        fsxfybh: "",
        //输液反应
        fsyfybh: "",
        //科主任
        fkzrbh: "",
        //主任（副主任）医师
        fzrdoctbh: "",
        //主治医师
        fzzdoctbh: "",
        //住院医师
        fzydoctbh: "",
        //责任护士
        fzrnursebh: "",
        //进修医师
        fjxdoctbh: "",
        //实习医师
        fsxdoctbh: "",
        //编码员
        fbmybh: "",
        //病案质量
        fqualitybh: "",
        //质控医师
        fzkdoctbh: "",
        //质控护士
        fzknursebh: "",
        //质控日期
        fzkrq: "",
        //输血品种 红细胞
        fredcell: "",
        //输血品种 血小板
        fplaque: "",
        //输血品种 血浆
        fserous: "",
        //输血品种 全血
        fallblood: "",
        //输血品种 其他
        fotherblood: "",
        //院际会诊
        fhzyj: "",
        //远程会诊
        fhzyc: "",
        //护理等级 特级
        fhltj: "",
        //护理等级 I级护理
        fhl1: "",
        //护理等级 II级护理
        fhl2: "",
        //护理等级 III级护理
        fhl3: "",
        //护理等级 重诊监护
        fhlzz: "",
        //护理等级 特殊护理
        fhlts: ""
      },
      rules: {
        fjbfxbh: [
          { required: true, message: "病例分型为必填项", trigger: "change" }
        ],
        fmzcyaccobh: [
          { required: true, message: "门诊与出院为必填项", trigger: "change" }
        ],
        frycyaccobh: [
          { required: true, message: "入院与出院为必填项", trigger: "change" }
        ],
        fblood: [
          { required: true, message: "血型为必填项", trigger: "change" }
        ],
        fkzrbh: [
          { required: true, message: "科主任为必填项", trigger: "change" }
        ],
        fzrdoctbh: [
          {
            required: true,
            message: "主任（副主任）医师为必填项",
            trigger: "change"
          }
        ],
        fzzdoctbh: [
          { required: true, message: "主治医师为必填项", trigger: "change" }
        ],
        fzydoctbh: [
          { required: true, message: "住院医师为必填项", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getFjbfxList();
    this.getFphzdList();
    this.getfmzcyaccoList();
    this.getFbloodList();
    this.getFrhList();
    this.getFqualityList();
    this.getDoctor();
  },
  methods: {
    //病例分型
    getFjbfxList(val) {
      let data = {
        dictCode: val
      };
      getBlfxList(data).then(res => {
        console.log(res, "病例分型");
        this.fjbfxList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fjbfxList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
          setTimeout(() => {
            this.formList.fjbfxbh = this.fjbfxList[0].value;
          }, 200);
        } else {
          this.fjbfxList = [];
          this.formList.fjbfxbh = "";
        }
      });
    },
    //病理诊断
    getFphzdList(val) {
      let data = {
        fzjc: val,
        type: this.isSwitch ? 1 : 2
      };
      getDiagnoseList(data).then(res => {
        console.log(res, "病理诊断");
        this.fphzdList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fphzdList.push({
              label: item.icdmName,
              value: item.icdm,
              code: item.fzjc,
              type: item.type
            });
          });
        } else {
          this.fphzdList = [];
        }
      });
    },
    //门诊与出院/临床与病理
    getfmzcyaccoList(val) {
      let data = {
        dictCode: val
      };
      getClinicList(data).then(res => {
        console.log(res, "门诊与出院/临床与病理");
        this.fmzcyaccoList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fmzcyaccoList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.fmzcyaccoList = [];
        }
      });
    },
    //血型
    getFbloodList(val) {
      let data = {
        dictCode: val
      };
      getBloodList(data).then(res => {
        console.log(res, "血型");
        this.fbloodList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fbloodList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.fbloodList = [];
        }
      });
    },
    //RH
    getFrhList(val) {
      let data = {
        dictCode: val
      };
      getRhList(data).then(res => {
        console.log(res, "RH");
        this.frhList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.frhList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.frhList = [];
        }
      });
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
          //科主任
          this.fkzrList = this.docList;
          //主任（副主任）医师
          this.fzrdoctList = this.docList;
          //主治医师
          this.fzzdoctList = this.docList;
          //住院医师
          this.fzydoctList = this.docList;
          //责任护士
          this.fzrnurseList = this.docList;
          //进修医师
          this.fjxdoctList = this.docList;
          //实习医师
          this.fsxdoctList = this.docList;
          //质控医师
          this.fzkdoctList = this.docList;
          //质控护士
          this.fzknurseList = this.docList;
          //病案质量
          this.fqualityList = this.docList;
        } else {
          this.docList = [];
          //科主任
          this.fkzrList = [];
          //主任（副主任）医师
          this.fzrdoctList = [];
          //主治医师
          this.fzzdoctList = [];
          //住院医师
          this.fzydoctList = [];
          //责任护士
          this.fzrnurseList = [];
          //进修医师
          this.fjxdoctList = [];
          //实习医师
          this.fsxdoctList = [];
          //质控医师
          this.fzkdoctList = [];
          //质控护士
          this.fzknurseList = [];
          //病案质量
          this.fqualityList = [];
        }
      });
    },
    //各医生模糊查询
    handleDocQuery(val, arr) {
      if (val !== "") {
        this[arr] = this.docList.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(val) > -1
            );
          });
        });
      } else {
        this[arr] = this.docList;
      }
    },
    //病案质量
    getFqualityList(val) {
      let data = {
        dictCode: val
      };
      getMedicalQualityList(data).then(res => {
        console.log(res, "病案质量");
        this.fqualityList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fqualityList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.fqualityList = [];
        }
      });
    },
    handleFphzd(val) {
      console.log(val);
      this.fphzdList.forEach((items, indexs) => {
        if (val == items.value) {
          this.formList.fphzd = items.label;
        }
      });
      console.log(this.formList.fphzd);
    },
    // 切换诊断国家码/广东码
    handleSwitch(data) {
      console.log(data);
      this.isSwitch = data;
      this.getFphzdList();
    },
    // 校验按钮
    handleCheck(data) {
      console.log(data);
      this.$refs["formList"].validate(valid => {
        if (valid) {
          this.isSaves = false;
          console.log("submit!!", this.isSaves);
        } else {
          this.isSaves = true;
          console.log("error submit!!", this.isSaves);
          return false;
        }
      });
    },
    // 保存按钮
    handleSave(data) {
      console.log(data);
      let datas = {
        //病案号
        fprn: sessionStorage.fprn,
        //住院次数
        ftimes: sessionStorage.ftimes,
        //录入员
        userName: sessionStorage.userName,
        //录入日期
        newDate: sessionStorage.entryDate,
        //HBsAb
        fhbsagbh: this.formList.fhbsagbh,
        //HCV-Ab
        fhcvabbh: this.formList.fhcvabbh,
        //HIV-Ab
        fhivabbh: this.formList.fhivabbh,
        //是否尸检
        fbodybh: this.formList.fbodybh ? "1" : "2",
        //病例分型
        fjbfxbh: this.formList.fjbfxbh,
        //临床路径病例
        fycljbh: this.formList.fycljbh,
        //抢救次数
        fqjtimes: this.formList.fqjtimes,
        //成功次数
        fqjsuctimes: this.formList.fqjsuctimes,
        //病理诊断
        fphzd: this.formList.fphzd,
        //病理诊断编码
        fphzdcode: this.formList.fphzdcode,
        //病理号
        fphzdnum: this.formList.fphzdnum,
        //门诊与出院
        fmzcyaccobh: this.formList.fmzcyaccobh,
        //入院与出院
        frycyaccobh: this.formList.frycyaccobh,
        //术前与术后
        fsqshaccobh: this.formList.fsqshaccobh,
        //临床与病理
        flcblaccobh: this.formList.flcblaccobh,
        //放射与病理
        ffsblaccobh: this.formList.ffsblaccobh,
        //药物过敏
        fifgmyw: this.formList.fifgmyw,
        //过敏药物
        fgmyw: this.formList.fgmyw,
        //血型
        fblood: this.formList.fblood,
        //Rh
        frhbh: this.formList.frhbh,
        //输血反应
        fsxfybh: this.formList.fsxfybh,
        //输液反应
        fsyfybh: this.formList.fsyfybh,
        //科主任
        fkzrbh: this.formList.fkzrbh,
        //主任（副主任）医师
        fzrdoctbh: this.formList.fzrdoctbh,
        //主治医师
        fzzdoctbh: this.formList.fzzdoctbh,
        //住院医师
        fzydoctbh: this.formList.fzydoctbh,
        //责任护士
        fzrnursebh: this.formList.fzrnursebh,
        //进修医师
        fjxdoctbh: this.formList.fjxdoctbh,
        //实习医师
        fsxdoctbh: this.formList.fsxdoctbh,
        //编码员
        fbmybh: this.formList.fbmybh,
        //病案质量
        fqualitybh: this.formList.fqualitybh,
        //质控医师
        fzkdoctbh: this.formList.fzkdoctbh,
        //质控护士
        fzknursebh: this.formList.fzknursebh,
        //质控日期
        fzkrq: this.formList.fzkrq,
        //输血品种 红细胞
        fredcell: this.formList.fredcell,
        //输血品种 血小板
        fplaque: this.formList.fplaque,
        //输血品种 血浆
        fserous: this.formList.fserous,
        //输血品种 全血
        fallblood: this.formList.fallblood,
        //输血品种 其他
        fotherblood: this.formList.fotherblood,
        //院际会诊
        fhzyj: this.formList.fhzyj,
        //远程会诊
        fhzyc: this.formList.fhzyc,
        //护理等级 特级
        fhltj: this.formList.fhltj,
        //护理等级 I级护理
        fhl1: this.formList.fhl1,
        //护理等级 II级护理
        fhl2: this.formList.fhl2,
        //护理等级 III级护理
        fhl3: this.formList.fhl3,
        //护理等级 重诊监护
        fhlzz: this.formList.fhlzz,
        //护理等级 特殊护理
        fhlts: this.formList.fhlts
      };
      postAddComplianceInformation(this.$qs.stringify(datas)).then(res => {
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
.basicMess {
  height: 100%;
  font-size: 14px;
  color: #515355;
}
.hearder_items {
  height: 40px;
  line-height: 40px;
  margin: 0px 2px 10px 2px;
  padding: 10px 10px 10px 26px;
  display: flex;
  flex-direction: row;
  border-bottom: solid 1px #797979;
}
.demo-ruleForm {
  width: 100%;
}
/deep/ .el-form-item__label {
  width: 150px !important;
}
/deep/ .el-form-item__content {
  margin-left: 150px !important;
}
.el-form-item {
  margin-bottom: 0px !important;
}
.hearder_item {
  width: 24%;
  display: inline-block;
  margin-right: 8px;
}
.main_hearder_items {
  height: 40px;
  line-height: 40px;
  margin: 15px 0px 15px 0px;
  padding: 0px 10px 0px 15px;
  background-color: #f3f3f3;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
}
.hearder_content {
  text-align: center;
  width: 40%;
}
.main_hearder_content {
  width: 40%;
  text-align: center;
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
