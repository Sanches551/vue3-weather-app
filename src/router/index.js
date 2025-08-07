import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import City from '../pages/City.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/weather/:city',
      name: 'city',
      component: City,
      meta: {
        title: 'Weather'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${
      to.params.city ? to.params.city : to.meta.title
  } | Weather APP`;
  next();
});

export default router;
