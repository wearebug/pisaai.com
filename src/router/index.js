import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: '/enhance',
    name: 'enhance',
    component: () => import('../views//home/Home.vue'),
  },
  {
    path: '/color',
    name: 'color',
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: '/changeBG',
    name: 'changeBG',
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: '/deadee',
    name: 'deadee',
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: '/idphoto',
    name: 'idphoto',
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
