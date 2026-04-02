<template>
  <header class="topbar">
    <div class="topbar__title">
      <h1>{{ title }}</h1>
    </div>

    <div class="topbar__right">
      <!-- Search -->
      <div class="topbar__search">
        <svg class="topbar__search-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
        </svg>
        <input type="text" placeholder="Search users..." class="topbar__search-input" />
      </div>

      <!-- Notifications -->
      <button class="topbar__notif">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
        </svg>
        <span class="topbar__notif-badge">3</span>
      </button>

      <!-- User -->
      <div class="topbar__user">
        <img src="https://i.pravatar.cc/36?img=8" alt="Admin" class="topbar__avatar" />
        <div class="topbar__user-info">
          <span class="topbar__user-name">Admin User</span>
          <span class="topbar__user-role">Administrator</span>
        </div>
        <svg class="topbar__chevron" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Dashboard',
  },
})
</script>

<style scoped>
.topbar {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  flex-shrink: 0;
}

.topbar__title h1 {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  letter-spacing: -0.3px;
}

.topbar__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.topbar__search {
  position: relative;
  display: flex;
  align-items: center;
}

.topbar__search-icon {
  position: absolute;
  left: 10px;
  width: 15px;
  height: 15px;
  color: #aab0bc;
  pointer-events: none;
}

.topbar__search-input {
  padding: 7px 14px 7px 34px;
  border: 1px solid #e8e8ef;
  border-radius: 8px;
  font-size: 13px;
  color: #1a1a2e;
  background: #fafafa;
  width: 200px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.topbar__search-input::placeholder {
  color: #aab0bc;
}

.topbar__search-input:focus {
  border-color: #6c47ff;
  box-shadow: 0 0 0 3px rgba(108, 71, 255, 0.08);
  background: #fff;
}

.topbar__notif {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  color: #6b7280;
  transition: background 0.15s;
}

.topbar__notif:hover {
  background: #f5f5f8;
  color: #1a1a2e;
}

.topbar__notif svg {
  width: 18px;
  height: 18px;
}

.topbar__notif-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ff4081;
  color: white;
  font-size: 9px;
  font-weight: 700;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #fff;
}

.topbar__user {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 8px;
  transition: background 0.15s;
}

.topbar__user:hover {
  background: #f5f5f8;
}

.topbar__avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
}

.topbar__user-info {
  display: flex;
  flex-direction: column;
}

.topbar__user-name {
  font-size: 13px;
  font-weight: 600;
  color: #1a1a2e;
  line-height: 1.2;
}

.topbar__user-role {
  font-size: 11px;
  color: #aab0bc;
}

.topbar__chevron {
  width: 14px;
  height: 14px;
  color: #aab0bc;
}
</style>
