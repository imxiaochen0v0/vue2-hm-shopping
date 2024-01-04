import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('../views/layout'),
      children: [
        {
          path: '/home',
          component: () => import('../views/layout/home.vue')
        },
        {
          path: '/cart',
          component: () => import('../views/layout/cart.vue')
        },
        {
          path: '/category',
          component: () => import('../views/layout/category.vue')
        },
        {
          path: '/user',
          component: () => import('../views/layout/user.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../views/login/index')
    },
    {
      path: '/myOrder',
      component: () => import('../views/myOrder')
    },
    {
      path: '/pay',
      component: () => import('../views/pay')
    },
    {
      path: '/proDetail/:id',
      component: () => import('../views/proDetail') // 动态路由
    },
    {
      path: '/search',
      component: () => import('../views/search')
    },
    {
      path: '/searchList',
      component: () => import('../views/search/list.vue')
    }
  ]
})

export default router
