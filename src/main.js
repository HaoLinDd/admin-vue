import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import '@/assets/css/index.css'
import axios from 'axios'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  ElementUI,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
