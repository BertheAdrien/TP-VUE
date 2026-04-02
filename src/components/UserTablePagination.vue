<template>
  <div class="pagination-bar">
    <p class="pagination-bar__count">
      Showing <strong>{{ pageStart }}</strong> to <strong>{{ pageEnd }}</strong> of <strong>{{ total }}</strong> users
    </p>
    <div class="pagination-bar__pages">
      <button class="page-btn" :disabled="currentPage === 1" @click="$emit('change', currentPage - 1)">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>
      <button
        v-for="p in visiblePages"
        :key="p"
        class="page-btn"
        :class="{ 'page-btn--active': p === currentPage, 'page-btn--ellipsis': p === '...' }"
        :disabled="p === '...'"
        @click="p !== '...' && $emit('change', p)"
      >{{ p }}</button>
      <button class="page-btn" :disabled="currentPage === totalPages" @click="$emit('change', currentPage + 1)">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  total: Number,
  pageStart: Number,
  pageEnd: Number,
})

defineEmits(['change'])

const visiblePages = computed(() => {
  const total = props.totalPages
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = [1]
  if (props.currentPage > 3) pages.push('...')
  for (let i = Math.max(2, props.currentPage - 1); i <= Math.min(total - 1, props.currentPage + 1); i++) pages.push(i)
  if (props.currentPage < total - 2) pages.push('...')
  pages.push(total)
  return pages
})
</script>

<style scoped>
.pagination-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-top: 1px solid #f0f0f0;
}

.pagination-bar__count {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.pagination-bar__count strong { color: #1a1a2e; }

.pagination-bar__pages {
  display: flex;
  align-items: center;
  gap: 4px;
}

.page-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: 7px;
  border: 1px solid #e8e8ef;
  background: #fff;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  font-family: inherit;
}

.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.page-btn:not(:disabled):hover { background: #f5f0ff; border-color: #6c47ff; color: #6c47ff; }
.page-btn--active { background: #1a1a2e !important; border-color: #1a1a2e !important; color: #fff !important; }
.page-btn svg { width: 14px; height: 14px; }
.page-btn--ellipsis { border: none; background: none; cursor: default; color: #aab0bc; }
</style>
