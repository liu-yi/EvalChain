import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    redirect: '/home/index'
  },
  {
    path: '/home',
    component: Layout,
    // hidden: true,
    children: [{
      path: 'index',
      name: 'Home',
      meta: { title: 'Home', icon: 'home' },
      component: () => import('@/views/home/index')
    }]
  },

  {
    path: '/evaluating',
    component: Layout,
    hidden: true,
    children: [{
      path: ':address',
      name: 'Evaluating',
      meta: { title: 'Evaluating', icon: 'user' },
      component: () => import('@/views/evaluating/index')
    }]
  },

  {
    path: '/evaluated',
    component: Layout,
    hidden: true,
    children: [{
      path: ':address',
      name: 'Evaluated',
      meta: { title: 'Evaluating', icon: 'user' },
      component: () => import('@/views/evaluated/index')
    }]
  },

  {
    path: '/info',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'Information',
        component: () => import('@/views/info/index'),
        meta: { title: 'Information', icon: 'user' }
      }
    ]
  },

  // {
  //   path: '/setup',
  //   component: Layout,
  //   hidden: false,
  //   children: [{
  //     path: '',
  //     name: 'Setup',
  //     meta: { title: 'Setup', icon: 'user' },
  //     component: () => import('@/views/setup/index')
  //   }]
  // },

  {
    path: '/courses',
    component: Layout,
    redirect: '/courses/ongoing',
    name: 'Courses',
    meta: { title: 'Courses', icon: 'course' },
    children: [
      {
        path: 'ongoing',
        name: 'Ongoing',
        component: () => import('@/views/ongoing/index'),
        meta: { title: 'Ongoing', icon: 'ongoing' }
      },
      {
        path: 'finished',
        name: 'Finished',
        component: () => import('@/views/finished/index'),
        meta: { title: 'Finished', icon: 'finish' }
      }
    ]
  },

  {
    path: '/help',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Help',
        component: () => import('@/views/help/index'),
        meta: { title: 'Help', icon: 'user' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    hidden: true,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  }

  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/setup',
    component: Layout,
    hidden: false,
    meta: { role: ['admin'] }, // 页面需要的权限
    children: [{
      path: '',
      name: 'Setup',
      meta: { title: 'Setup', icon: 'publish' },
      component: () => import('@/views/setup/index')
    }]
  },
  { path: '*', redirect: '/404', hidden: true }

]
