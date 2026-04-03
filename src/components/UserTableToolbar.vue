<template>
  <div class="toolbar">
    <div class="toolbar__filters">
      <div class="toolbar__search">
        <svg class="toolbar__search-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
        </svg>
        <input
          :value="search"
          @input="$emit('update:search', $event.target.value)"
          type="text"
          placeholder="Search by name or email"
          class="toolbar__search-input"
        />
      </div>

      <div class="toolbar__select-wrap">
        <select :value="selectedRole" @change="$emit('update:selectedRole', $event.target.value)" class="toolbar__select">
          <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
        </select>
        <svg class="toolbar__select-arrow" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </div>

      <div class="toolbar__select-wrap">
        <select :value="selectedStatus" @change="$emit('update:selectedStatus', $event.target.value)" class="toolbar__select">
          <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
        </select>
        <svg class="toolbar__select-arrow" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>

    <div class="toolbar__actions">
      <button class="btn btn--primary" @click="$emit('add')">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
        </svg>
        Add User
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  search: String,
  selectedRole: String,
  selectedStatus: String,
  roles: Array,
  statuses: Array,
})

defineEmits(['update:search', 'update:selectedRole', 'update:selectedStatus', 'export', 'add'])
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f5f5f8;
  gap: 12px;
  flex-wrap: wrap;
}

.toolbar__filters {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.toolbar__search {
  position: relative;
}

.toolbar__search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: #aab0bc;
  pointer-events: none;
}

.toolbar__search-input {
  padding: 8px 12px 8px 32px;
  border: 1px solid #e8e8ef;
  border-radius: 8px;
  font-size: 13px;
  color: #1a1a2e;
  background: #fafafa;
  width: 220px;
  outline: none;
  transition: border-color 0.15s;
  font-family: inherit;
}

.toolbar__search-input:focus {
  border-color: #6c47ff;
  background: #fff;
}

.toolbar__select-wrap {
  position: relative;
}

.toolbar__select {
  appearance: none;
  padding: 8px 32px 8px 12px;
  border: 1px solid #e8e8ef;
  border-radius: 8px;
  font-size: 13px;
  color: #374151;
  background: #fafafa;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;
  font-family: inherit;
}

.toolbar__select:focus {
  border-color: #6c47ff;
}

.toolbar__select-arrow {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: #aab0bc;
  pointer-events: none;
}

.toolbar__actions {
  display: flex;
  gap: 10px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  font-family: inherit;
}

.btn svg { width: 14px; height: 14px; }

.btn--outline {
  background: #fff;
  border: 1px solid #e8e8ef;
  color: #374151;
}

.btn--outline:hover { background: #f5f5f8; }

.btn--primary {
  background: #1a1a2e;
  color: #fff;
}

.btn--primary:hover { background: #6c47ff; }
</style>
