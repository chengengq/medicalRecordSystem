import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const resolveOriginal = Router.prototype.push
Router.prototype.push = function push(location) {
  return resolveOriginal.call(this, location).catch(err => err)
}

export default new Router({
  routes: [{
    path: '/home',
    name: 'home',
    component: resolve => require(['@/views/home'], resolve),

    children: [{
      path: '/welcome',
      name: 'welcome',
      component: resolve => require(['@/views/home/welcome'], resolve),
      meta: {
        comp: 'welcome',
        title: '首页'
      }
    }, {
      path: '/meHomepageEntry',
      name: 'meHomepageEntry',
      component: resolve => require(['@/views/home/MedicalRecordEntry/meHomepageEntry'], resolve),
      meta: {
        comp: 'meHomepageEntry',
        title: '首页录入'
      }
    }, {
      path: '/meHomeproofSetup',
      name: 'meHomeproofSetup',
      component: resolve => require(['@/views/home/MedicalRecordEntry/meHomeproofSetup'], resolve),
      meta: {
        comp: 'meHomeproofSetup',
        title: '首页校验设置'
      }
    }, {
      path: '/meDataVerification',
      name: 'meDataVerification',
      component: resolve => require(['@/views/home/MedicalRecordEntry/meDataVerification'], resolve),
      meta: {
        comp: 'meDataVerification',
        title: '病案首页数据核查'
      }
    }, {
      path: '/drGenerateMedicalRecord',
      name: 'drGenerateMedicalRecord',
      component: resolve => require(['@/views/home/directReporting/drGenerateMedicalRecord'], resolve),
      meta: {
        comp: 'drGenerateMedicalRecord',
        title: '生成病案首页'
      }
    }, {
      path: '/ddOutpatientDeptSetup',
      name: 'ddOutpatientDeptSetup',
      component: resolve => require(['@/views/home/dictionarySettings/dsDepartmentDictionary/ddOutpatientDeptSetup'], resolve),
      meta: {
        comp: 'ddOutpatientDeptSetup',
        title: '科室设置'
      }
    }, {
      path: '/dsOperationCodeSetting',
      name: 'dsOperationCodeSetting',
      component: resolve => require(['@/views/home/dictionarySettings/dsOperationCodeSetting'], resolve),
      meta: {
        comp: 'dsOperationCodeSetting',
        title: '手术码设置'
      }
    }, {
      path: '/dsDoctorSetting',
      name: 'dsDoctorSetting',
      component: resolve => require(['@/views/home/dictionarySettings/dsDoctorSetting'], resolve),
      meta: {
        comp: 'dsDoctorSetting',
        title: '医生设置'
      }
    }, {
      path: '/dsPaymentmethodSetting',
      name: 'dsPaymentmethodSetting',
      component: resolve => require(['@/views/home/dictionarySettings/dsPaymentmethodSetting'], resolve),
      meta: {
        comp: 'dsPaymentmethodSetting',
        title: '付款方式设置'
      }
    }, {
      path: '/daIcdSetting',
      name: 'daIcdSetting',
      component: resolve => require(['@/views/home/dictionarySettings/daIcdSetting'], resolve),
      meta: {
        comp: 'daIcdSetting',
        title: '诊断码设置'
      }
    }, {
      path: '/ssUseradminister',
      name: 'ssUseradminister',
      component: resolve => require(['@/views/home/systemSettings/ssUseradminister'], resolve),
      meta: {
        comp: 'ssUseradminister',
        title: '用户管理'
      }
    }, {
      path: '/ssRoles',
      name: 'ssRoles',
      component: resolve => require(['@/views/home/systemSettings/ssRoles'], resolve),
      meta: {
        comp: 'ssRoles',
        title: '角色管理'
      }
    }, {
      path: '/ssMenuadminister',
      name: 'ssMenuadminister',
      component: resolve => require(['@/views/home/systemSettings/ssMenuadminister'], resolve),
      meta: {
        comp: 'ssMenuadminister',
        title: '菜单管理'
      }
    }]
  }, {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/login'], resolve),
    meta: {
      title: '登录'
    }
  }, {
    path: '*',
    name: '404',
    component: resolve => require(['@/views/error/404'], resolve),
    meta: {
      title: '404'
    }
  }]
})
