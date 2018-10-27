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
// 配置axios基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 配置axios请求守卫（拦截器）
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers['Authorization'] = window.localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

Vue.prototype.$http = axios

new Vue({
  ElementUI,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
