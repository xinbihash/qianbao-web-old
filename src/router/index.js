import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '新币钱包平台', icon: 'dashboard' }
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   hidden: true,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  {
    path: '/wallet',
    component: Layout,
    redirect: '/wallet/index',
    name: '新币钱包',
    meta: { title: '新币钱包', icon: 'el-icon-s-help' },
    children: [
      // {
      //   path: 'dashboard',
      //   name: '钱包概览',
      //   component: () => import('@/views/wallet/dashboard'),
      //   meta: { title: '钱包概览', icon: 'dashboard' }
      // },
      {
        path: 'blchange',
        name: '资产变动',
        component: () => import('@/views/wallet/blchange'),
        meta: { title: '资产变动', icon: 'tree' }
      },
      {
        path: 'recharge',
        name: '充值',
        component: () => import('@/views/wallet/recharge'),
        meta: { title: '充值', icon: 'tree' }
      },
      {
        path: 'withdraw',
        name: '提现',
        component: () => import('@/views/wallet/withdraw'),
        meta: { title: '提现', icon: 'tree' }
      },
      {
        path: 'transfer',
        name: '转账',
        component: () => import('@/views/wallet/transfer'),
        meta: { title: '转账', icon: 'tree' }
      },
      {
        path: 'bonusrecord',
        name: '彩金记录',
        component: () => import('@/views/wallet/bonusrecord'),
        meta: { title: '彩金记录', icon: 'tree' }
      },
      {
        path: 'profitbetamount',
        name: '每日流水收益',
        component: () => import('@/views/wallet/profitbetamount'),
        meta: { title: '每日流水收益', icon: 'tree' }
      },
      {
        path: 'flash',
        name: '钱包闪兑',
        component: () => import('@/views/wallet/flash'),
        meta: { title: '钱包闪兑', icon: 'tree' }
      },
      {
        path: 'user',
        name: '用户',
        component: () => import('@/views/wallet/user'),
        meta: { title: '用户', icon: 'tree' }
      },
      {
        path: 'envelope',
        name: '红包',
        component: () => import('@/views/wallet/envelope'),
        meta: { title: '红包', icon: 'tree' }
      },
      // {
      //   path: 'envelopeInfo',
      //   name: '红包详情',
      //   component: () => import('@/views/wallet/envelopeInfo'),
      //   meta: { title: '红包详情', icon: 'tree' }
      // },
      {
        path: 'MasterCard',
        name: '万事达卡',
        component: () => import('@/views/wallet/mastercard'),
        meta: { title: '万事达卡', icon: 'tree' }
      },
      {
        path: 'group',
        name: '群组',
        component: () => import('@/views/wallet/group'),
        meta: { title: '群组', icon: 'tree' }
      },
      {
        path: 'userOverview',
        name: '钱包用户每日统计',
        component: () => import('@/views/wallet/useroverview'),
        meta: { title: '钱包用户每日统计', icon: 'tree' }
      },
      {
        path: 'gameOverview',
        name: '钱包游戏每日统计',
        component: () => import('@/views/wallet/gameoverview'),
        meta: { title: '钱包游戏每日统计', icon: 'tree' }
      },
      {
        path: 'userlist',
        name: '钱包用户数据统计',
        component: () => import('@/views/wallet/userlist'),
        meta: { title: '钱包用户数据统计', icon: 'tree' }
      },
    ]
  },

  {
    path: '/flash',
    component: Layout,
    redirect: '/flash/index',
    name: '闪兑',
    meta: { title: '闪兑', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'dashboard',
        name: '闪兑概览',
        component: () => import('@/views/flash/dashboard'),
        meta: { title: '闪兑概览', icon: 'tree' }
      },
      {
        path: 'recharge',
        name: '充值',
        component: () => import('@/views/flash/recharge'),
        meta: { title: '充值', icon: 'tree' }
      },
      {
        path: 'order',
        name: '订单',
        component: () => import('@/views/flash/order'),
        meta: { title: '订单', icon: 'tree' }
      }
    ]
  },
  {
    path: '/pchigh',
    component: Layout,
    redirect: '/pchigh/index',
    name: 'pc28高倍',
    meta: { title: 'pc28高倍', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'dashboard',
        name: '游戏概览',
        component: () => import('@/views/tree/index'),
        meta: { title: '游戏概览', icon: 'tree' }
      },
      {
        path: 'groupall',
        name: '群组总览',
        component: () => import('@/views/pchigh/groupall'),
        meta: { title: '群组总览', icon: 'tree' }
      },
      {
        path: 'groupday',
        name: '群组每日概览',
        component: () => import('@/views/pchigh/groupday'),
        meta: { title: '群组每日概览', icon: 'tree' }
      },
      {
        path: 'order',
        name: '投注列表',
        component: () => import('@/views/pchigh/order'),
        meta: { title: '投注列表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/pcnormal',
    component: Layout,
    redirect: '/pcnormal/index',
    name: 'pc28网盘',
    meta: { title: 'pc28网盘', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'dashboard',
        name: '游戏概览',
        component: () => import('@/views/tree/index'),
        meta: { title: '游戏概览', icon: 'tree' }
      },
      {
        path: 'order',
        name: '投注列表',
        component: () => import('@/views/pcnormal/order'),
        meta: { title: '投注列表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/pcfive',
    component: Layout,
    redirect: '/pchigh/index',
    name: 'pc28-5.0',
    meta: { title: 'pc28-5.0', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'dashboard',
        name: '游戏概览',
        component: () => import('@/views/tree/index'),
        meta: { title: '游戏概览', icon: 'tree' }
      },
      // {
      //   path: 'groupall',
      //   name: '群组总览',
      //   component: () => import('@/views/pcfive/groupall'),
      //   meta: { title: '群组总览', icon: 'tree' }
      // },
      // {
      //   path: 'groupday',
      //   name: '群组每日概览',
      //   component: () => import('@/views/pcfive/groupday'),
      //   meta: { title: '群组每日概览', icon: 'tree' }
      // },
      {
        path: 'order',
        name: '投注列表',
        component: () => import('@/views/pcfive/order'),
        meta: { title: '投注列表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/pcfoursix',
    component: Layout,
    redirect: '/pcfoursix/index',
    name: 'pc28-4.6',
    meta: { title: 'pc28-4.6', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'dashboard',
        name: '游戏概览',
        component: () => import('@/views/tree/index'),
        meta: { title: '游戏概览', icon: 'tree' }
      },
      {
        path: 'order',
        name: '投注列表',
        component: () => import('@/views/pcfoursix/order'),
        meta: { title: '投注列表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/mine',
    component: Layout,
    redirect: '/mine/index',
    name: '扫雷',
    meta: { title: '扫雷', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'recharge',
        name: '游戏概览',
        component: () => import('@/views/tree/index'),
        meta: { title: '游戏概览', icon: 'tree' }
      },
      {
        path: 'order',
        name: '投注列表',
        component: () => import('@/views/mine/order'),
        meta: { title: '投注列表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/diceauto',
    component: Layout,
    redirect: '/diceauto/index',
    name: '骰子自动',
    meta: { title: '骰子自动', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'order',
        name: '骰子自动',
        component: () => import('@/views/dice/auto'),
        meta: { title: '骰子自动', icon: 'tree' }
      }
    ]
  },
  {
    path: '/dicehand',
    component: Layout,
    redirect: '/dicehand/index',
    name: '骰子手动',
    meta: { title: 'pc28网盘', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'order',
        name: '骰子手动',
        component: () => import('@/views/dice/hand'),
        meta: { title: '骰子手动', icon: 'tree' }
      }
    ]
  },

  {
    path: '/diceprivateauto',
    component: Layout,
    redirect: '/diceprivateauto/index',
    name: '私聊骰子自动',
    meta: { title: '私聊骰子自动', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'order',
        name: '私聊骰子自动',
        component: () => import('@/views/dice/privateauto'),
        meta: { title: '私聊骰子自动', icon: 'tree' }
      }
    ]
  },
  {
    path: '/diceprivatehand',
    component: Layout,
    redirect: '/diceprivatehand/index',
    name: '私聊骰子手动',
    meta: { title: '私聊骰子手动', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'order',
        name: '私聊骰子手动',
        component: () => import('@/views/dice/privatehand'),
        meta: { title: '私聊骰子手动', icon: 'tree' }
      }
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
