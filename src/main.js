
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false
// 添加事件总线来监听图片的加载让scroll插件及时的计算出新的高度
Vue.prototype.$bus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
