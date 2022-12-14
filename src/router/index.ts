import TheAuthVue from '@/components/TheAuth.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/users/:id/',
      name: 'user',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/auth/',
      name: 'auth',
      component: TheAuthVue,
    }
  ]
})

export default router
