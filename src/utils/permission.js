import router from '@/router'

function test() {
  let data = JSON.parse(sessionStorage.ROUTES || '[]');
  let routes = [{
    path: "/home",
    name: "home",
    component: resolve => require(["@/views/home"], resolve),
    children: [{
      path: "/welcome",
      name: "welcome",
      component: resolve =>
        require(["@/views/home/welcome"], resolve),
      meta: {
        comp: "welcome",
        title: "首页"
      }
    }]
  }];
  data.forEach((item, index) => {
    routes[0].children.push({
      path: item.path,
      name: item.name,
      id: item.id,
      component: resolve =>
        require(["@/views/home" + item.path], resolve),
      meta: {
        comp: item.name,
        title: item.menuName
      },
      children: []
    });
    if (item.children) {
      item.children.forEach((items, indexs) => {
        routes[0].children[index + 1].children.push({
          path: items.path,
          name: items.name,
          id: items.id,
          component: resolve =>
            require(["@/views/home" + items.path], resolve),
          meta: {
            comp: items.name,
            title: items.menuName
          },
          children: []
        });
      });
    }
  });
  router.addRoutes(routes)
}
test()
const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;
  // 获取用户token，用来判断当前用户是否登录
  const hasToken = localStorage.getItem('token')
  if (hasToken) {
    let route = JSON.parse(sessionStorage.ROUTES || '[]');
    //判断store中是否有路由，若有，进行下一步
    next()
    // if (route.length) {
    //   next()
    // } else {
    //   //store中没有路由，则需要获取获取异步路由，并进行格式化处理
    //   try {
    //     router.addRoutes(test(route))
    //     next({
    //       ...to,
    //       replace: true
    //     })
    //   } catch (error) {
    //     next('/login')
    //   }
    // }
    // if (to.path === '/login') {
    //   next({
    //     path: '/'
    //   })
    // } else {
    //   //异步获取store中的路由
    //   let route = await store.state.addRoutes;
    //   const hasRouters = route && route.length > 0;
    //   //判断store中是否有路由，若有，进行下一步
    //   if (hasRouters) {
    //     next()
    //   } else {
    //     //store中没有路由，则需要获取获取异步路由，并进行格式化处理
    //     try {
    //       const accessRoutes = getAsyncRoutes(await store.state.addRoutes);
    //       // 动态添加格式化过的路由
    //       router.addRoutes(accessRoutes);
    //       next({
    //         ...to,
    //         replace: true
    //       })
    //     } catch (error) {
    //       next('/login')
    //     }
    //   }
    // }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
