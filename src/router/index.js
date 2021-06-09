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
      path: '/scheduling',
      name: 'scheduling',
      component: resolve => require(['@/views/home/scheduling'], resolve),
      meta: {
        comp: 'scheduling',
        title: '排班'
      }
    }, {
      path: '/workloadAccount',
      name: 'workloadAccount',
      component: resolve => require(['@/views/home/workloadAccount'], resolve),
      meta: {
        comp: 'workloadAccount',
        title: '工作量统计'
      }
    }, {
      path: '/talentQuery',
      name: 'talentQuery',
      component: resolve => require(['@/views/home/talentQuery'], resolve),
      meta: {
        comp: 'talentQuery',
        title: '人才查询'
      }
    }, {
      path: '/talentExport',
      name: 'talentExport',
      component: resolve => require(['@/views/home/talentExport'], resolve),
      meta: {
        comp: 'talentExport',
        title: '人才导入'
      }
    }, {
      path: '/systemSettings',
      name: 'systemSettings',
      component: resolve => require(['@/views/home/systemSettings'], resolve),
      meta: {
        comp: 'systemSettings',
        title: '系统设置'
      },
      children: [{
        path: '/ssProjectSetup',
        name: 'ssProjectSetup',
        component: resolve => require(['@/views/home/systemSettings/ssProjectSetup'], resolve),
        meta: {
          comp: 'ssProjectSetup',
          title: '项目设置'
        }
      }, {
        path: '/ssPersonnelSetup',
        name: 'ssPersonnelSetup',
        component: resolve => require(['@/views/home/systemSettings/ssPersonnelSetup'], resolve),
        meta: {
          comp: 'ssPersonnelSetup',
          title: '人员设置'
        }
      }, {
        path: '/ssClosingHours',
        name: 'ssClosingHours',
        component: resolve => require(['@/views/home/systemSettings/ssClosingHours'], resolve),
        meta: {
          comp: 'ssClosingHours',
          title: '闭馆时间设置'
        }
      }]
    }, {
      path: '/compensatoryLeaveExport',
      name: 'compensatoryLeaveExport',
      component: resolve => require(['@/views/home/compensatoryLeaveExport'], resolve),
      meta: {
        comp: 'compensatoryLeaveExport',
        title: '调休导入'
      }
    }, {
      path: '/IdlePeopleQuery',
      name: 'IdlePeopleQuery',
      component: resolve => require(['@/views/home/IdlePeopleQuery'], resolve),
      meta: {
        comp: 'IdlePeopleQuery',
        title: '空闲人员查询'
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
    path: '/404',
    name: '404',
    component: resolve => require(['@/views/error/404'], resolve),
    meta: {
      title: '404'
    }
  }]
})
