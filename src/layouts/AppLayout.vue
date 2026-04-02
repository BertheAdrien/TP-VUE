<template>
  <div class="app-layout">
    <AppSidebar />
    <div class="app-layout__main">
      <AppTopbar :title="currentTitle" />
      <main class="app-layout__content">
        <!-- Dynamic content injection -->
        <component :is="currentView" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppSidebar from '../components/AppSidebar.vue'
import AppTopbar from '../components/AppTopbar.vue'
import UserManagement from '../views/UserManagement.vue'

// Simule un routeur minimaliste
const currentRoute = ref('users')

const views = {
  users: UserManagement,
}

const titles = {
  users: 'User Management',
}

const currentView = computed(() => views[currentRoute.value] || UserManagement)
const currentTitle = computed(() => titles[currentRoute.value] || 'Dashboard')
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f4f5f9;
  font-family: 'DM Sans', 'Nunito', -apple-system, sans-serif;
}

.app-layout__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.app-layout__content {
  flex: 1;
  overflow-y: auto;
}
</style>
