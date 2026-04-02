<template>
  <div class="group-management">
    <div class="empty-state">
      <div class="empty-state__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
        </svg>
      </div>
      <h2>Group Management</h2>
      <p>Cette section est en cours de développement.</p>
      <button class="empty-state__btn">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
        </svg>
        Créer un groupe
      </button>
    </div>

    <!-- Placeholder cards -->
    <div class="cards">
      <div class="card card--ghost" v-for="i in 3" :key="i">
        <div class="card__avatar-row">
          <div class="ghost-circle" v-for="j in 4" :key="j"></div>
        </div>
        <div class="ghost-line ghost-line--title"></div>
        <div class="ghost-line ghost-line--sub"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group-management {
  padding: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  min-height: calc(100vh - 60px);
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 32px 36px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  max-width: 440px;
  width: 100%;
}

.empty-state__icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: #f0eeff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.empty-state__icon svg {
  width: 28px;
  height: 28px;
  color: #6c47ff;
}

.empty-state h2 {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
}

.empty-state p {
  margin: 0 0 24px;
  font-size: 14px;
  color: #9ca3af;
  line-height: 1.6;
}

.empty-state__btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 20px;
  background: #1a1a2e;
  color: #fff;
  border: none;
  border-radius: 9px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  font-family: inherit;
}

.empty-state__btn:hover { background: #6c47ff; }
.empty-state__btn svg { width: 15px; height: 15px; }

/* Ghost cards */
.cards {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 860px;
}

.card--ghost {
  flex: 1;
  min-width: 220px;
  max-width: 280px;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card__avatar-row {
  display: flex;
  gap: -6px;
}

.ghost-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0f0f5;
  margin-right: -8px;
  border: 2px solid #fff;
  animation: pulse 1.6s ease-in-out infinite;
}

.ghost-circle:nth-child(2) { animation-delay: 0.1s; }
.ghost-circle:nth-child(3) { animation-delay: 0.2s; }
.ghost-circle:nth-child(4) { animation-delay: 0.3s; }

.ghost-line {
  height: 10px;
  border-radius: 6px;
  background: #f0f0f5;
  animation: pulse 1.6s ease-in-out infinite;
}

.ghost-line--title { width: 70%; }
.ghost-line--sub { width: 45%; animation-delay: 0.15s; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}
</style>
