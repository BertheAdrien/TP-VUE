import { createRouter, createWebHistory } from 'vue-router'
import UserManagement from '../views/UserManagement.vue'
import GroupManagement from '../views/GroupManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/users',
      name: 'user-management',
      component: UserManagement,
    },
    {
      path: '/groups',
      name: 'group-management',
      component: GroupManagement,
    },
  ],
})

export default router
