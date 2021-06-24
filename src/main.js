import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/router/permission'
import Vant from 'vant';
import 'vant/lib/index.css'
import "@/assets/font/iconfont.css";
import './styles/index.less'
// import vConsole from 'vconsole'
    
// 移动端打印
// Vue.prototype.$vConsole = new vConsole()
Vue.config.productionTip = false;

// 项目启动时，加载自适应配置
(function () {
  var rem = document.createElement('script');
  rem.src = './rem.js';
  document.body.appendChild(rem)
})()

Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
