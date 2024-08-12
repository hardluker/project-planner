import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AddProject from '@/views/AddProject.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add',
    name: 'AddProject',
    component: AddProject
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
