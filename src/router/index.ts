import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/history',
    name: 'History',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/History.vue'),
  },
  {
    path: '/history/:direction',
    name: 'HistoryDirection',
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/History.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
