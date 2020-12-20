import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from './utils/http'
import api from  './api'
import base from './api/base';
import storage from './utils/storage.js'

// 引入element-ui
import ElementUI from 'element-ui';
import commonFn from './utils/common'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.api= api
Vue.prototype.storage=storage
Vue.prototype.commonFn = commonFn;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
