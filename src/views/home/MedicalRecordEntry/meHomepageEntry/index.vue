<template>
  <!-- 首页录入 -->
  <div class="tabs_two">
    <div class="tabs tabs_fixed">
      <el-button
        class="tabs_button"
        size="mini"
        @click="handleSaveAll"
        type="success"
        >一键保存</el-button
      >
      <el-tabs
        class="tabs_card"
        type="border-card"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :label="item.label"
          :name="item.name"
          v-for="(item, index) in tabList"
          :key="index"
        >
          <component
            :ref="'entryPane' + item.name"
            v-show="item.name === activeName"
            :is="item.content"
          ></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import mhBasicInformation from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhBasicInformation";
import mhInpatientinformation from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhInpatientinformation";
import mhDiagnosticInformation from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhDiagnosticInformation";
import mhCompliance from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhCompliance";
import mhSurgicalInformation from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhSurgicalInformation";
import mhWomenAndchildrenCard from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhWomenAndchildrenCard";
import mhCancerCard from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhCancerCard";
import mhFeeInformation from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhFeeInformation";
import mhExtendedInformation from "@/views/home/MedicalRecordEntry/meHomepageEntry/mhExtendedInformation";
import { postSpeedinessSave } from "@/api";
export default {
  components: {
    mhBasicInformation,
    mhInpatientinformation,
    mhDiagnosticInformation,
    mhCompliance,
    mhSurgicalInformation,
    mhWomenAndchildrenCard,
    mhCancerCard,
    mhFeeInformation,
    mhExtendedInformation
  },
  data() {
    return {
      activeName: "",
      tabList: [
        {
          label: "基本信息",
          name: "a",
          content: mhBasicInformation
        },
        {
          label: "住院信息",
          name: "b",
          content: mhInpatientinformation
        },
        {
          label: "诊断信息",
          name: "c",
          content: mhDiagnosticInformation
        },
        {
          label: "符合情况",
          name: "d",
          content: mhCompliance
        },
        {
          label: "手术信息",
          name: "e",
          content: mhSurgicalInformation
        },
        {
          label: "妇婴卡",
          name: "f",
          content: mhWomenAndchildrenCard
        },
        {
          label: "肿瘤卡",
          name: "g",
          content: mhCancerCard
        },
        {
          label: "费用信息",
          name: "h",
          content: mhFeeInformation
        },
        {
          label: "扩展信息",
          name: "i",
          content: mhExtendedInformation
        }
      ],
      tabsList: [],
      setWidth: document.documentElement.clientWidth - 214
    };
  },
  created() {
    console.log(this.tabList);
    if (sessionStorage.mhActiveName) {
      this.activeName = sessionStorage.mhActiveName;
    } else {
      this.activeName = "a";
    }
  },
  methods: {
    handleSaveAll() {
      //   this.$refs.entryPanea[0].$refs["formList"].validate(valid => {
      //     if (valid) {
      //       this.isSaves = false;
      //       this.$message.success("校验成功");
      //     } else {
      //       this.isSaves = true;
      //       return false;
      //     }
      //   });
      /* 诊断信息 */
      //主要诊断/附属诊断/损伤中毒 数据
      let arrZd = [];
      //其他诊断 数据
      let arrQtZd = [];
      this.$refs.entryPanec[0].formList.list.forEach(item => {
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
      this.$refs.entryPanec[0].formList.qtList.forEach(items => {
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
      /* 手术信息 */
      let operation = [];
      if (this.$refs.entryPanee[0].formList.List[0].fopdate) {
        let arrSs = JSON.parse(
          JSON.stringify(this.$refs.entryPanee[0].formList.List)
        );
        operation = arrSs.filter(
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
      /* 妇婴卡 */
      let arrFy = JSON.parse(
        JSON.stringify(this.$refs.entryPanef[0].formList.list)
      );
      let maternityChild = [];
      maternityChild = arrFy.filter(
        item =>
          delete item.fresultList &&
          delete item.flyfsList &&
          delete item.fhxList
      );
      /* 肿瘤卡 */
      let arrZlk = JSON.parse(
        JSON.stringify(this.$refs.entryPaneg[0].formList.list)
      );
      let tumourChemotherapy = [];
      tumourChemotherapy = arrZlk.filter(item => delete item.fhllxList);

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
      let zlkData = {
        //肿瘤分期类型
        fzltypebh: this.$refs.entryPaneg[0].formList.fzltypebh,
        //T
        ft: this.$refs.entryPaneg[0].formList.ft,
        //N
        fn: this.$refs.entryPaneg[0].formList.fn,
        //M
        fm: this.$refs.entryPaneg[0].formList.fm,
        //总分期
        fzfq: this.$refs.entryPaneg[0].formList.fzfq,
        //I放疗方式
        fflyypebh: this.$refs.entryPaneg[0].formList.fflyypebh,
        //I放疗程式
        fflcxbh: this.$refs.entryPaneg[0].formList.fflcxbh,
        //I放疗装置
        fflzzbh: this.$refs.entryPaneg[0].formList.fflzzbh,
        //原发灶(首次，复次)剂量
        fyjy: this.$refs.entryPaneg[0].formList.fyjy,
        //原发灶 次
        fycs: this.$refs.entryPaneg[0].formList.fycs,
        //原发灶 天
        fyts: this.$refs.entryPaneg[0].formList.fyts,
        //原发灶 起止日期
        fstartdate:
          this.$refs.entryPaneg[0].formList.yfzDate.length == 2
            ? this.$refs.entryPaneg[0].formList.yfzDate[0]
            : "",
        fenddate:
          this.$refs.entryPaneg[0].formList.yfzDate.length == 2
            ? this.$refs.entryPaneg[0].formList.yfzDate[1]
            : "",
        //区域淋巴结(首次，复次)剂量
        fqjy: this.$refs.entryPaneg[0].formList.fqjy,
        //区域淋巴结 次
        fqcs: this.$refs.entryPaneg[0].formList.fqcs,
        //区域淋巴结 天
        fqts: this.$refs.entryPaneg[0].formList.fqts,
        //区域淋巴结 起止日期
        fqrq1:
          this.$refs.entryPaneg[0].formList.lbjDate.length == 2
            ? this.$refs.entryPaneg[0].formList.lbjDate[0]
            : "",
        fqrq2:
          this.$refs.entryPaneg[0].formList.lbjDate.length == 2
            ? this.$refs.entryPaneg[0].formList.lbjDate[1]
            : "",
        //转移灶(首次，复次)剂量
        fzjy: this.$refs.entryPaneg[0].formList.fzjy,
        //转移灶 次
        fzcs: this.$refs.entryPaneg[0].formList.fzcs,
        //转移灶 天
        fzts: this.$refs.entryPaneg[0].formList.fzts,
        //转移灶 起止日期
        fzrq1:
          this.$refs.entryPaneg[0].formList.zyzDate.length == 2
            ? this.$refs.entryPaneg[0].formList.zyzDate[0]
            : "",
        fzrq2:
          this.$refs.entryPaneg[0].formList.zyzDate.length == 2
            ? this.$refs.entryPaneg[0].formList.zyzDate[1]
            : "",
        //II化疗方式
        fiifl: this.$refs.entryPaneg[0].formList.fiifl,
        //II化疗方法
        fiiff: this.$refs.entryPaneg[0].formList.fiiff,
        //妇婴卡信息
        tumourChemotherapy: arrZl.length == 0 ? "" : JSON.stringify(arrZl)
      };
      //过滤掉为空的项的肿瘤卡信息
      let zlkFilterData = Object.values(zlkData).filter(function(item) {
        if (item !== "") {
          return true; //过滤掉为空的项
        }
      });
      /* 费用信息 */
      let fyData = {
        // 住院总费用 => 总费用
        sumcost: this.$refs.entryPaneh[0].formList.sumcost,
        // 住院总费用 => 自付金额
        fzfje: this.$refs.entryPaneh[0].formList.fzfje,
        // 综合医疗服务类 =>  1.一般医疗服务费
        fzhfwlylf: this.$refs.entryPaneh[0].formList.fzhfwlylf,
        // 综合医疗服务类 =>  一般医疗服务费=>中医辨证论治费（中医）
        fzhfwlylf01: this.$refs.entryPaneh[0].formList.fzhfwlylf01,
        // 综合医疗服务类 =>  一般医疗服务费=>中医辨证论治会诊费（中医）
        fzhfwlylf02: this.$refs.entryPaneh[0].formList.fzhfwlylf02,
        // 综合医疗服务类 =>  2.一般治疗操作费
        fzhfwlczf: this.$refs.entryPaneh[0].formList.fzhfwlczf,
        // 综合医疗服务类 =>  3.一般护理费
        fzhfwlhlf: this.$refs.entryPaneh[0].formList.fzhfwlhlf,
        // 综合医疗服务类 =>  4.其他费用
        fzhfwlqtf: this.$refs.entryPaneh[0].formList.fzhfwlqtf,
        // 诊断类 => 5.病理诊断费
        fzdlblf: this.$refs.entryPaneh[0].formList.fzdlblf,
        // 诊断类 => 6.实验室诊断费
        fzdlsssf: this.$refs.entryPaneh[0].formList.fzdlsssf,
        // 诊断类 => 7.影像学诊断费
        fzdlyxf: this.$refs.entryPaneh[0].formList.fzdlyxf,
        // 诊断类 => 8.临床诊断项目费
        fzdllcf: this.$refs.entryPaneh[0].formList.fzdllcf,
        // 治疗类 => 9.非手术治疗项目费
        fzllffssf: this.$refs.entryPaneh[0].formList.fzllffssf,
        // 治疗类 => 非手术治疗项目费 => 临床物理治疗费
        fzllfwlzwlf: this.$refs.entryPaneh[0].formList.fzllfwlzwlf,
        // 治疗类 => 10.手术治疗费
        fzllfssf: this.$refs.entryPaneh[0].formList.fzllfssf,
        // 治疗类 => 手术治疗费 => 麻醉费
        fzllfmzf: this.$refs.entryPaneh[0].formList.fzllfmzf,
        // 治疗类 => 手术治疗费 => 手术费
        fzllfsszlf: this.$refs.entryPaneh[0].formList.fzllfsszlf,
        // 康复类 => 11.康复费
        fkflkff: this.$refs.entryPaneh[0].formList.fkflkff,
        // 中医类 => 12.中医诊断
        fzylzdf: this.$refs.entryPaneh[0].formList.fzylzdf,
        // 中医类 => 13.中医治疗
        fzylzlf: this.$refs.entryPaneh[0].formList.fzylzlf,
        // 中医类 => 中医治疗 => 中医外治
        fzylzlf01: this.$refs.entryPaneh[0].formList.fzylzlf01,
        // 中医类 => 中医治疗 => 中医骨伤
        fzylzlf02: this.$refs.entryPaneh[0].formList.fzylzlf02,
        // 中医类 => 中医治疗 => 针刺与灸法
        fzylzlf03: this.$refs.entryPaneh[0].formList.fzylzlf03,
        // 中医类 => 中医治疗 => 中医推拿治疗
        fzylzlf04: this.$refs.entryPaneh[0].formList.fzylzlf04,
        // 中医类 => 中医治疗 => 中医肛肠治疗
        fzylzlf05: this.$refs.entryPaneh[0].formList.fzylzlf05,
        // 中医类 => 中医治疗 => 中医特殊治疗
        fzylzlf06: this.$refs.entryPaneh[0].formList.fzylzlf06,
        // 中医类 => 14.中医其他
        fzylqtf: this.$refs.entryPaneh[0].formList.fzylqtf,
        // 中医类 => 中医其他 => 中药特殊调配加工
        fzylqtf01: this.$refs.entryPaneh[0].formList.fzylqtf01,
        // 中医类 => 中医其他 => 辨证施膳
        fzylqtf02: this.$refs.entryPaneh[0].formList.fzylqtf02,
        // 西药类 => 15.西药费
        fxyf: this.$refs.entryPaneh[0].formList.fxyf,
        // 西药类 => 西药费 => 抗菌药物费用
        fxylgjf: this.$refs.entryPaneh[0].formList.fxylgjf,
        // 中药类 => 16.中成药费
        fzchyf: this.$refs.entryPaneh[0].formList.fzchyf,
        // 中药类 => 中成药费 => 医疗机构中药制剂费
        fzcljgzjf: this.$refs.entryPaneh[0].formList.fzcljgzjf,
        // 中药类 => 17.中草药费
        fzcyf: this.$refs.entryPaneh[0].formList.fzcyf,
        // 血液和血液制品类 => 18.血费
        fxylxf: this.$refs.entryPaneh[0].formList.fxylxf,
        // 血液和血液制品类 => 19.白蛋白类制品费
        fxylbqbf: this.$refs.entryPaneh[0].formList.fxylbqbf,
        // 血液和血液制品类 => 20.球蛋白类制品费
        fxylqdbf: this.$refs.entryPaneh[0].formList.fxylqdbf,
        // 血液和血液制品类 => 21.凝血因子类制品费
        fxylyxyzf: this.$refs.entryPaneh[0].formList.fxylyxyzf,
        // 血液和血液制品类 => 22.细胞因子类制品费
        fxylxbyzf: this.$refs.entryPaneh[0].formList.fxylxbyzf,
        // 耗材类 => 23.检查用一次性医用材料费
        fhclcjf: this.$refs.entryPaneh[0].formList.fhclcjf,
        // 耗材类 => 24.治疗用一次性医用材料费
        fhclzlf: this.$refs.entryPaneh[0].formList.fhclzlf,
        // 耗材类 => 25.手术用一次性医用材料费
        fhclssf: this.$refs.entryPaneh[0].formList.fhclssf,
        // 其它类 => 26.其他费
        fqtf: this.$refs.entryPaneh[0].formList.fqtf,
        // 分计费用之和
        fsubentrycost: this.$refs.entryPaneh[0].fsubentrycost
      };
      let datas = {
        //录入员
        fpersonnel: sessionStorage.userName,
        //录入时间
        fdate: sessionStorage.entryDate,
        //病案号
        fprn: this.$refs.entryPanea[0].formList.fprn,
        //住院次数
        ftimes: this.$refs.entryPanea[0].formList.ftimes,
        //医疗付费方式名称
        ffb: this.$refs.entryPanea[0].formList.ffb,
        //医疗付费方式
        ffbbh: this.$refs.entryPanea[0].formList.ffbbh,
        //健康卡号
        zyid: this.$refs.entryPanea[0].formList.zyid,
        //姓名
        name: this.$refs.entryPanea[0].formList.name,
        //性别名称
        sex: this.$refs.entryPanea[0].formList.sex,
        //性别
        sexBh: this.$refs.entryPanea[0].formList.sexBh,
        //出生日期
        fbirthday: this.$refs.entryPanea[0].formList.fbirthday,
        //年龄
        fage: this.$refs.entryPanea[0].formList.fage,
        //国籍名称
        fcountry: this.$refs.entryPanea[0].formList.fcountry,
        //国籍
        fcountrybh: this.$refs.entryPanea[0].formList.fcountrybh,
        //民族名称
        fnationality: this.$refs.entryPanea[0].formList.fnationality,
        //民族
        fnationalitybh: this.$refs.entryPanea[0].formList.fnationalitybh,
        //新生儿出生体重
        fcstz: this.$refs.entryPanea[0].formList.fcstz,
        //新生儿入院体重
        frytz: this.$refs.entryPanea[0].formList.frytz,
        //出生地
        fbirthplace: this.$refs.entryPanea[0].formList.fbirthplace,
        //籍贯
        fnative: this.$refs.entryPanea[0].formList.fnative,
        //身份证号
        fidcard: this.$refs.entryPanea[0].formList.fidcard,
        //职业
        fjob: this.$refs.entryPanea[0].formList.fjob,
        //婚姻
        fstatus: this.$refs.entryPanea[0].formList.fstatus,
        //现住址
        fcurraddr: this.$refs.entryPanea[0].formList.fcurraddr,
        //电话
        fcurrtele: this.$refs.entryPanea[0].formList.fcurrtele,
        //现住址邮政编码
        fcurrpost: this.$refs.entryPanea[0].formList.fcurrpost,
        //户口住址
        fhkaddr: this.$refs.entryPanea[0].formList.fhkaddr,
        //病人来源名称
        fsource: this.$refs.entryPanea[0].formList.fsource,
        //病人来源
        fsourcebh: this.$refs.entryPanea[0].formList.fsourcebh,
        //户口邮政编码
        fhlpost: this.$refs.entryPanea[0].formList.fhlpost,
        //工作单位及住址
        fdwaddr: this.$refs.entryPanea[0].formList.fdwaddr,
        //单位电话
        fdwtele: this.$refs.entryPanea[0].formList.fdwtele,
        //工作单位邮政编码
        fdwpost: this.$refs.entryPanea[0].formList.fdwpost,
        //联系人姓名
        flxname: this.$refs.entryPanea[0].formList.flxname,
        //关系
        frelate: this.$refs.entryPanea[0].formList.frelate,
        //联系人地址
        flxaddr: this.$refs.entryPanea[0].formList.flxaddr,
        //联系人电话
        flxphone: this.$refs.entryPanea[0].formList.flxphone,

        /* 住院信息 */
        //入院途径编号
        frytjbh: this.$refs.entryPaneb[0].formList.frytjbh,
        //入院日期
        ryDate: this.$refs.entryPaneb[0].formList.ryDate,
        //入院科别
        // frydept: this.$refs.entryPaneb[0].formList.frydept,
        //入院科别编号
        frytykh: this.$refs.entryPaneb[0].formList.frytykh,
        //入院病区
        finpatientward: this.$refs.entryPaneb[0].formList.finpatientward,
        zkList: JSON.stringify(this.$refs.entryPaneb[0].formList.zkList),
        //出院日期
        cyDate: this.$refs.entryPaneb[0].formList.cyDate,
        //出院科别
        // dept: this.$refs.entryPaneb[0].formList.dept,
        //出院科别编号
        deptbh: this.$refs.entryPaneb[0].formList.deptbh,
        //出院病区
        fcyinpatientward: this.$refs.entryPaneb[0].formList.fcyinpatientward,
        //实际住院天数
        fsjzyts: this.$refs.entryPaneb[0].formList.fsjzyts,
        //门（急）诊诊断
        fmzzd: this.$refs.entryPaneb[0].formList.fmzzd,
        //门（急）诊诊断编号
        fmzzdbh: this.$refs.entryPaneb[0].formList.fmzzdbh,
        //门（急）诊医生
        // fmzdoct: this.$refs.entryPaneb[0].formList.fmzdoct,
        //门（急）诊医生编号
        fmzdoctbh: this.$refs.entryPaneb[0].formList.fmzdoctbh,
        //入院时情况编号
        fryinfobh: this.$refs.entryPaneb[0].formList.fryinfobh,
        //入院时情况编号
        fryinfobh: this.$refs.entryPaneb[0].formList.fryinfobh,
        //入院诊断
        fryzd: this.$refs.entryPaneb[0].formList.fryzd,
        //入院诊断编号
        fryzdbh: this.$refs.entryPaneb[0].formList.fryzdbh,
        //入院后确诊日期
        fqzdate: this.$refs.entryPaneb[0].formList.fqzdate,

        /* 诊断信息 */
        //主要诊断/附属诊断/损伤中毒 数据
        diagnose: JSON.stringify(arrZd),
        //其他诊断 数据
        otherDiagnostic: JSON.stringify(arrQtZd),

        /* 符合情况 */
        //HBsAb
        fhbsagbh: this.$refs.entryPaned[0].formList.fhbsagbh,
        //HCV-Ab
        fhcvabbh: this.$refs.entryPaned[0].formList.fhcvabbh,
        //HIV-Ab
        fhivabbh: this.$refs.entryPaned[0].formList.fhivabbh,
        //是否尸检
        fbodybh: this.$refs.entryPaned[0].formList.fbodybh ? "1" : "2",
        //病例分型
        fjbfxbh: this.$refs.entryPaned[0].formList.fjbfxbh,
        //临床路径病例
        fycljbh: this.$refs.entryPaned[0].formList.fycljbh,
        //抢救次数
        fqjtimes: this.$refs.entryPaned[0].formList.fqjtimes,
        //成功次数
        fqjsuctimes: this.$refs.entryPaned[0].formList.fqjsuctimes,
        //病理诊断
        fphzd: this.$refs.entryPaned[0].formList.fphzd,
        //病理诊断编码
        fphzdcode: this.$refs.entryPaned[0].formList.fphzdcode,
        //病理号
        fphzdnum: this.$refs.entryPaned[0].formList.fphzdnum,
        //门诊与出院
        fmzcyaccobh: this.$refs.entryPaned[0].formList.fmzcyaccobh,
        //入院与出院
        frycyaccobh: this.$refs.entryPaned[0].formList.frycyaccobh,
        //术前与术后
        fsqshaccobh: this.$refs.entryPaned[0].formList.fsqshaccobh,
        //临床与病理
        flcblaccobh: this.$refs.entryPaned[0].formList.flcblaccobh,
        //放射与病理
        ffsblaccobh: this.$refs.entryPaned[0].formList.ffsblaccobh,
        //药物过敏
        fifgmyw: this.$refs.entryPaned[0].formList.fifgmyw,
        //过敏药物
        fgmyw: this.$refs.entryPaned[0].formList.fgmyw,
        //血型
        fblood: this.$refs.entryPaned[0].formList.fblood,
        //Rh
        frhbh: this.$refs.entryPaned[0].formList.frhbh,
        //输血反应
        fsxfybh: this.$refs.entryPaned[0].formList.fsxfybh,
        //输液反应
        fsyfybh: this.$refs.entryPaned[0].formList.fsyfybh,
        //科主任
        fkzrbh: this.$refs.entryPaned[0].formList.fkzrbh,
        //主任（副主任）医师
        fzrdoctbh: this.$refs.entryPaned[0].formList.fzrdoctbh,
        //主治医师
        fzzdoctbh: this.$refs.entryPaned[0].formList.fzzdoctbh,
        //住院医师
        fzydoctbh: this.$refs.entryPaned[0].formList.fzydoctbh,
        //责任护士
        fzrnursebh: this.$refs.entryPaned[0].formList.fzrnursebh,
        //进修医师
        fjxdoctbh: this.$refs.entryPaned[0].formList.fjxdoctbh,
        //实习医师
        fsxdoctbh: this.$refs.entryPaned[0].formList.fsxdoctbh,
        //编码员
        fbmybh: this.$refs.entryPaned[0].formList.fbmybh,
        //病案质量
        fqualitybh: this.$refs.entryPaned[0].formList.fqualitybh,
        //质控医师
        fzkdoctbh: this.$refs.entryPaned[0].formList.fzkdoctbh,
        //质控护士
        fzknursebh: this.$refs.entryPaned[0].formList.fzknursebh,
        //质控日期
        fzkrq: this.$refs.entryPaned[0].formList.fzkrq,
        //输血品种 红细胞
        fredcell: this.$refs.entryPaned[0].formList.fredcell,
        //输血品种 血小板
        fplaque: this.$refs.entryPaned[0].formList.fplaque,
        //输血品种 血浆
        fserous: this.$refs.entryPaned[0].formList.fserous,
        //输血品种 全血
        fallblood: this.$refs.entryPaned[0].formList.fallblood,
        //输血品种 其他
        fotherblood: this.$refs.entryPaned[0].formList.fotherblood,
        //院际会诊
        fhzyj: this.$refs.entryPaned[0].formList.fhzyj,
        //远程会诊
        fhzyc: this.$refs.entryPaned[0].formList.fhzyc,
        //护理等级 特级
        fhltj: this.$refs.entryPaned[0].formList.fhltj,
        //护理等级 I级护理
        fhl1: this.$refs.entryPaned[0].formList.fhl1,
        //护理等级 II级护理
        fhl2: this.$refs.entryPaned[0].formList.fhl2,
        //护理等级 III级护理
        fhl3: this.$refs.entryPaned[0].formList.fhl3,
        //护理等级 重诊监护
        fhlzz: this.$refs.entryPaned[0].formList.fhlzz,
        //护理等级 特殊护理
        fhlts: this.$refs.entryPaned[0].formList.fhlts,

        /* 手术信息 */
        //手术信息
        operation: JSON.stringify(operation),
        //离院方式
        flyfsbh: this.$refs.entryPanee[0].formList.flyfsbh,
        //离院方式= 医嘱转院 => 拟接收医疗机构名称
        fyzzyname: this.$refs.entryPanee[0].formList.fyzzyname,
        //离院方式= 医嘱转社区卫生服务机构/乡镇卫生院 => 拟接收医疗机构名称
        fyzzsqname: this.$refs.entryPanee[0].formList.fyzzsqname,
        //是否有出院31天再住院计划
        fisagainrybh: this.$refs.entryPanee[0].formList.fisagainrybh,
        //再住院目的
        fpurpose: this.$refs.entryPanee[0].formList.fpurpose,
        //颅脑损伤患者昏迷时间入院前>天
        fryqhmdays: this.$refs.entryPanee[0].formList.fryqhmdays,
        //颅脑损伤患者昏迷时间入院前>时
        fryqhmhours: this.$refs.entryPanee[0].formList.fryqhmhours,
        //颅脑损伤患者昏迷时间入院前>分钟
        fryqhmmins: this.$refs.entryPanee[0].formList.fryqhmmins,
        //颅脑损伤患者昏迷时间入院后>天
        fryhmdays: this.$refs.entryPanee[0].formList.fryhmdays,
        //颅脑损伤患者昏迷时间入院后>时
        fryhmhours: this.$refs.entryPanee[0].formList.fryhmhours,
        //颅脑损伤患者昏迷时间入院后>分钟
        fryhmmins: this.$refs.entryPanee[0].formList.fryhmmins,
        //部分病种
        fsomediseases: this.$refs.entryPanee[0].formList.fsomediseases,

        /* 妇婴卡 */
        //妇婴卡信息
        maternityChild: JSON.stringify(maternityChild)
      };
      let dataAll = Object.assign(datas, zlkFilterData, fyData);
      postSpeedinessSave(this.$qs.stringify(dataAll)).then(res => {
        console.log(res, "一键保存");
      });
      console.log(this.$refs.entryPanea[0], datas, "子组件");
    },
    handleClick(tab, event) {
      this.activeName = tab.name;
      sessionStorage.setItem("mhActiveName", this.activeName);
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs_two {
  padding-top: 40px;
  .tabs_fixed {
    position: relative;
    .tabs_button {
      position: absolute;
      top: 8px;
      right: 0;
      z-index: 1000;
    }
  }
}
</style>
<style>
.tabs_card .el-tabs__header {
  height: 40px;
}
.tabs_card .el-tabs__content {
  padding-top: 0;
}
</style>
