import Vue from 'vue'
import App from './app.vue'
import CreateEditor from '../../components/create-editor'
import store from '../../store'
import router from '../../router'

Vue.use(CreateEditor)

require('../boot')({
  router,
  store,
  render: _ => _(App)
})

