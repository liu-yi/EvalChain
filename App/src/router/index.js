import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index')},
  {path: '/404', component: () => import('@/views/404')},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/info',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Info',
        component: () => import('@/views/info/index'),
        meta: { title: 'Info'}
      }

    ]
  },
  {
    path: '/courses',
    component: Layout,
    redirect: '/unfinished',
    name: 'Courses',
    children: [
      {
        path: 'unfinished',
        component: () => import('@/views/unfinished/index'),
        name: 'Unfinished',
        meta: { title: 'Unfinished'}
      },
      {
        path: 'finished',
        component: () =>import('@/views/finished/index'),
        name: 'Finished',
        meta: { title: 'Finished' }
      }
    ]
  },
  {
    path: '/help',
    component: Layout,
    children: [
      {
        path:'index',
        name: 'Help',
        component: () => import('@/views/help/index'),
        meta: {title: 'Help'}
      }
    ]
  },

  {path: '*', redirect: '/404'}

]

export default new Router({
  scrollBehavior: () => ({y:0}),
  routes: constantRouterMap
})
