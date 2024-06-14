import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import formCreate from '@form-create/element-ui'
import request from './utils/request'
import modalForm from './utils/modalForm'
import modalSure from './utils/modalSure'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zh from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import Stable from '@/components/Stable'
import './styles/tailwindcss-output.css'

import App from './App'
import store from './store'
import router from './router'

import './filter'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.prototype.$request = request
Vue.prototype.$modalForm = modalForm
Vue.prototype.$modalSure = modalSure
Vue.use(formCreate)
Vue.use(ElementUI, { locale: zh })
Vue.component('s-table', Stable)

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return {
      queryFormGrid: {
        xs: 24,
        sm: 24,
        md: 8,
        lg: 6,
        xl: 6
      }
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
