import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: hotBar
  // },
  {
    path: '/seller',
    component: () => import(/* webpackChunkName: "about" */ '../views/sellerPage.vue')
  },
  {
    path: '/trend',
    component: () => import('../views/trendPage.vue')
  },
  {
    path: '/map',
    component: () => import('../views/mapPage.vue')
  }, {
    path: '/rank',
    component: () => import('../views/rankPage.vue')
  },{
    path:'/hotproduct',
    component:()=>import('../views/hotProductPage.vue')
  }
]
const router = new VueRouter({
  routes
})
export default router