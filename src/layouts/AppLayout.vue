<template>
  <div class="app-layout">
    <AppSidebar />
    <div class="app-layout__main">
      <AppTopbar :title="currentTitle" />
      <main class="app-layout__content">
        <Transition name="fade-slide" mode="out-in">
          <router-view />
        </Transition>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import AppSidebar from '../components/AppSidebar.vue'
import AppTopbar from '../components/AppTopbar.vue'

const route = useRoute()

const titles = {
  '/users': 'User Management',
  '/groups': 'Group Management',
}

const currentTitle = computed(() => titles[route.path] || 'Dashboard')
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f4f5f9;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
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

/* Transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
