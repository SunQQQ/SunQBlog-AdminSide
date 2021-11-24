// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import './assets/css/base.less'
import CommonFunction from './util/util'
import * as echarts from 'echarts'

Vue.config.productionTip = false
Vue.use(CommonFunction);
Vue.prototype.bus = new Vue;
Vue.prototype.$echarts = echarts;

// 注册ElementUI
Vue.use(ElementUI);

new Vue({
  el: '#app',
  render:h => h(App),
  router:router,
  components: { App:App },   //局部注册组件
  template: '<App></App>'   //直接使用上面组件App喽
})
