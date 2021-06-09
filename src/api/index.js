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

axios.defaults.timeout = 100000;
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


//登录
export const postLogin = obj => axios.post("/user/login", obj).then(res => res.data).catch(err => console.log(err));

//开始排班
export const getWorkforce = params => axios.get("/scheduling/workforce", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//排班
export const getWorkforceTable = params => axios.get("/scheduling/getWorkforceTable", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//工作量统计
export const getWorkloadTable = params => axios.get("/scheduling/workloadTable", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//项目选择/系统设置>项目设置>获取所有项目
export const getItemsList = params => axios.get("/system/itemsList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//人才查询
export const getTalentsTable = params => axios.get("/original/talentsTable", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

// 人才导入>模板导出
export const postDownItemsFromExcel = obj => axios.post("/system/downItemsFromExcel", obj).then(res => res.data).catch(err => console.log(err));

// 系统设置>项目设置>修改项目顺序
export const postAddOrUpdateItems = obj => axios.post("/system/addOrUpdateItems", obj).then(res => res.data).catch(err => console.log(err));

// 系统设置>项目设置>删除项目
export const postDeleteItems = obj => axios.post("/system/deleteItems", obj).then(res => res.data).catch(err => console.log(err));

//系统设置>项目设置>获取全部人员
export const getItemCrewListAll = params => axios.get("/system/itemCrewListAll", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//系统设置>项目设置>获取以绑定项目人员
export const getItemCrewList = params => axios.get("/system/itemCrewList", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//系统设置>项目设置>绑定人员
export const postUpdateItemCrew = obj => axios.post("/system/updateItemCrew", obj).then(res => res.data).catch(err => console.log(err));

//系统设置>人员设置>获取全部人员
export const getAllCrew = params => axios.get("/system/getAllCrew", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

//系统设置>人员设置>获取人员所属的项目
export const getItemsByCrew = params => axios.get("/system/getItemsByCrew", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

// 系统设置>人员设置>修改人员排班
export const postAddOrUpdateSpecial = obj => axios.post("/system/addOrUpdateSpecial", obj).then(res => res.data).catch(err => console.log(err));

// 系统设置>人员设置>添加、修改人员信息
export const postUpdateOrAddCrew = obj => axios.post("/system/updateOrAddCrew", obj).then(res => res.data).catch(err => console.log(err));

// 系统设置>人员设置>删除人员信息
export const postDeleteCrew = obj => axios.post("/system/deleteCrew", obj).then(res => res.data).catch(err => console.log(err));

//系统设置>闭馆时间表
export const getClosed = params => axios.get("/system/getClosed", {
  params: params
}).then(res => res.data).catch(err => console.log(err));

// 系统设置>闭馆时间表>添加、修改
export const postAddOrUpdateClosed = obj => axios.post("/system/addOrUpdateClosed", obj).then(res => res.data).catch(err => console.log(err));

// 系统设置>闭馆时间表>删除
export const postDeleteClosed = obj => axios.post("/system/deleteClosed", obj).then(res => res.data).catch(err => console.log(err));

//空闲人才查询
export const getLeisureCrew = params => axios.get("/leisure/getLeisureCrew", {
  params: params
}).then(res => res.data).catch(err => console.log(err));


export default axios;
