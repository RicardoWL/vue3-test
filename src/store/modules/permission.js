import { asyncRouterMap, constantRouterMap } from '@/router'
// import layout from '@/layout/layout'

/**
 * 判断是否与当前角色权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(menus, route, isAdmin) {
//   if (isAdmin) {
//     return true
//   } else if (route.permission) {
//     return menus.indexOf(route.permission) > -1
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, menus, isAdmin) {
//   const accessedRouters = asyncRouterMap.filter((route) => {
//     if (hasPermission(menus, route, isAdmin)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, menus, isAdmin)
//         if (!route.children.length) return false
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

// 获取首页
// function getHomeIndex(router, path = '') {
//   if (router[0].children && router[0].children.length) {
//     return getHomeIndex(router[0].children, path + router[0].path + '/')
//   }
//   return {
//     path: '/',
//     redirect: path + router[0].path,
//     component: layout,
//     hidden: true
//   }
// }

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise((resolve) => {
        // console.log(userInfo)
        // const { menus, user } = userInfo
        // const isAdmin = user.username === 'admin'
        // const accessedRouters = filterAsyncRouter(asyncRouterMap, menus, isAdmin)
        // // 设置首页
        // const homeIndex = getHomeIndex(accessedRouters)
        // accessedRouters.unshift(homeIndex)
        // commit('SET_ROUTERS', accessedRouters)
        commit('SET_ROUTERS', asyncRouterMap)
        resolve()
      })
    }
  }
}

export default permission
