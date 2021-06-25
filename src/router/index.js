import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      navShow: false
    }
  },
  {
    path: '/home',
    component:() => import('@/views/home/index.vue'),
    meta: {
      navShow: false
    }
  },
  {
    path: '/submitHour',
    component: () => import('@/views/submitHour/index.vue'),
    meta: {
      navShow: false
    }
  },
  
  {
    path: '/fillInHour',
    component: () => import('@/views/fillInHour/index.vue'),
    meta: {
      navShow: false
    }
  },
  {
    path: '/projectSelect',
    component: () => import('@/views/projectSelect/index.vue'),
    meta: {
      navShow: false
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
