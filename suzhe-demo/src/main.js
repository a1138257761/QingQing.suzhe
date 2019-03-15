import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import http from "./http";
import Element from "element-ui";

Vue.use(Element);
Vue.use(http);
Vue.config.productionTip = false;

export const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
