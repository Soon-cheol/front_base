import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export const router = new VueRouter({
  mode: 'history',
  routes: [
    //path : url 주소, component : 페이지에 보여질 컴포넌트
    // {
    //   path: '/',
    //   redirect: '/index'
    // },
    {
      path: '/',
      name: 'main',
      component: () => import('@/pages/main.vue')
    },
    {
      path: '/parent',
      name: 'parent',
      component: () => import('@/pages/parent.vue')
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('@/activity/activityPlayer.vue')
    }
  ]
})
