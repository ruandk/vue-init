import Vue from 'vue'
import VueRouter from 'vue-router'

import { Storage } from '@/utils'

// 解决路由to=from报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function repalce (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          avoidAuth: true
        },
        component: () => import('@/views/home/home.vue')
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          avoidAuth: false
        },
        component: () => import('@/views/home/about/about.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      avoidAuth: true
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/store',
    name: 'store',
    meta: {
      avoidAuth: true
    },
    component: () => import('@/views/store/store.vue')
  },
  {
    path: '/goods-comment',
    name: 'goods-comment',
    meta: {
      avoidAuth: true
    },
    component: () => import('@/views/store/goods-comment/goods-comment.vue')
  },
  {
    path: '/goods-detail',
    name: 'goods-detail',
    meta: {
      avoidAuth: true
    },
    component: () => import('@/views/store/goods-detail/goods-detail.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const { path, meta } = to
  const AUTH_TOKEN = Storage.getItem(Storage.AUTH_TOKEN)
  const whitelist = ['/login']

  if (whitelist.includes(path) || AUTH_TOKEN || meta.avoidAuth) {
    next()
  } else {
    next('/login')
  }

  if (meta.title) {
    document.title = meta.title
  }
})

router.afterEach((to, from) => {})

export default router
