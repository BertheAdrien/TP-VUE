import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import UserManagement from '../views/UserManagement.vue'
import GroupManagement from '../views/GroupManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          redirect: '/users'
        },
        {
          path: 'users',
          name: 'user-management',
          component: UserManagement,
        },
        {
          path: 'groups',
          name: 'group-management',
          component: GroupManagement,
        },
      ]
    },
  ],
})

export default router
