import Vue from 'vue'
import ViewUI from 'view-design'
import App from './App'
import store from './store'
import router from './router'
import 'view-design/dist/styles/iview.css'
import './permission'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Util from './assets/js/util.js'
import Api from './assets/js/api.js'
import Resource from 'vue-resource'
Vue.use(ViewUI)
Vue.use(ElementUI)
Vue.use(Resource)
// 请求API
Vue.prototype._API = Api
// 通用方法
Vue.use(Util)
// 提示是否开启提示
Vue.config.productionTip = false

// 网络拦截器
Vue.http.interceptors.push(function (request, next) {
  // 请求出口处理
  next(function (response) {
    if (response.status !== 200) {
      Vue.prototype.$Message.error('访问失败，请重试！')
    }
    // 处理网络异常情况统一或添加其它特殊标识
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
