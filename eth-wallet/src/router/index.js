import Vue from 'vue'
import VueRouter from 'vue-router'

import api from '../api'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Transfer from '../views/Transfer.vue'
import Confirm from '../views/Confirm.vue'

Vue.use(VueRouter)

const NotFound = { template: '<div>Not Found</div>' }

function checkAuth(to, from, next) {
  if (!api.loggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'index', component: Index },
    { path: '/confirm', name: 'confirm', component: Confirm },
    { path: '/home', name: 'home', component: Home, beforeEnter: checkAuth },
    { path: '/transfer', name: 'transfer', component: Transfer, beforeEnter: checkAuth },
    { path: '*', component: NotFound }
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router