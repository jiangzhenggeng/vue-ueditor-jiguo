import Vue from 'vue'
import Loading from '../components/loading/index'
Vue.use(Loading)

import mainMixins from './mainMixins'

module.exports = function (options) {
  options.el = options.el || '#app'
  options.mixins = options.mixins || []
  options.mixins = [mainMixins, ...options.mixins]
  if( options.router && options.store ){
    options.router.beforeEach((to, from, next) => {
      options.store.dispatch('routerLoading', true)
      next()
    })
    options.router.afterEach((to, from) => {
      options.store.dispatch('routerLoading', false)
    })
  }

  return new Vue(options)
}


