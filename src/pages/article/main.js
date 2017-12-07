import Vue from 'vue'
import Uploader from '../../components/jui-simple-uploader'

import App from './app.vue'
import CreateEditor from '../../components/create-editor'
import store from '../../store'
import router from '../../router'

Vue.use(CreateEditor)
Vue.use(Uploader)

require('../boot')({
  router,
  store,
  render: _ => _(App)
})

