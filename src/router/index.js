/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/financial',
    component: Layout,
    redirect: 'noRedirect',
    name: 'financial',
    meta: { title: '财务管理', icon: 'user-tie' },
    children: [
      {
        path: 'revenueSubsidiary',
        name: 'revenueSubsidiary',
        component: () => import('@/views/financial/index'),
        meta: { title: '营收明细' },
      },
      {
        path: 'toolRepair',
        name: 'toolRepair',
        component: () => import('@/views/financial/index'),
        meta: { title: '工具报修' },
      },
    ],
  },
  {
    path: '/orderManager',
    component: Layout,
    redirect: 'noRedirect',
    name: 'orderManager',
    meta: { title: '订单管理', icon: 'user-tie' },
    children: [
      {
        path: 'homeDelivery',
        name: 'homeDelivery',
        component: () => import('@/views/orderManager/homeDelivery'),
        meta: { title: '订单列表' },
      },
      {
        path: 'refundOrders',
        name: 'refundOrders',
        component: () => import('@/views/orderManager/refundOrders'),
        meta: { title: '退款订单' },
      },
      {
        path: 'afterSales',
        name: 'afterSales',
        component: () => import('@/views/orderManager/afterSales'),
        meta: { title: '售后维护' },
      },
    ],
  },
  {
    path: '/commodityManager',
    component: Layout,
    redirect: 'noRedirect',
    name: 'commodityManager',
    meta: { title: '商品管理', icon: 'user-tie' },
    children: [
      {
        path: 'productList',
        name: 'productList',
        component: () => import('@/views/commodityManager/productList'),
        meta: { title: '商品列表' },
      },
      {
        hidden: true,
        path: 'addDelivery',
        name: 'addDelivery',
        component: () => import('@/views/commodityManager/addDelivery'),
        meta: { title: '添加商品' },
      },
      {
        path: 'recommend',
        name: 'recommend',
        component: () => import('@/views/commodityManager/recommend'),
        meta: { title: '商品推荐' },
      },
      {
        path: 'type',
        name: 'type',
        component: () => import('@/views/commodityManager/type'),
        meta: { title: '商品分类' },
      },
      {
        path: 'freightTemplate',
        name: 'freightTemplate',
        component: () => import('@/views/commodityManager/freightTemplate'),
        meta: { title: '运费模板' },
      },
    ],
  },
  {
    path: '/business',
    component: Layout,
    redirect: 'noRedirect',
    name: 'commodityManager',
    meta: { title: '业务管理', icon: 'user-tie' },
    children: [
      {
        path: 'franchisee',
        name: 'franchisee',
        component: () => import('@/views/business/franchisee'),
        meta: { title: '加盟商' },
      },
      {
        path: 'vip',
        name: 'vip',
        component: () => import('@/views/business/vip'),
        meta: { title: '会员管理' },
      },
    ],
  },
  {
    path: '/personalCenter',
    component: Layout,
    redirect: 'noRedirect',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/personalCenter/index'),
        meta: {
          title: '个人信息',
          icon: 'marker',
          permissions: ['admin'],
        },
      },
    ],
  },
  /* {
    path: "/test",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "test",
        name: "Test",
        component: () => import("@/views/test/index"),
        meta: {
          title: "test",
          icon: "marker",
          permissions: ["admin"],
        },
      },
    ],
  }, */
  {
    path: '/vab',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Vab',
    //alwaysShow: true,
    meta: { title: '组件', icon: 'box-open' },
    children: [
      {
        path: 'permissions',
        name: 'Permission',
        component: () => import('@/views/vab/permissions/index'),
        meta: {
          title: '角色权限',
          permissions: ['admin', 'editor'],
        },
      },
      {
        path: 'icon',
        component: EmptyLayout,
        redirect: 'noRedirect',
        name: 'Icon',
        meta: {
          title: '图标',
          permissions: ['admin'],
        },
        children: [
          {
            path: 'awesomeIcon',
            name: 'AwesomeIcon',
            component: () => import('@/views/vab/icon/index'),
            meta: { title: '常规图标' },
          },
          {
            path: 'colorfulIcon',
            name: 'ColorfulIcon',
            component: () => import('@/views/vab/icon/colorfulIcon'),
            meta: { title: '多彩图标' },
          },
        ],
      },
      {
        path: 'table',
        component: () => import('@/views/vab/table/index'),
        name: 'Table',
        meta: {
          title: '表格',
          permissions: ['admin'],
        },
      },
      {
        path: 'map',
        component: () => import('@/views/vab/map/index'),
        name: 'Map',
        meta: {
          title: '地图',
          permissions: ['admin'],
        },
      },

      {
        path: 'webSocket',
        name: 'WebSocket',
        component: () => import('@/views/vab/webSocket/index'),
        meta: { title: 'webSocket', permissions: ['admin'] },
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/vab/form/index'),
        meta: { title: '表单', permissions: ['admin'] },
      },
      {
        path: 'element',
        name: 'Element',
        component: () => import('@/views/vab/element/index'),
        meta: { title: '常用组件', permissions: ['admin'] },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/vab/tree/index'),
        meta: { title: '树', permissions: ['admin'] },
      },
      {
        path: 'verify',
        name: 'Verify',
        component: () => import('@/views/vab/verify/index'),
        meta: { title: '验证码', permissions: ['admin'] },
      },
      {
        path: 'menu1',
        component: () => import('@/views/vab/nested/menu1/index'),
        name: 'Menu1',
        alwaysShow: true,
        meta: {
          title: '嵌套路由 1',
          permissions: ['admin'],
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu1-1',
            alwaysShow: true,
            meta: { title: '嵌套路由 1-1' },
            component: () => import('@/views/vab/nested/menu1/menu1-1/index'),

            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu1-1-1',
                meta: { title: '嵌套路由 1-1-1' },
                component: () =>
                  import('@/views/vab/nested/menu1/menu1-1/menu1-1-1/index'),
              },
            ],
          },
        ],
      },
      {
        path: 'magnifier',
        name: 'Magnifier',
        component: () => import('@/views/vab/magnifier/index'),
        meta: { title: '放大镜', permissions: ['admin'] },
      },
      {
        path: 'loading',
        name: 'Loading',
        component: () => import('@/views/vab/loading/index'),
        meta: { title: 'loading', permissions: ['admin'] },
      },
      {
        path: 'player',
        name: 'Player',
        component: () => import('@/views/vab/player/index'),
        meta: { title: '视频播放器', permissions: ['admin'] },
      },
      {
        path: 'markdownEditor',
        name: 'MarkdownEditor',
        component: () => import('@/views/vab/markdownEditor/index'),
        meta: { title: 'markdown编辑器', permissions: ['admin'] },
      },
      {
        path: 'editor',
        name: 'Editor',
        component: () => import('@/views/vab/editor/index'),
        meta: {
          title: '富文本编辑器',
          permissions: ['admin'],
          badge: 'New',
        },
      },
      {
        path: 'backToTop',
        name: 'BackToTop',
        component: () => import('@/views/vab/backToTop/index'),
        meta: { title: '返回顶部', permissions: ['admin'] },
      },
      {
        path: 'lodash',
        name: 'Lodash',
        component: () => import('@/views/vab/lodash/index'),
        meta: { title: 'lodash', permissions: ['admin'] },
      },
      {
        path: 'smallComponents',
        name: 'SmallComponents',
        component: () => import('@/views/vab/smallComponents/index'),
        meta: { title: '小组件', permissions: ['admin'] },
      },

      {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/views/vab/upload/index'),
        meta: { title: '上传', permissions: ['admin'] },
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/vab/errorLog/index'),
        meta: { title: '错误日志模拟', permissions: ['admin'] },
      },
      {
        path: 'https://github.com/chuzhixin/vue-admin-beautiful?utm_source=gold_browser_extension',
        name: 'ExternalLink',
        meta: {
          title: '外链',
          target: '_blank',
          permissions: ['admin', 'editor'],
          badge: 'New',
        },
      },
      {
        path: 'more',
        name: 'More',
        component: () => import('@/views/vab/more/index'),
        meta: { title: '关于', permissions: ['admin'] },
      },
    ],
  },
  {
    path: '/personnelManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'PersonnelManagement',
    meta: { title: '配置', icon: 'users-cog', permissions: ['admin'] },
    children: [
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: () =>
          import('@/views/personnelManagement/userManagement/index'),
        meta: { title: '用户管理' },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () =>
          import('@/views/personnelManagement/roleManagement/index'),
        meta: { title: '角色管理' },
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: () =>
          import('@/views/personnelManagement/menuManagement/index'),
        meta: { title: '菜单管理', badge: 'New' },
      },
    ],
  },
  {
    path: '/mall',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Mall',
    meta: {
      title: '商城',
      icon: 'shopping-cart',
      permissions: ['admin'],
    },

    children: [
      {
        path: 'pay',
        name: 'Pay',
        component: () => import('@/views/mall/pay/index'),
        meta: {
          title: '支付',
          noKeepAlive: true,
        },
        children: null,
      },
      {
        path: 'goodsList',
        name: 'GoodsList',
        component: () => import('@/views/mall/goodsList/index'),
        meta: {
          title: '商品列表',
        },
      },
    ],
  },
  {
    path: '/error',
    component: EmptyLayout,
    redirect: 'noRedirect',
    name: 'Error',
    meta: { title: '错误页', icon: 'bug' },
    children: [
      {
        path: '401',
        name: 'Error401',
        component: () => import('@/views/401'),
        meta: { title: '401' },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/404'),
        meta: { title: '404' },
      },
    ],
  },
  {
    path: '/analysis',
    component: Layout,
    redirect: 'noRedirect',
    name: 'analysis',
    meta: { title: '分析', icon: 'binoculars' },
    children: [
      {
        path: 'portrait',
        name: 'Portrait',
        component: () => import('@/views/401'),
        meta: { title: '画像报告' },
      },
      {
        path: 'portrait',
        name: 'Portrait',
        component: () => import('@/views/401'),
        meta: { title: '画像报告' },
      },
    ],
  },
  {
    path: '/extension',
    component: Layout,
    redirect: 'noRedirect',
    name: 'extension',
    meta: { title: '推广', icon: 'hand-holding-heart' },
    children: [
      {
        path: 'weChat',
        name: 'WeChat',
        component: () => import('@/views/weChat/index'),
        meta: { title: '微信公众号' },
      },
      {
        path: 'weChat-config',
        name: 'WeChat-config',
        hidden: true,
        component: () => import('@/views/weChat/config'),
        meta: { title: '推广应用' },
      },
      {
        path: 'weChat1',
        name: 'WeChat1',
        component: () => import('@/views/401'),
        meta: { title: '微信公众号1' },
      },
    ],
  },
  {
    path: '/staff',
    component: Layout,
    redirect: 'noRedirect',
    name: 'staff',
    meta: { title: '员工管理', icon: 'user-tie' },
    children: [
      {
        path: 'weChat',
        name: 'WeChat',
        component: () => import('@/views/weChat/index'),
        meta: { title: '员工管理1' },
      },
      {
        path: 'weChat-config',
        name: 'WeChat-config',
        component: () => import('@/views/weChat/config'),
        meta: { title: '员工管理2' },
      },
    ],
  },
  {
    path: '/plugins',
    component: Layout,
    redirect: 'plugins',
    children: [
      {
        path: 'plugins',
        name: 'plugins',
        component: () => import('@/views/index/index'),
        meta: {
          title: '插件中心',
          icon: 'cube',
        },
      },
    ],
  },
  {
    path: '/ORMSetting',
    component: Layout,
    redirect: 'ORMSetting',
    children: [
      {
        path: 'ORMSetting',
        name: 'ORMSetting',
        component: () => import('@/views/orm/flowData'),
        meta: {
          title: 'ORM配置',
        },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
  {
    path: '/activeTheme',
    component: EmptyLayout,
    hidden: true,
    redirect: 'noRedirect',
    name: 'show',
    meta: { title: '推广活动预览', icon: 'bug' },
    children: [
      {
        path: 'show',
        name: 'show',
        component: () => import('@/views/weChat/activeShow'),
        meta: { title: '推广活动预览' },
      },
    ],
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
