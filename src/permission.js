import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { deepClone } from './utils'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/user/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  console.log(to.path)
  // start progress bar
  NProgress.start()
  // 有token时
  if (whiteList.indexOf(to.path) !== -1) {
    // if (localStorage.isLogined) {
    //   next('/')
    // } else {
    //   next()
    // } // fixme 引起bug
    next()
    NProgress.done()
  } else {
    // 有无用户数据
    if (store.getters.addRouters.length>0) {
      next()
    } else {
      // store
      //   .dispatch('GetUserInfo')
      //   .then((userInfo) => {
      //     // 拉取用户信息及路由表
      //     store.dispatch('GenerateRoutes', userInfo).then(() => {
      //       // 根据roles权限生成可访问的路由表
      //       router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      //       next({
      //         ...to,
      //         replace: true
      //       }) // hack方法 确保addRoutes已完成
      //     })
      //   })
      //   .catch(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       localStorage.removeItem('isLogined')
      //       next('/user/login')
      //       NProgress.done()
      //     })
      //   })
          store.dispatch('GenerateRoutes').then(() => {
            // 根据roles权限生成可访问的路由表
            const addRouters = deepClone(store.getters.addRouters)
            addRouters.forEach((route) => {
              router.addRoute(route) // 动态添加可访问路由表
            })
            next({
              ...to,
              replace: true
            }) // hack方法 确保addRoutes已完成
          })
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
