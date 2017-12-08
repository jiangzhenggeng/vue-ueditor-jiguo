import Vue from 'vue'
import Router from 'vue-router'

const Edit = () => import('../pages/article/pages/edit.vue')

Vue.use(Router)

const debug = process.env.NODE_ENV !== 'production'
const router = new Router({
  //mode: debug ? '' : 'history',
  routes: [
    {
      path: '/admin/article/add(.*)',
      component: Edit
    },
    {
      path: '*',
      redirect: '/admin/article/add.html'
    },
  ]
})

export default router
