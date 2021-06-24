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
  
  // {
  //   path: '/person',
  //   component: () => import('@/views/person/index.vue'),
  //   meta: {
  //     navShow: true
  //   }
  // },
  // {
  //   path: '/message',
  //   component: () => import('@/views/message/index.vue'),
  //   meta: {
  //     navShow: true
  //   }
  // },
  // {
  //   path: '/mine',
  //   component: () => import('@/views/mine/index.vue'),
  //   meta: {
  //     navShow: true
  //   }
  // },
  // {
  //   path: '/snap',
  //   component: () => import('@/views/device/snap.vue'),
  //   meta: {
  //     navShow: false
  //   }
  // },
  // {
  //   path: '/bukong',
  //   component: () => import('@/views/person/bukong.vue'),
  //   meta: {
  //     navShow: false
  //   }
  // },
  // {
  //   path: '/videoMonitor/:id',
  //   component: () => import('@/views/device/videoMonitor.vue'),
  //   meta: {
  //     navShow: false
  //   }
  // },
  // {
  //   path: '/cloudVideo',
  //   component: () => import('@/views/device/cloudVideo.vue'),
  //   meta: {
  //     navShow: false
  //   }
  // },
  // {
  //   path: '/Capture',
  //   component: () => import('@/views/device/Capture.vue'),
  //   meta: {
  //     navShow: false
  //   }
  // },
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
