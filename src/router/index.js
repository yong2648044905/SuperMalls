import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
Vue.use(Router)
const Home = () => import('@/view/home/Home.vue');
const Category = () => import('@/view/category/Category.vue');
const cart = () => import('@/view/cart/Cart.vue');
const Profile = () => import('@/view/profile/Profile.vue');
const Detail = () => import('@/view/detail/Detail.vue');



const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/Cart',
    component: cart
  },
  {
    path: '/Profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail,
  }
]

const router = new Router({
  routes,
  mode: 'history',
});
export default router
