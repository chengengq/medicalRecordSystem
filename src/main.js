// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/reset.css'
import './styles/elements.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import qs from "qs";
import App from './App';
import router from './router';
//pc自适应
import 'lib-flexible'
// import '@/utils/permission'
//时间/条件分类封装
import VTimer from '@/components/vTimer'
//分页器封装
import newPagination from '@/components/newPagination';
//表格导出封装js
import exportMethod from "@/utils/handleExport.js";

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
Vue.component('newPagination', newPagination);
Vue.component('VTimer', VTimer)
Vue.prototype.exportMethod = exportMethod;
Vue.use(ElementUI);
Vue.prototype.$qs = qs
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
