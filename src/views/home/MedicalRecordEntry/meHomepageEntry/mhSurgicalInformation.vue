<template>
  <!-- 手术信息 -->
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
          <el-row :gutter="3">
            <el-col :span="2"
              ><div class="grid-content bg-purple">手术及操作日期</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content bg-purple">手术及操作名称</div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple">手术及操作编码</div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple">手术级别</div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple">择期手术</div></el-col
            >
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-col :span="8"
                  ><div class="grid-content bg-purple">术者</div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">I助</div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">II助</div></el-col
                >
              </div>
            </el-col>
            <el-col :span="1"
              ><div class="grid-content bg-purple">切口</div></el-col
            >
            <el-col :span="1"
              ><div class="grid-content bg-purple">愈合</div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple">麻醉方式</div></el-col
            >
            <el-col :span="2"
              ><div class="grid-content bg-purple">麻醉医师</div></el-col
            >
          </el-row>
          <el-form
            :model="formList"
            :rules="rules"
            ref="formList"
            class="demo-ruleForm"
          >
            <el-row
              :gutter="3"
              v-for="(item, index) in formList.List"
              :key="index"
            >
              <el-col :span="2"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fopdate' + index">
                    <el-date-picker
                      v-model="formList.List[index].fopdate"
                      :id="'fopdate' + index"
                      :ref="'fopdate' + index"
                      type="date"
                      size="mini"
                      :editable="true"
                      format="yyyy-MM-dd"
                      placeholder="yyyy-MM-dd"
                      title="选择日期yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item></div
              ></el-col>
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fopcode' + index">
                    <el-select
                      v-model="formList.List[index].fopcode"
                      size="mini"
                      :ref="'fopcode' + index"
                      filterable
                      clearable
                      placeholder="请选择手术及操作名称"
                      style="width: 95%;"
                      @change="query => handleFop(query, index)"
                    >
                      <el-option
                        v-for="(items, indexs) in formList.List[index].fopList"
                        :key="'options' + index + 'key' + indexs"
                        :label="items.label"
                        :value="items.value"
                        style="text-align: right"
                      >
                        <div>
                          <span style="text-align: left;">{{
                            items.label
                          }}</span>
                          <span style="padding-left: 20px;">{{
                            items.value
                          }}</span>
                          <span style="padding-left: 20px;">{{
                            items.code
                          }}</span>
                        </div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div></el-col
              >
              <el-col :span="2"
                ><div class="grid-content bg-purple">
                  <el-form-item>
                    <el-input
                      disabled
                      v-model="formList.List[index].fopcode"
                      size="mini"
                      placeholder="请填写手术及操作编码"
                    ></el-input>
                  </el-form-item></div
              ></el-col>
              <el-col :span="2"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fssjbbh' + index">
                    <el-select
                      v-model="formList.List[index].fssjbbh"
                      :id="'fssjbbh' + index"
                      :ref="'fssjbbh' + index"
                      filterable
                      clearable
                      style="width: 90%;"
                      size="mini"
                      placeholder="手术级别"
                    >
                      <el-option
                        v-for="(items, indexs) in formList.List[index]
                          .fssjbList"
                        :key="indexs"
                        :label="items.label"
                        :value="items.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item></div
              ></el-col>
              <el-col :span="2"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fzqssbh' + index">
                    <el-select
                      v-model="formList.List[index].fzqssbh"
                      :id="'fzqssbh' + index"
                      :ref="'fzqssbh' + index"
                      filterable
                      clearable
                      style="width: 90%;"
                      size="mini"
                      placeholder="择期手术"
                    >
                      <el-option
                        v-for="(item, index) in formList.List[index].fzqssList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item></div
              ></el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple">
                  <el-col :span="8"
                    ><div class="grid-content bg-purple">
                      <el-form-item :prop="'fdocbh' + index"
                        ><el-select
                          v-model="formList.List[index].fdocbh"
                          :id="'fdocbh' + index"
                          :ref="'fdocbh' + index"
                          filterable
                          clearable
                          style="width: 90%;"
                          size="mini"
                          placeholder="术者"
                          :filter-method="
                            query => handleDocQuery(query, index, 'fdocList')
                          "
                        >
                          <el-option
                            v-for="(items, indexs) in formList.List[index]
                              .fdocList"
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
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div class="grid-content bg-purple">
                      <el-form-item :prop="'fopdoct1bh' + index">
                        <el-select
                          v-model="formList.List[index].fopdoct1bh"
                          :id="'fopdoct1bh' + index"
                          :ref="'fopdoct1bh' + index"
                          filterable
                          clearable
                          style="width: 90%;"
                          size="mini"
                          placeholder="I助"
                          :filter-method="
                            query => handleDocQuery(query, index, 'fdoc1List')
                          "
                        >
                          <el-option
                            v-for="(items, indexs) in formList.List[index]
                              .fdoc1List"
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
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div class="grid-content bg-purple">
                      <el-form-item :prop="'fopdoct2bh' + index">
                        <el-select
                          v-model="formList.List[index].fopdoct2bh"
                          :id="'fopdoct2bh' + index"
                          :ref="'fopdoct2bh' + index"
                          filterable
                          clearable
                          style="width: 90%;"
                          size="mini"
                          placeholder="II助"
                          :filter-method="
                            query => handleDocQuery(query, index, 'fdoc2List')
                          "
                        >
                          <el-option
                            v-for="(items, indexs) in formList.List[index]
                              .fdoc2List"
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
                    </div></el-col
                  >
                </div>
              </el-col>
              <el-col :span="1"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fqiekoubh' + index">
                    <el-select
                      v-model="formList.List[index].fqiekoubh"
                      :id="'fqiekoubh' + index"
                      :ref="'fqiekoubh' + index"
                      filterable
                      clearable
                      style="width: 90%;"
                      size="mini"
                      placeholder="切口"
                    >
                      <el-option
                        v-for="(item, index) in formList.List[index]
                          .fqiekouList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        style="text-align: center"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item></div
              ></el-col>
              <el-col :span="1"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fyuhebh' + index">
                    <el-select
                      v-model="formList.List[index].fyuhebh"
                      :id="'fyuhebh' + index"
                      :ref="'fyuhebh' + index"
                      filterable
                      clearable
                      style="width: 90%;"
                      size="mini"
                      placeholder="愈合"
                    >
                      <el-option
                        v-for="(item, index) in formList.List[index].fyuheList"
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
                  <el-form-item :prop="'fmazuibh' + index">
                    <el-select
                      v-model="formList.List[index].fmazuibh"
                      :id="'fmazuibh' + index"
                      :ref="'fmazuibh' + index"
                      filterable
                      clearable
                      style="width: 90%;"
                      size="mini"
                      placeholder="麻醉方式"
                    >
                      <el-option
                        v-for="(items, indexs) in formList.List[index]
                          .fmazuiList"
                        :key="indexs"
                        :label="items.label"
                        :value="items.value"
                        style="text-align: center"
                      >
                        <span style="float: left">{{ items.label }}</span>
                        <span
                          style="float: right; color: #8492a6;padding-left: 5px; font-size: 13px"
                          >{{ items.code }}</span
                        >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="2"
                ><div class="grid-content bg-purple">
                  <el-form-item :prop="'fmzdoctbh' + index">
                    <el-select
                      v-model="formList.List[index].fmzdoctbh"
                      :id="'fmzdoctbh' + index"
                      :ref="'fmzdoctbh' + index"
                      filterable
                      clearable
                      style="width: 90%;"
                      size="mini"
                      placeholder="麻醉医师"
                      :filter-method="
                        query => handleDocQuery(query, index, 'fmzdoctList')
                      "
                    >
                      <el-option
                        v-for="(items, indexs) in formList.List[index]
                          .fmzdoctList"
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
                </div></el-col
              >
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

            <!-- <el-table
              :data="operation"
              max-height="410"
              stripe
              border
              style="margin-top:50px; width: 100%;  margin:0 auto; "
              ref="scrollTable"
              :resizable="true"
            >
              <el-table-column
                prop="fopcode"
                label="手术及操作日期"
                width="210"
                align="center"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.fopcode"
                    type="date"
                    size="mini"
                    :editable="true"
                    format="yyyy.MM.dd"
                    placeholder="选择日期yyyy.MM.dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                prop="fopdate"
                label="手术及操作编码"
                width="160"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <el-autocomplete
                    size="mini"
                    @focus="handleFocus(scope.$index)"
                    :fetch-suggestions="querySearchAsync"
                    v-model="scope.row.fopdate"
                    :trigger-on-focus="false"
                    @select="handleSelectSh"
                    class="main_header_content"
                    style="width: 95%"
                  ></el-autocomplete>
                </template>
              </el-table-column>
              <el-table-column
                prop="fmmc"
                label="手术及操作名称"
                :show-overflow-tooltip="true"
                width="230"
                align="center"
              >
                <template slot-scope="scope">
                  <el-autocomplete
                    size="mini"
                    v-model="scope.row.fmmc"
                    :trigger-on-focus="false"
                    @select="handleSelectSh"
                    :fetch-suggestions="querySearchAsync2"
                    style="width: 95%"
                  ></el-autocomplete>
                </template>
              </el-table-column>
              <el-table-column
                prop="fssjb"
                label="手术级别"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.fssjb"
                    filterable
                    clearable
                    size="mini"
                    placeholder="手术级别"
                  >
                    <el-option
                      label="一级手术"
                      value="1"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="二级手术"
                      value="2"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="三级手术"
                      value="3"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="四级手术"
                      value="4"
                      style="text-align: center"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="fop"
                label="择期手术"
                width="120"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.fop"
                    clearable
                    filterable
                    size="mini"
                    placeholder="择期手术"
                  >
                    <el-option label="是" value="1" style="text-align: center">
                    </el-option>
                    <el-option label="否" value="2" style="text-align: center">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="手术及操作医师" align="center">
                <el-table-column
                  prop="fdocname"
                  label="术者"
                  width="110"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input
                      size="mini"
                      v-model="scope.row.fdocname"
                      class="main_header_content"
                      style="width: 95%"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="fopdoct1"
                  label="I助"
                  width="110"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input
                      size="mini"
                      v-model="scope.row.fopdoct1"
                      class="main_header_content"
                      style="width: 95%"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="fopdoct2"
                  label="II助"
                  width="110"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input
                      size="mini"
                      v-model="scope.row.fopdoct2"
                      class="main_header_content"
                      style="width: 95%"
                    />
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                prop="fyuhe"
                label="切口/愈合"
                width="220"
                align="center"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.fsk"
                    filterable
                    clearable
                    size="mini"
                    style="width: 45%"
                    placeholder="切口"
                  >
                    <el-option label="0类" value="1" style="text-align: center">
                    </el-option>
                    <el-option label="I" value="2" style="text-align: center">
                    </el-option>
                    <el-option label="II" value="3" style="text-align: center">
                    </el-option>
                    <el-option label="III" value="4" style="text-align: center">
                    </el-option>
                  </el-select>
                  /
                  <el-select
                    v-model="scope.row.fyuhe"
                    filterable
                    clearable
                    size="mini"
                    style="width: 45%"
                    placeholder="愈合"
                  >
                    <el-option label="甲" value="1" style="text-align: center">
                    </el-option>
                    <el-option label="乙" value="2" style="text-align: center">
                    </el-option>
                    <el-option label="丙" value="3" style="text-align: center">
                    </el-option>
                    <el-option
                      label="其它"
                      value="4"
                      style="text-align: center"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="fmazui"
                label="麻醉方式"
                width="140"
                align="center"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.fmazui"
                    filterable
                    clearable
                    size="mini"
                    placeholder="麻醉方式"
                  >
                    <el-option
                      label="全麻"
                      value="1"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="硬外"
                      value="2"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="基础麻"
                      value="3"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="基麻+局麻"
                      value="4"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="局麻"
                      value="5"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="腰麻"
                      value="6"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="肱麻"
                      value="7"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="臂丛"
                      value="8"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="颈丛"
                      value="9"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="表麻"
                      value="10"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="静脉麻"
                      value="11"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="气管麻"
                      value="12"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="插管全麻"
                      value="13"
                      style="text-align: center"
                    >
                    </el-option>
                    <el-option
                      label="其它"
                      value="14"
                      style="text-align: center"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="fmzdoct"
                label="麻醉医师"
                width="100"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.fmzdoct"
                    class="main_header_content"
                    style="width: 95%"
                  />
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="55">
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="删除该条诊断"
                    placement="bottom"
                    align="center"
                  >
                    <i
                      class="el-icon-delete"
                      @click="openDelL(scope.$index)"
                      style="cursor: pointer"
                    ></i>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table> -->
            <div class="main_hearder_items">
              <div class="hearder_item" style="width:30%">
                <el-form-item label="离院方式" prop="flyfsbh" id="form_item">
                  <el-select
                    v-model="formList.flyfsbh"
                    ref="flyfsbh"
                    size="mini"
                    filterable
                    clearable
                    placeholder="离院方式"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item, index) in formList.flyfsList"
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
                <el-form-item
                  label="拟接收医疗机构名称"
                  v-if="formList.flyfsbh == 2 || formList.flyfsbh == 3"
                  :prop="formList.flyfsbh == 2 ? 'fyzzyname' : 'fyzzsqname'"
                  id="form_item1"
                >
                  <el-input
                    v-if="formList.flyfsbh == 2"
                    ref="fyzzyname"
                    v-model="formList.fyzzyname"
                    clearable
                    size="mini"
                  ></el-input>
                  <el-input
                    v-if="formList.flyfsbh == 3"
                    ref="fyzzsqname"
                    v-model="formList.fyzzsqname"
                    clearable
                    size="mini"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="main_hearder_items">
              <div class="hearder_item" style="width: 35%">
                <el-form-item
                  label="是否有出院31天再住院计划"
                  prop="fisagainrybh"
                  id="form_item2"
                >
                  <el-select
                    v-model="formList.fisagainrybh"
                    filterable
                    clearable
                    size="mini"
                    style="width: 45%"
                    placeholder="请选择"
                    @change="handleFisagainry"
                  >
                    <el-option
                      v-for="(item, index) in formList.fisagainryList"
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
                <el-form-item
                  label="再住院目的"
                  prop="fpurpose"
                  id="form_item3"
                >
                  <el-input
                    :disabled="formList.fisagainrybh != 2"
                    ref="fpurpose"
                    v-model="formList.fpurpose"
                    size="mini"
                    style="95%"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="main_hearder_items">
              <div class="hearder_item" style="width: 35%">
                <el-form-item
                  label="颅脑损伤患者昏迷时间:"
                  prop="fryqhmdays"
                  id="form_item4"
                >
                  入院前
                  <el-input
                    ref="fryqhmdays"
                    v-model="formList.fryqhmdays"
                    size="mini"
                    style="width: 18%"
                  ></el-input>
                  天
                  <el-input
                    ref="fryqhmhours"
                    v-model="formList.fryqhmhours"
                    size="mini"
                    style="width: 18%"
                  ></el-input>
                  时
                  <el-input
                    ref="fryqhmmins"
                    v-model="formList.fryqhmmins"
                    size="mini"
                    style="width: 18%"
                  ></el-input>
                  分钟
                </el-form-item>
              </div>
              <div class="hearder_item" style="width: 35%">
                <el-form-item label="入院后" prop="fryhmdays" id="form_item5">
                  <el-input
                    ref="fryhmdays"
                    v-model="formList.fryhmdays"
                    size="mini"
                    style="width: 18%"
                  ></el-input>
                  天
                  <el-input
                    ref="fryhmhours"
                    v-model="formList.fryhmhours"
                    size="mini"
                    style="width: 18%"
                  ></el-input>
                  时
                  <el-input
                    ref="fryhmmins"
                    v-model="formList.fryhmmins"
                    size="mini"
                    style="width: 18%"
                  ></el-input>
                  分钟
                </el-form-item>
              </div>
            </div>
            <div class="main_hearder_items">
              <div class="hearder_item" style="width:50%">
                <el-form-item
                  label="部分病种"
                  prop="fsomediseases"
                  id="form_item6"
                >
                  <el-select
                    v-model="formList.fsomediseases"
                    filterable
                    clearable
                    size="mini"
                    style="width: 31%"
                    placeholder="部分病种"
                  >
                    <el-option label="否" value="2" style="text-align: center">
                    </el-option>
                    <el-option label="是" value="1" style="text-align: center">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <!-- 说明 -->
        <div class="basicMess_foot">
          <div class="main_hearder_items">
            说明：手术编码强制输入
            ，手术等级强制输入，手术及操作医师强制输入，择期手术强制录入
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EntryButton from "@/components/EntryButton";
import {
  postAddOperation,
  getOperationList,
  getSsjbList,
  getDoctorList,
  getQKDJList,
  getYhList,
  getMzList,
  getPlyfsLsit
} from "@/api";
export default {
  components: {
    EntryButton
  },
  data() {
    var validateSsxx = (rule, value, callback) => {
      console.log(rule, value, callback);
      let listLength = Number(rule.field.substr(rule.field.length - 1, 1));
      if (
        this.formList.List[listLength].fopdate &&
        this.formList.List[listLength].fopcode &&
        this.formList.List[listLength].fssjbbh &&
        this.formList.List[listLength].fdocbh &&
        this.formList.List[listLength].fzqssbh
      ) {
        callback();
      } else if (
        this.formList.List[listLength].fopdate ||
        this.formList.List[listLength].fopcode ||
        this.formList.List[listLength].fssjbbh ||
        this.formList.List[listLength].fdocbh ||
        this.formList.List[listLength].fzqssbh
      ) {
        callback(new Error("请填写完整手术信息！"));
      } else {
        callback();
      }
    };
    var validateFyzzyname = (rule, value, callback) => {
      console.log(rule, value, callback);
      if (
        (this.formList.flyfsbh == 2 || this.formList.flyfsbh == 3) &&
        !value
      ) {
        callback(new Error("请填写拟接收医疗机构名称！"));
      } else {
        callback();
      }
    };
    var validateFpurpose = (rule, value, callback) => {
      console.log(rule, value, callback);
      if (this.formList.fisagainrybh == 2 && !value) {
        callback(new Error("请填写再住院目的！"));
      } else {
        callback();
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
      deptObj: {
        fopList0: [],
        List0: []
      },
      //手术及操作名称
      fopsList: [],
      //医生名称
      docList: [],
      formList: {
        List: [
          {
            //手术及操作日期
            fopdate: "",
            //手术及操作名称
            fop: "",
            //手术及操作编码
            fopcode: "",
            fopList: [],
            //手术级别
            fssjbbh: "",
            fssjbList: [],
            //择期手术
            fzqssbh: "",
            fzqssList: [
              {
                label: "是",
                value: 1
              },
              {
                label: "否",
                value: 2
              }
            ],
            //术者
            fdocbh: "",
            fdocList: [],
            //I助
            fopdoct1bh: "",
            fdoc1List: [],
            //II助
            fopdoct2bh: "",
            fdoc2List: [],
            //切口
            fqiekoubh: "",
            fqiekouList: [],
            //愈合
            fyuhebh: "",
            fyuheList: [],
            //麻醉方式
            fmazuibh: "",
            fmazuiList: [],
            //麻醉医师
            fmzdoctbh: "",
            fmzdoctList: []
          }
        ],
        //离院方式
        flyfsbh: "",
        flyfsList: [],
        //离院方式= 医嘱转院 => 拟接收医疗机构名称
        fyzzyname: "",
        //离院方式= 医嘱转社区卫生服务机构/乡镇卫生院 => 拟接收医疗机构名称
        fyzzsqname: "",
        //是否有出院31天再住院计划
        fisagainrybh: "1",
        fisagainryList: [
          {
            label: "无",
            value: "1"
          },
          {
            label: "有",
            value: "2"
          }
        ],
        //再住院目的
        fpurpose: "",
        //颅脑损伤患者昏迷时间入院前>天
        fryqhmdays: "",
        //颅脑损伤患者昏迷时间入院前>时
        fryqhmhours: "",
        //颅脑损伤患者昏迷时间入院前>分钟
        fryqhmmins: "",
        //颅脑损伤患者昏迷时间入院后>天
        fryhmdays: "",
        //颅脑损伤患者昏迷时间入院后>时
        fryhmhours: "",
        //颅脑损伤患者昏迷时间入院后>分钟
        fryhmmins: "",
        //部分病种
        fsomediseases: ""
      },
      //用来动态生成手术信息校验规则
      validateSsxxs: validateSsxx,
      rules: {
        //手术及操作日期
        fopdate0: [
          {
            validator: validateSsxx,
            trigger: "change"
          }
        ],
        //手术及操作编码
        fopcode0: [
          {
            validator: validateSsxx,
            trigger: "change"
          }
        ],
        //手术级别
        fssjbbh0: [
          {
            validator: validateSsxx,
            trigger: "change"
          }
        ],
        //择期手术
        fzqssbh0: [
          {
            validator: validateSsxx,
            trigger: "change"
          }
        ],
        //术者
        fdocbh0: [
          {
            validator: validateSsxx,
            trigger: "change"
          }
        ],
        //I助
        fopdoct1bh0: [
          {
            validator: validateSsxx,
            trigger: "change"
          }
        ],
        //II助
        fopdoct2bh0: [
          {
            validator: validateSsxx,
            trigger: "change"
          }
        ],
        //切口
        fqiekoubh0: [
          {
            validator: validateSsxx,
            trigger: "change"
          }
        ],
        //愈合
        fyuhebh0: [
          {
            validator: validateSsxx,
            trigger: "change"
          }
        ],
        //麻醉方式
        fmazuibh0: [
          {
            validator: validateSsxx,
            trigger: "change"
          }
        ],
        //麻醉医师
        fmzdoctbh0: [
          {
            validator: validateSsxx,
            trigger: "change"
          }
        ],
        //离院方式
        flyfsbh: [
          { required: true, message: "离院方式不能为空!", trigger: "change" }
        ],
        //离院方式= 医嘱转院 => 拟接收医疗机构名称
        fyzzyname: [
          { required: true, validator: validateFyzzyname, trigger: "change" }
        ],
        //离院方式= 医嘱转社区卫生服务机构/乡镇卫生院 => 拟接收医疗机构名称
        fyzzsqname: [
          { required: true, validator: validateFyzzyname, trigger: "change" }
        ],
        //再住院目的
        fpurpose: [{ validator: validateFpurpose, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getFopsList();
    this.getFssjbList();
    this.getFdoctorList();
    this.getFqiekouList();
    this.getFyuheList();
    this.getFmazuiList();
    this.getFlyfsList();
  },
  mounted() {},
  methods: {
    //手术码
    getFopsList(val) {
      let data = {
        fzjc: val
      };
      getOperationList(data).then(res => {
        console.log(res, "手术码");
        this.fopsList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.fopsList.push({
              label: item.fop,
              value: item.fopcode,
              code: item.fzjc
            });
          });
          this.formList.List[0].fopList = this.fopsList;
        } else {
          this.fopsList = [];
          this.formList.List[0].fopList = [];
          //   this.formList.List[0].fopList = [];
        }
      });
    },
    //手术码通过value拿label
    handleFop(val, index) {
      console.log(val, index);
      this.fopsList.forEach((items, indexs) => {
        if (val == items.value) {
          this.formList.List[index].fop = items.label;
        }
      });
      console.log(this.formList.List[index].fop);
    },
    //手术级别
    getFssjbList(val) {
      let data = {
        dictCode: val
      };
      getSsjbList(data).then(res => {
        console.log(res, "手术级别");
        this.formList.List[0].fssjbList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.List[0].fssjbList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.List[0].fssjbList = [];
        }
      });
    },
    //医生
    getFdoctorList(val) {
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
          this.formList.List[0].fdocList = this.docList;
          this.formList.List[0].fdoc1List = this.docList;
          this.formList.List[0].fdoc2List = this.docList;
          this.formList.List[0].fmzdoctList = this.docList;
        } else {
          this.docList = [];
          this.formList.List[0].fdocList = [];
          this.formList.List[0].fdoc1List = [];
          this.formList.List[0].fdoc2List = [];
          this.formList.List[0].fmzdoctList = [];
        }
      });
    },
    //各医生模糊查询
    handleDocQuery(val, index, arr) {
      if (val !== "") {
        this.formList.List[index][arr] = this.docList.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(val) > -1
            );
          });
        });
      } else {
        this.formList.List[index][arr] = this.docList;
      }
    },
    //切口
    getFqiekouList(val) {
      let data = {
        dictCode: val
      };
      getQKDJList(data).then(res => {
        console.log(res, "切口");
        this.formList.List[0].fqiekouList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.List[0].fqiekouList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.List[0].fqiekouList = [];
        }
      });
    },
    //愈合
    getFyuheList(val) {
      let data = {
        dictCode: val
      };
      getYhList(data).then(res => {
        console.log(res, "愈合");
        this.formList.List[0].fyuheList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.List[0].fyuheList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.List[0].fyuheList = [];
        }
      });
    },
    //麻醉方式
    getFmazuiList(val) {
      let data = {
        dictCode: val
      };
      getMzList(data).then(res => {
        console.log(res, "麻醉方式");
        this.formList.List[0].fmazuiList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.List[0].fmazuiList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.List[0].fmazuiList = [];
        }
      });
    },
    //离院方式
    getFlyfsList(val) {
      let data = {
        dictCode: val
      };
      getPlyfsLsit(data).then(res => {
        console.log(res, "离院方式");
        this.formList.flyfsList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.formList.flyfsList.push({
              label: item.dictName,
              value: item.dictValue,
              code: item.dictCode
            });
          });
        } else {
          this.formList.flyfsList = [];
        }
      });
    },
    //是否有出院31天再住院计划为无时 清空再住院目的
    handleFisagainry(val) {
      if (val == "1") {
        this.formList.fpurpose = "";
      }
    },
    //添加多个getPlyfsLsit
    addDomain() {
      this.formList.List.push({
        //手术及操作日期
        fopdate: "",
        //手术及操作名称
        fopcode: "",
        //手术及操作编码
        fop: "",
        fopList: this.fopsList,
        //手术级别
        fssjbbh: "",
        fssjbList: this.formList.List[0].fssjbList,
        //择期手术
        fzqssbh: "",
        fzqssList: [
          {
            label: "是",
            value: 1
          },
          {
            label: "否",
            value: 2
          }
        ],
        //术者
        fdocbh: "",
        fdocList: this.docList,
        //I助
        fopdoct1bh: "",
        fdoc1List: this.docList,
        //II助
        fopdoct2bh: "",
        fdoc2List: this.docList,
        //切口
        fqiekoubh: "",
        fqiekouList: this.formList.List[0].fqiekouList,
        //愈合
        fyuhebh: "",
        fyuheList: this.formList.List[0].fyuheList,
        //麻醉方式
        fmazuibh: "",
        fmazuiList: this.formList.List[0].fmazuiList,
        //麻醉医师
        fmzdoctbh: "",
        fmzdoctList: this.docList
      });
      //手术及操作日期
      this.rules["fopdate" + (this.formList.List.length - 1)] = [
        {
          validator: this.validateSsxxs,
          trigger: '["change", "blur"]'
        }
      ];
      //手术及操作编码
      this.rules["fopcode" + (this.formList.List.length - 1)] = [
        {
          validator: this.validateSsxxs,
          trigger: '["change", "blur"]'
        }
      ];
      //手术级别
      this.rules["fssjbbh" + (this.formList.List.length - 1)] = [
        {
          validator: this.validateSsxxs,
          trigger: '["change", "blur"]'
        }
      ];
      //择期手术
      this.rules["fzqssbh" + (this.formList.List.length - 1)] = [
        {
          validator: this.validateSsxxs,
          trigger: '["change", "blur"]'
        }
      ];
      //术者
      this.rules["fdocbh" + (this.formList.List.length - 1)] = [
        {
          validator: this.validateSsxxs,
          trigger: '["change", "blur"]'
        }
      ];
      //I助
      this.rules["fopdoct1bh" + (this.formList.List.length - 1)] = [
        {
          validator: this.validateSsxxs,
          trigger: '["change", "blur"]'
        }
      ];
      //II助
      this.rules["fopdoct2bh" + (this.formList.List.length - 1)] = [
        {
          validator: this.validateSsxxs,
          trigger: '["change", "blur"]'
        }
      ];
      //切口
      this.rules["fqiekoubh" + (this.formList.List.length - 1)] = [
        {
          validator: this.validateSsxxs,
          trigger: '["change", "blur"]'
        }
      ];
      //愈合
      this.rules["fyuhebh" + (this.formList.List.length - 1)] = [
        {
          validator: this.validateSsxxs,
          trigger: '["change", "blur"]'
        }
      ];
      //麻醉方式
      this.rules["fmazuibh" + (this.formList.List.length - 1)] = [
        {
          validator: this.validateSsxxs,
          trigger: '["change", "blur"]'
        }
      ];
      //麻醉医师
      this.rules["fmzdoctbh" + (this.formList.List.length - 1)] = [
        {
          validator: this.validateSsxxs,
          trigger: '["change", "blur"]'
        }
      ];

      console.log(this.formList.List, this.formList.List.length, this.rules);
    },
    //删除数据
    removeDomain(item) {
      let index = this.formList.List.indexOf(item);
      if (index !== -1) {
        this.formList.List.splice(index, 1);
      }
      console.log(this.formList.List, this.formList);
    },
    // 校验按钮
    handleCheck(data) {
      console.log(data);
      this.$refs["formList"].validate((valid, value) => {
        console.log(valid, value, "111");
        if (valid) {
          console.log(this.formList.fisagainrybh, this.formList.fsomediseases);
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
      console.log(this.formList.List[0].fopdate);
      let operation = [];
      if (this.formList.List[0].fopdate) {
        let arr = JSON.parse(JSON.stringify(this.formList.List));
        operation = arr.filter(
          item =>
            delete item.fopList &&
            delete item.fssjbList &&
            delete item.fzqssList &&
            delete item.fdocList &&
            delete item.fdoc1List &&
            delete item.fdoc2List &&
            delete item.fqiekouList &&
            delete item.fyuheList &&
            delete item.fmazuiList &&
            delete item.fmzdoctList
        );
      } else {
        operation = [];
      }
      let datas = {
        //病案号
        fprn: sessionStorage.fprn,
        //住院次数
        ftimes: sessionStorage.ftimes,
        //录入员
        userName: sessionStorage.userName,
        //录入日期
        newDate: sessionStorage.entryDate,
        //手术信息
        operation: JSON.stringify(operation),
        //离院方式
        flyfsbh: this.formList.flyfsbh,
        //离院方式= 医嘱转院 => 拟接收医疗机构名称
        fyzzyname: this.formList.fyzzyname,
        //离院方式= 医嘱转社区卫生服务机构/乡镇卫生院 => 拟接收医疗机构名称
        fyzzsqname: this.formList.fyzzsqname,
        //是否有出院31天再住院计划
        fisagainrybh: this.formList.fisagainrybh,
        //再住院目的
        fpurpose: this.formList.fpurpose,
        //颅脑损伤患者昏迷时间入院前>天
        fryqhmdays: this.formList.fryqhmdays,
        //颅脑损伤患者昏迷时间入院前>时
        fryqhmhours: this.formList.fryqhmhours,
        //颅脑损伤患者昏迷时间入院前>分钟
        fryqhmmins: this.formList.fryqhmmins,
        //颅脑损伤患者昏迷时间入院后>天
        fryhmdays: this.formList.fryhmdays,
        //颅脑损伤患者昏迷时间入院后>时
        fryhmhours: this.formList.fryhmhours,
        //颅脑损伤患者昏迷时间入院后>分钟
        fryhmmins: this.formList.fryhmmins,
        //部分病种
        fsomediseases: this.formList.fsomediseases
      };
      postAddOperation(this.$qs.stringify(datas)).then(res => {
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
.el-button + .el-button {
  margin-left: 2px;
}
/deep/ .el-form-item__content {
  margin-left: 0px !important;
}
/deep/ .el-input__inner {
  text-align: center;
}

// .main_wraps {
//   height: 100%;
//   font-size: 14px;
//   color: #515355;
// }
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
#form_item {
  /deep/ .el-form-item__label {
    width: 220px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 220px !important;
  }
}
#form_item1 {
  /deep/ .el-form-item__label {
    width: 220px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 220px !important;
  }
}
#form_item2 {
  /deep/ .el-form-item__label {
    width: 220px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 220px !important;
  }
}
#form_item3 {
  /deep/ .el-form-item__label {
    width: 220px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 220px !important;
  }
}
#form_item4 {
  /deep/ .el-form-item__label {
    width: 220px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 220px !important;
  }
}
#form_item5 {
  /deep/ .el-form-item__label {
    width: 220px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 220px !important;
  }
}
#form_item6 {
  /deep/ .el-form-item__label {
    width: 220px !important;
  }
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
  display: flex;
  flex-direction: row;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 95%;
}
</style>
