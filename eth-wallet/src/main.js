import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import Home from './views/Home.vue'
import router from './router'
import store from './store'
import api from "./api"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App),
  components: {
    Home
  },
  router,
  store,
  api,
});
