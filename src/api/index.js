import axios from 'axios'
import router from '@/router'
import {
  MessageBox
} from "element-ui";
import Router from "../router";
import {
  showFullScreenLoading,
  hideFullScreenLoading
} from "@/utils/loading.js";

axios.defaults.timeout = 5000;
//设置基准路径
axios.defaults.baseURL = window.axiosUrl.ip

window._axiosPromiseArr = [] // axios中设置放置要取消的对象
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// //设置请求拦截
axios.interceptors.request.use(function (config) {
  console.log(config);
  let token = sessionStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  //   config.cancelToken = new axios.CancelToken(cancel => {
  //     window._axiosPromiseArr.push({
  //       cancel
  //     })
  //   })
  showFullScreenLoading('loading')
  console.log(config);
  return config;
}, function (error) {
  hideFullScreenLoading()
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  hideFullScreenLoading()
  return response;
}, error => {
  hideFullScreenLoading()
  // 对响应错误做点什么
  if (error.response) {
    console.log(error.response, 'error.response');
    if (error.response.status == 401) {
      if (sessionStorage.getItem("activeIndex")) {
        //主要作用是限制消息弹出的次数为一次
        console.log("还有activeIndex");
        sessionStorage.removeItem("activeIndex");
        MessageBox.alert('令牌过期,返回登录页面重新登录!', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            sessionStorage.removeItem('token');
            router.push('/login');
          }
        });
      }
    }
  }
});
//response拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  hideFullScreenLoading()
  return response;
}, error => {
  hideFullScreenLoading()
  // 对响应错误做点什么
  if (error.response) {
    console.log(error.response.status, 'error.response666');
    if (error.response.status == 500) {
      if (sessionStorage.getItem("activeIndex")) {
        //主要作用是限制消息弹出的次数为一次
        console.log("还有activeIndex");
        sessionStorage.removeItem("activeIndex");
        MessageBox.alert('令牌过期,返回登录页面重新登录!', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            sessionStorage.removeItem('token');
            Router.push('/login');
          }
        });
      }
    }
  }
});


//激活码
export const postActivate = obj => axios.post("/user/activate", obj).then(res => res.data).catch(err => console.log(err));

//登录
export const postLogin = obj => axios.post("/user/login", obj).then(res => res.data).catch(err => console.log(err));

//动态导航
export const getMenus = params => axios.get('user/menus', {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>字典库>科室
export const getDeptList = params => axios.get("/dictionary/getDeptList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>字典库>医生
export const getDoctorList = params => axios.get("/dictionary/getDoctorList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>字典库>门急诊诊断
export const getDiagnoseList = params => axios.get("/dictionary/getDiagnoseList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>字典库>获取手术码
export const getOperationList = params => axios.get("/dictionary/getOperationList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>基本信息>字典库>医疗付费方式
export const getPaymentList = params => axios.get("/dictionary/getPaymentList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>基本信息>字典库>国籍
export const getNationalityList = params => axios.get("/dictionary/getNationalityList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>基本信息>字典库>民族
export const getNationList = params => axios.get("/dictionary/getNationList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>基本信息>字典库>职业
export const getJobList = params => axios.get("/dictionary/getJobList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>基本信息>字典库>婚姻
export const getMarriageList = params => axios.get("/dictionary/getMarriageList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>基本信息>字典库>关系
export const getRelationList = params => axios.get("/dictionary/getRelationList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>基本信息>字典库>病人来源
export const getSourceList = params => axios.get("/dictionary/getSourceList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>住院信息>字典库>入院途径
export const getRYTJList = params => axios.get("/dictionary/getRYTJList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>诊断信息>字典库>获取入院病情
export const getRyBQList = params => axios.get("/dictionary/getRyBQList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>诊断信息>校验损伤中毒是否可选 主要诊断为损伤码可选
export const getVerufyInjuryPoisoning = params => axios.get("/verify/verufyInjuryPoisoning", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>符合情况>字典库>获取病例分型
export const getBlfxList = params => axios.get("/dictionary/getBlfxList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>符合情况>字典库>获取诊断符合情况 门诊与出院/临床与病理
export const getClinicList = params => axios.get("/dictionary/getClinicList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>符合情况>字典库>获取血型
export const getBloodList = params => axios.get("/dictionary/getBloodList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>符合情况>字典库>获取RH
export const getRhList = params => axios.get("/dictionary/getRhList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>符合情况>字典库>获取病案质量
export const getMedicalQualityList = params => axios.get("/dictionary/getMedicalQualityList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>手术信息>字典库>获取手术级别
export const getSsjbList = params => axios.get("/dictionary/getSsjbList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>手术信息>字典库>切口
export const getQKDJList = params => axios.get("/dictionary/getQKDJList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>手术信息>字典库>愈合
export const getYhList = params => axios.get("/dictionary/getYhList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>手术信息>字典库>麻醉方式
export const getMzList = params => axios.get("/dictionary/getMzList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>手术信息>字典库>离院方式
export const getPlyfsLsit = params => axios.get("/dictionary/getPlyfsLsit", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>妇婴卡>字典库>分娩结果
export const getDeliveryList = params => axios.get("/dictionary/getDeliveryList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>妇婴卡>字典库>婴儿转归
export const getInfantOutcomeList = params => axios.get("/dictionary/getInfantOutcomeList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>妇婴卡>字典库>呼吸
export const getBreatheList = params => axios.get("/dictionary/getBreatheList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>肿瘤卡>字典库>获取肿瘤分期类型
export const getNeoplasmStagingList = params => axios.get("/dictionary/getNeoplasmStagingList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>肿瘤卡>字典库>获取放疗方式
export const getRadiotherapyMethods = params => axios.get("/dictionary/getRadiotherapyMethods", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>肿瘤卡>字典库>获取程式
export const getPatternList = params => axios.get("/dictionary/getPatternList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>肿瘤卡>字典库>获取装置
export const getDeviceList = params => axios.get("/dictionary/getDeviceList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>肿瘤卡>字典库>获取化疗方式
export const getChemotherapyList = params => axios.get("/dictionary/getChemotherapyList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>肿瘤卡>字典库>获取化疗方法
export const getChemotherapyMethodsList = params => axios.get("/dictionary/getChemotherapyMethodsList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>肿瘤卡>字典库>获取疗效
export const getCurativeEffectList = params => axios.get("/dictionary/getCurativeEffectList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//字典设置>医生设置>字典库>获取职称
export const getProfessionalList = params => axios.get("/dictionary/getProfessionalList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));



//首页录入>基本信息>单条信息录入校验
export const getVerifyKeyValue = params => axios.get("/verify/verifyKeyValue", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>基本信息>判断病案号是否存在
export const getCheckFprn = params => axios.get("/verify/checkFprn", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>基本信息>病案号校验-再次重新住院
export const getFindFTimes = params => axios.get("/verify/findFTimes", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>基本信息>病案号校验-新增病案号
export const getNewFprn = params => axios.get("/verify/getNewFprn", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>基本信息>选择出生日期时获取真实年龄
export const getPeopleYearByBirthDay = params => axios.get("/verify/getPeopleYearByBirthDay", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>基本信息>基本信息录入
export const postAddBasicInformation = obj => axios.post("/medical/addBasicInformation", obj).then(res => res.data).catch(err => console.log(err));

//首页录入>基本信息>全部校验
export const postBasicInformationVerify = obj => axios.post("/verify/basicInformationVerify", obj).then(res => res.data).catch(err => console.log(err));

//首页录入>住院信息>校验入院日期
export const getCheckRyDate = params => axios.get("/verify/checkRyDate", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>住院信息>校验实际住院天数
export const getPeopleFdays = params => axios.get("/verify/getPeopleFdays", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>住院信息录入
export const postAddHospitalized = obj => axios.post("/medical/addHospitalized", obj).then(res => res.data).catch(err => console.log(err));

//首页录入>诊断信息录入
export const postAddDiagnose = obj => axios.post("/medical/addDiagnose", obj).then(res => res.data).catch(err => console.log(err));

//首页录入>符合情况录入
export const postAddComplianceInformation = obj => axios.post("/medical/addComplianceInformation", obj).then(res => res.data).catch(err => console.log(err));

//首页录入>手术信息录入
export const postAddOperation = obj => axios.post("/medical/addOperation", obj).then(res => res.data).catch(err => console.log(err));

//首页录入>妇婴卡录入
export const postAddMaternityChild = obj => axios.post("/medical/addMaternityChild", obj).then(res => res.data).catch(err => console.log(err));

//首页录入>肿瘤卡录入
export const postAddTumour = obj => axios.post("/medical/addTumour", obj).then(res => res.data).catch(err => console.log(err));

//首页录入>费用信息>手术费麻醉费是否异常
export const getVerifyOperationCost = params => axios.get("/verify/verifyOperationCost", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//首页录入>费用信息>费用信息录入
export const postAddCost = obj => axios.post("/medical/addCost", obj).then(res => res.data).catch(err => console.log(err));

//首页录入>费用信息>全部录入
export const postSpeedinessSave = obj => axios.post("/medical/speedinessSave", obj).then(res => res.data).catch(err => console.log(err));

//病案录入>病案首页数据核查>数据核查
export const getInspect = params => axios.get("/medical/getInspect", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//病案录入>病案首页数据核查>核查数据显示
export const getInspectList = params => axios.get("/medical/getInspectList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));


//直接上报>生成病案首页>核查首页
export const postInspectList = obj => axios.post("/manufacture/getInspectList", obj).then(res => res.data).catch(err => console.log(err));

//直接上报>生成病案首页>生成病案首页
export const postExportUpload = obj => axios.post("/manufacture/exportUpload", obj).then(res => res.data).catch(err => console.log(err));


//字典设置>科室字典库>门诊科室设置>获取科室
export const getSettingDeptList = params => axios.get("/deptSetting/getDeptList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//字典设置>科室字典库>门诊科室设置>根据科号查看是否存在
export const getCheckDeptBh = params => axios.get("/deptSetting/checkDeptBh", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//字典设置>科室字典库>门诊科室设置>新建科室
export const postAddSettingDept = obj => axios.post("/deptSetting/addDept", obj).then(res => res.data).catch(err => console.log(err));

//字典设置>科室字典库>门诊科室设置>编辑科室
export const postEditSettingDept = obj => axios.post("/deptSetting/updateDept", obj).then(res => res.data).catch(err => console.log(err));

//字典设置>科室字典库>门诊科室设置>删除科室
export const postDelSettingDept = obj => axios.post("/deptSetting/deleteDept", obj).then(res => res.data).catch(err => console.log(err));

//字典设置>科室字典库>门诊科室设置>拖拽修改科室的顺序以及节点
export const postUpdateDeptSettingSort = obj => axios.post("/deptSetting/updateDeptSettingSort", obj).then(res => res.data).catch(err => console.log(err));

//字典设置>医生设置>医生列表
export const getSetupDoctorList = params => axios.get("/doctorSetting/getDoctorList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//字典设置>医生设置>根据医生工号查看是否存在
export const getCheckDoctor = params => axios.get("/doctorSetting/checkDoctor", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//字典设置>医生设置>新建
export const postAddDoctor = obj => axios.post("/doctorSetting/addDoctor", obj).then(res => res.data).catch(err => console.log(err));

//字典设置>医生设置>修改
export const postUpdateDoctor = obj => axios.post("/doctorSetting/updateDoctor", obj).then(res => res.data).catch(err => console.log(err));

//字典设置>医生设置>删除
export const postDeleteDoctor = obj => axios.post("/doctorSetting/deleteDoctor", obj).then(res => res.data).catch(err => console.log(err));

//字典设置>付款方式设置>新建
export const postAddPayment = obj => axios.post("/paySetting/addPayment", obj).then(res => res.data).catch(err => console.log(err));

//字典设置>付款方式设置>修改
export const postUpdatePayment = obj => axios.post("/paySetting/updatePayment", obj).then(res => res.data).catch(err => console.log(err));

//字典设置>付款方式设置>删除
export const postDeletePayment = obj => axios.post("/paySetting/deletePayment", obj).then(res => res.data).catch(err => console.log(err));

//字典设置>诊断码设置>新建
export const postDSCAddDiagnose = obj => axios.post("/paySetting/addDiagnose", obj).then(res => res.data).catch(err => console.log(err));

//字典设置>诊断码设置>修改
export const postDSCUpdateDiagnose = obj => axios.post("/paySetting/updateDiagnose", obj).then(res => res.data).catch(err => console.log(err));

//字典设置>诊断码设置>删除
export const postDSCDeleteDiagnose = obj => axios.post("/paySetting/deleteDiagnose", obj).then(res => res.data).catch(err => console.log(err));

//系统设置>用户管理 -用户列表
export const getUserList = params => axios.get('auxiliaryManagement/userList', {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//系统设置>用户管理 -检查登录名重复
export const getCheckLogingName = params => axios.get('auxiliaryManagement/checkLogingName', {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//系统设置>用户管理 -获取姓名
export const getDocList = params => axios.get('auxiliaryManagement/docList', {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//系统设置>用户管理 -获取员工工号
export const getDocById = params => axios.get('auxiliaryManagement/getDocById', {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//系统设置>用户管理 -新建
export const postAddUser = obj => axios.post('auxiliaryManagement/addUser', obj).then(res => res.data).catch(err => console.log(err));

//系统设置>用户管理 -修改
export const postUpdateUser = obj => axios.post('auxiliaryManagement/updateUser', obj).then(res => res.data).catch(err => console.log(err));

//系统设置>用户管理 -删除
export const postDeleteUser = obj => axios.post('auxiliaryManagement/deleteUser', obj).then(res => res.data).catch(err => console.log(err));

//系统设置>角色管理 -角色列表
export const getRoleList = params => axios.get('auxiliaryManagement/roleList', {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//系统设置>角色管理 -新建
export const postAddRole = obj => axios.post('auxiliaryManagement/addRole', obj).then(res => res.data).catch(err => console.log(err));

//系统设置>角色管理 -修改
export const postUpdateRole = obj => axios.post('auxiliaryManagement/updateRole', obj).then(res => res.data).catch(err => console.log(err));

//系统设置>角色管理 -删除
export const postDeleteRole = obj => axios.post('auxiliaryManagement/deleteRole', obj).then(res => res.data).catch(err => console.log(err));

//系统设置>角色管理 -分配菜单列表
export const getRoleMenuList = params => axios.get('auxiliaryManagement/roleMenuList', {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//系统设置>角色管理 -分配菜单列表
export const postUpdateRoleMenu = obj => axios.post('auxiliaryManagement/updateRoleMenu', obj).then(res => res.data).catch(err => console.log(err));

//系统设置>角色管理 -用户角色列表(已分配权限）
export const getUserRoleList = params => axios.get('auxiliaryManagement/userRoleList', {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//系统设置>角色管理 -用户角色列表(未分配权限）
export const getUserNoRoleList = params => axios.get('auxiliaryManagement/userNoRoleList', {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//系统设置>角色管理 -分配角色修改
export const postUpdateUserRole = obj => axios.post('auxiliaryManagement/updateUserRole', obj).then(res => res.data).catch(err => console.log(err));

//系统设置>角色管理 -科室权限列表
export const getRoleDeptList = params => axios.get('auxiliaryManagement/roleDeptList', {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//系统设置>角色管理 -科室权限分配
export const postUpdateRoleDept = obj => axios.post('auxiliaryManagement/updateRoleDept', obj).then(res => res.data).catch(err => console.log(err));

//系统设置>菜单管理 -菜单列表
export const getMenuList = params => axios.get('auxiliaryManagement/menuList', {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//系统设置>菜单管理 -科室权限列表
export const postUpdateMenu = obj => axios.post('auxiliaryManagement/updateMenu', obj).then(res => res.data).catch(err => console.log(err));



export default axios;
