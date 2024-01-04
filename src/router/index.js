import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

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

// 全局前置导航守卫 => 所有路由到真正被访问之前 都会先经过全局前置导航守卫
//  to:  到哪去的完整路由对象(路径，参数)
// from: 从哪的完整路由对象(路径，参数)
// next: 是否放行
// 1、 next() 直接放行
// 2、next(路径) 进行拦截，拦截到next()里配置的路径

const authUrls = ['/myOrder', '/pay']
router.beforeEach((to, from, next) => {
  // 非权限页面 直接放行
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  // 权限页面 验证token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
