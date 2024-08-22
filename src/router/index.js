import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue';
import Home from '@/pages/Home.vue';
import FreeBoard from '@/pages/FreeBoard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'loginPage',
    component: LoginPage
  },
  {
    path: '/freeboard',
    name: 'freeboard',
    component: FreeBoard
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
