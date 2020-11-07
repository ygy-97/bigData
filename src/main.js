import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import echarts from 'echarts'
import './assets/css/reset.css'
import './assets/css/global.less'

import '../public/static/theme/chalk' //主题
import '../public/static/theme/vintage'

import './assets/font/iconfont.css'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
