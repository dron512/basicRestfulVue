import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue';
import LogoutPage from '@/pages/LogoutPage.vue';
import JoinPage from '@/pages/JoinPage.vue';


import Home from '@/pages/Home.vue';
import FreeBoard from '@/pages/FreeBoard.vue';
import FreeBoardInput from '@/pages/FreeBoardInput.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Join',
    name: 'join',
    component: JoinPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutPage
  },
  {
    path: '/freeboard',
    name: 'freeboard',
    component: FreeBoard
  },
  {
    path: '/freeboard/input',
    name: 'freeboardinput',
    component: FreeBoardInput
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
