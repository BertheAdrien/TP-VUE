<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar__logo">
      <div class="sidebar__logo-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L1 9L12 15L23 9L12 3Z" fill="white" />
          <path d="M1 15L12 21L23 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <span class="sidebar__logo-text">GavaLab</span>
    </div>

    <!-- Navigation -->
    <nav class="sidebar__nav">
      <div class="sidebar__section">
        <p class="sidebar__section-label">STUDENT</p>
        <ul>
          <li>
            <a href="#" class="sidebar__link" :class="{ 'sidebar__link--active': currentRoute === 'catalog' }" @click.prevent="$emit('navigate', 'catalog')">
              <svg class="sidebar__icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.255 0 2.443.29 3.5.804V4.804zM11 4.804A7.968 7.968 0 0114.5 4c1.255 0 2.443.29 3.5.804v10A7.969 7.969 0 0014.5 14c-1.255 0-2.443.29-3.5.804V4.804z"/>
              </svg>
              Course Catalog
            </a>
          </li>
          <li>
            <a href="#" class="sidebar__link" :class="{ 'sidebar__link--active': currentRoute === 'workspace' }" @click.prevent="$emit('navigate', 'workspace')">
              <svg class="sidebar__icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
              Learning Workspace
            </a>
          </li>
        </ul>
      </div>

      <div class="sidebar__section">
        <p class="sidebar__section-label">TEACHER</p>
        <ul>
          <li>
            <a href="#" class="sidebar__link" :class="{ 'sidebar__link--active': currentRoute === 'courses' }" @click.prevent="$emit('navigate', 'courses')">
              <svg class="sidebar__icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
              </svg>
              Course List
            </a>
          </li>
        </ul>
      </div>

      <div class="sidebar__section">
        <p class="sidebar__section-label">ADMIN</p>
        <ul>
          <li>
            <a href="#" class="sidebar__link" :class="{ 'sidebar__link--active': currentRoute === 'users' }" @click.prevent="$emit('navigate', 'users')">
              <svg class="sidebar__icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              User Management
            </a>
          </li>
          <li>
            <a href="#" class="sidebar__link" :class="{ 'sidebar__link--active': currentRoute === 'groups' }" @click.prevent="$emit('navigate', 'groups')">
              <svg class="sidebar__icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
              </svg>
              Group Management
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="sidebar__footer">
      <a href="#" class="sidebar__link sidebar__link--footer">
        <svg class="sidebar__icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
        </svg>
        Help
      </a>
      <a href="#" class="sidebar__link sidebar__link--footer sidebar__link--logout">
        <svg class="sidebar__icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
        </svg>
        Log Out
      </a>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  currentRoute: { type: String, default: 'users' },
})
defineEmits(['navigate'])
</script>

<style scoped>
.sidebar {
  width: 210px;
  min-height: 100vh;
  background: #fff;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  padding: 0 0 20px 0;
  flex-shrink: 0;
}

.sidebar__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 20px 24px;
}

.sidebar__logo-icon {
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, #ff6b9d, #ff4081);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar__logo-icon svg { width: 18px; height: 18px; }

.sidebar__logo-text {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.3px;
}

.sidebar__nav { flex: 1; padding: 0 12px; overflow-y: auto; }
.sidebar__section { margin-bottom: 18px; }
.sidebar__section ul { list-style: none; margin: 0; padding: 0; }

.sidebar__section-label {
  font-size: 10px;
  font-weight: 600;
  color: #aab0bc;
  letter-spacing: 0.8px;
  margin: 0 0 6px 8px;
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  color: #6b7280;
  font-size: 13.5px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  margin-bottom: 2px;
}

.sidebar__link:hover { background: #f5f5f8; color: #1a1a2e; }

.sidebar__link--active { background: #f0eeff; color: #6c47ff; }
.sidebar__link--active .sidebar__icon { color: #6c47ff; }

.sidebar__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: #9ca3af;
  transition: color 0.15s;
}

.sidebar__link:hover .sidebar__icon { color: #6c47ff; }

.sidebar__footer {
  padding: 8px 12px 0;
  border-top: 1px solid #f3f4f6;
  margin-top: 8px;
}

.sidebar__link--logout:hover { color: #ef4444; background: #fff5f5; }
</style>
