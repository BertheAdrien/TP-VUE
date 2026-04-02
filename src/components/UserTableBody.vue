<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th class="th th--check">
            <input type="checkbox" :checked="allChecked" @change="$emit('toggle-all', $event.target.checked)" class="checkbox" />
          </th>
          <th class="th th--user" @click="$emit('sort', 'name')">
            USER <SortIcon />
          </th>
          <th class="th" @click="$emit('sort', 'role')">
            ROLE <SortIcon />
          </th>
          <th class="th" @click="$emit('sort', 'status')">
            STATUS <SortIcon />
          </th>
          <th class="th" @click="$emit('sort', 'lastLogin')">
            LAST LOGIN <SortIcon />
          </th>
          <th class="th th--actions">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          class="row"
          :class="{ 'row--selected': selectedIds.includes(user.id) }"
        >
          <td class="td td--check">
            <input type="checkbox" :value="user.id" :checked="selectedIds.includes(user.id)" @change="$emit('toggle-row', user.id)" class="checkbox" />
          </td>

          <td class="td">
            <div class="user-cell">
              <div class="avatar" :style="user.avatar ? {} : { background: avatarColor(user.name) }">
                <img v-if="user.avatar" :src="user.avatar" :alt="user.name" />
                <span v-else>{{ user.initials || getInitials(user.name) }}</span>
              </div>
              <div class="user-info">
                <span class="user-name">{{ user.name }}</span>
                <span class="user-email">{{ user.email }}</span>
              </div>
            </div>
          </td>

          <td class="td">
            <span class="badge badge--role" :class="`badge--${user.role.toLowerCase()}`">{{ user.role }}</span>
          </td>

          <td class="td">
            <span class="badge badge--status" :class="`badge--${user.status.toLowerCase()}`">
              <span class="badge__dot"></span>
              {{ user.status }}
            </span>
          </td>

          <td class="td td--login">{{ user.lastLogin }}</td>

          <td class="td td--actions">
            <div class="row-actions">
              <button class="action-btn" title="Edit" @click="$emit('edit', user)">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
              </button>
              <button class="action-btn action-btn--delete" title="Delete" @click="$emit('delete', user)">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </td>
        </tr>

        <tr v-if="users.length === 0">
          <td colspan="6" class="empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <p>Aucun utilisateur trouvé</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import SortIcon from './SortIcon.vue'

defineProps({
  users: Array,
  selectedIds: Array,
  allChecked: Boolean,
})

defineEmits(['sort', 'toggle-all', 'toggle-row', 'edit', 'delete'])

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const COLORS = ['#6c47ff', '#ff4081', '#00bcd4', '#4caf50', '#ff9800', '#e91e63']
function avatarColor(name) {
  return COLORS[name.charCodeAt(0) % COLORS.length]
}
</script>

<style scoped>
.table-wrapper { overflow-x: auto; }

.table {
  width: 100%;
  border-collapse: collapse;
}

.th {
  padding: 10px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  letter-spacing: 0.5px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.th:hover { color: #6c47ff; }

.th--check, .td--check { width: 40px; padding-left: 20px; }
.th--actions, .td--actions { text-align: right; padding-right: 20px; }

.row {
  border-bottom: 1px solid #f5f5f8;
  transition: background 0.1s;
}

.row:hover { background: #fafbff; }
.row--selected { background: #f5f0ff; }

.td {
  padding: 12px 16px;
  font-size: 13.5px;
  color: #374151;
  vertical-align: middle;
}

.td--login { color: #6b7280; font-size: 13px; }

/* User cell */
.user-cell { display: flex; align-items: center; gap: 12px; }

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
}

.avatar img { width: 100%; height: 100%; object-fit: cover; }

.user-info { display: flex; flex-direction: column; }
.user-name { font-weight: 600; color: #1a1a2e; font-size: 13.5px; }
.user-email { font-size: 12px; color: #9ca3af; }

/* Badges */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge--role.badge--student { background: #e8f4ff; color: #2b78e4; }
.badge--role.badge--teacher { background: #fff3e0; color: #e67e22; }
.badge--role.badge--admin   { background: #f5f5f8; color: #374151; }

.badge--status .badge__dot {
  width: 6px; height: 6px; border-radius: 50%;
}

.badge--status.badge--active   { background: #ecfdf5; color: #059669; }
.badge--status.badge--active .badge__dot { background: #059669; }
.badge--status.badge--inactive { background: #fff1f2; color: #e11d48; }
.badge--status.badge--inactive .badge__dot { background: #e11d48; }
.badge--status.badge--pending  { background: #fffbeb; color: #d97706; }
.badge--status.badge--pending .badge__dot { background: #d97706; }

/* Row actions */
.row-actions { display: flex; align-items: center; gap: 6px; justify-content: flex-end; }

.action-btn {
  width: 30px; height: 30px;
  border-radius: 7px;
  border: none;
  background: #f5f5f8;
  color: #6b7280;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
}

.action-btn svg { width: 14px; height: 14px; }
.action-btn:hover { background: #e8e8ff; color: #6c47ff; }
.action-btn--delete:hover { background: #fff1f2; color: #e11d48; }

/* Checkbox */
.checkbox { width: 15px; height: 15px; accent-color: #6c47ff; cursor: pointer; }

/* Empty */
.empty { text-align: center; padding: 48px; color: #aab0bc; }
.empty svg { width: 40px; height: 40px; margin: 0 auto 12px; display: block; opacity: 0.4; }
.empty p { margin: 0; font-size: 14px; }
</style>
