import {createRouter, createWebHashHistory} from "vue-router"
import Layout from "../layout/layout";

export const constantRouterMap = [
  {
    path: '/manage_examine',
    name: 'home',
    hidden: true,
    component: () => import("../views/home.vue")
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import("../views/login.vue")
  }
]

export const asyncRouterMap = [
  {
    path: '/hrm',
    component: Layout,
    name: 'hrm',
    meta: {
      title: '人资管理'
    },
    redirect: '/hrm/manage_indicator',
    alwaysShow: true,
    iconCls: 'el-icon-setting',
    children: [
      {
        path: 'manage_indicator',
        name: 'manage_indicator',
        component: () => import("../views/hrm/manageIndicator"),
        iconCls: 'el-icon-s-data',
        meta: {
          title: '指标管理'
        }
      }
    ]
  }
  // {
  //   path: '/',
  //   component: Layout,
  //   hidden: true,
  //   key: '.',
  //   children: [
  //     {
  //       path: 'index',
  //       name: '首页',
  //       key: '.index',
  //       alias: '/',
  //       component: () => import("../views/test.vue")
  //     }
  //   ]
  // },
  // {
  //   path: '/system1',
  //   component: Layout,
  //   name: '系统管理1',
  //   key: '.system1',
  //   iconType: 'icon-windows',
  //   children: [
  //     {
  //       key: '.system1.index',
  //       path: 'index',
  //       name: '测试1',
  //       component: () => import("../views/test.vue")
  //     },
  //     {
  //       key: '.system1.index2',
  //       path: 'index2',
  //       name: '测试12',
  //       component: () => import("../views/test.vue")
  //     }
  //   ]
  // },
  // {
  //   path: '/system2',
  //   component: Layout,
  //   name: '系统管理2',
  //   key: '.system2',
  //   iconType: 'icon-windows',
  //   children: [
  //     {
  //       path: 'index',
  //       key: '.system2.index',
  //       name: '测试2',
  //       component: () => import("../views/test.vue")
  //     },
  //     {
  //       key: '.system1.index2',
  //       path: 'index2',
  //       name: '测试22',
  //       component: () => import("../views/test.vue")
  //     }
  //   ]
  // },
  // {
  //   path: '/system3',
  //   component: Layout,
  //   name: '系统管理3',
  //   key: '.system3',
  //   iconType: 'icon-windows',
  //   children: [
  //     {
  //       path: 'index',
  //       name: '测试3',
  //       key: '.system3.index',
  //       component: () => import("../views/test.vue")
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap
})

export default router
