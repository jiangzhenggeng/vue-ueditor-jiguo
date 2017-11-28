import loadingComponent from './loading.vue'

const loading = {
  install: function (Vue) {
    Vue.component(loadingComponent.name, loadingComponent)
  }
}

export default loading