import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'
import Meta from 'vue-meta'
import DrawFlow from "./components/DrawFlow";
import ant from "ant-design-vue";
import "ant-design-vue/dist/antd.min.css";

/**
 * @description 生产环境默认都使用mock，如果正式用于生产环境时，记得去掉
 */

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('@/utils/static')
  mockXHR()
}

Vue.use(Meta)
Vue.use(DrawFlow)
Vue.use(ant)

Vue.config.productionTip = false
//vue-admin-beautiful
new Vue({
  el: '#wpixel-admin',
  router,
  store,
  render: (h) => h(App),
})
