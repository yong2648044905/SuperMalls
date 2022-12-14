import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const Home = () => import('@/view/home/Home.vue');

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path :'/home',
    component:Home
  }
]

const router = new Router({
  routes,
  mode: 'history',
});
export default router
