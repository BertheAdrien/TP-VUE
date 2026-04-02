<template>
  <div class="user-table">
    <!-- Toolbar -->
    <div class="user-table__toolbar">
      <div class="user-table__filters">
        <!-- Search -->
        <div class="user-table__search">
          <svg class="user-table__search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
          </svg>
          <input v-model="search" type="text" placeholder="Search by name or email" class="user-table__search-input" />
        </div>

        <!-- Role filter -->
        <div class="user-table__select-wrap">
          <select v-model="selectedRole" class="user-table__select">
            <option v-for="role in ROLES" :key="role" :value="role">{{ role }}</option>
          </select>
          <svg class="user-table__select-arrow" viewBox="0 0 20 60" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>

        <!-- Status filter -->
        <div class="user-table__select-wrap">
          <select v-model="selectedStatus" class="user-table__select">
            <option v-for="status in STATUSES" :key="status" :value="status">{{ status }}</option>
          </select>
          <svg class="user-table__select-arrow" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>

      <div class="user-table__actions">
        <button class="btn btn--outline" @click="exportUsers">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
          Export
        </button>
        <button class="btn btn--primary" @click="showAddModal = true">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Add User
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="user-table__wrapper">
      <table class="user-table__table">
        <thead>
          <tr>
            <th class="user-table__th user-table__th--check">
              <input type="checkbox" v-model="allChecked" @change="toggleAll" class="user-table__checkbox" />
            </th>
            <th class="user-table__th user-table__th--user" @click="sortBy('name')">
              USER
              <svg class="user-table__sort-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"/>
              </svg>
            </th>
            <th class="user-table__th" @click="sortBy('role')">
              ROLE
              <svg class="user-table__sort-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"/>
              </svg>
            </th>
            <th class="user-table__th" @click="sortBy('status')">
              STATUS
              <svg class="user-table__sort-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"/>
              </svg>
            </th>
            <th class="user-table__th" @click="sortBy('lastLogin')">
              LAST LOGIN
              <svg class="user-table__sort-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"/>
              </svg>
            </th>
            <th class="user-table__th user-table__th--actions">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in paginatedUsers"
            :key="user.id"
            class="user-table__row"
            :class="{ 'user-table__row--selected': selectedIds.includes(user.id) }"
          >
            <td class="user-table__td user-table__td--check">
              <input type="checkbox" :value="user.id" v-model="selectedIds" class="user-table__checkbox" />
            </td>
            <td class="user-table__td">
              <div class="user-table__user-cell">
                <div class="user-table__avatar" :style="user.avatar ? {} : { background: avatarColor(user.name) }">
                  <img v-if="user.avatar" :src="user.avatar" :alt="user.name" />
                  <span v-else>{{ user.initials || getInitials(user.name) }}</span>
                </div>
                <div class="user-table__user-info">
                  <span class="user-table__user-name">{{ user.name }}</span>
                  <span class="user-table__user-email">{{ user.email }}</span>
                </div>
              </div>
            </td>
            <td class="user-table__td">
              <span class="badge badge--role" :class="`badge--${user.role.toLowerCase()}`">{{ user.role }}</span>
            </td>
            <td class="user-table__td">
              <span class="badge badge--status" :class="`badge--${user.status.toLowerCase()}`">
                <span class="badge__dot"></span>
                {{ user.status }}
              </span>
            </td>
            <td class="user-table__td user-table__td--login">{{ user.lastLogin }}</td>
            <td class="user-table__td user-table__td--actions">
              <div class="user-table__row-actions">
                <button class="user-table__action-btn" title="Edit user" @click="editUser(user)">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                  </svg>
                </button>
                <button class="user-table__action-btn user-table__action-btn--delete" title="Delete user" @click="deleteUser(user)">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredUsers.length === 0">
            <td colspan="6" class="user-table__empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <p>Aucun utilisateur trouvé</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer pagination -->
    <div class="user-table__footer">
      <p class="user-table__count">
        Showing <strong>{{ pageStart }}</strong> to <strong>{{ pageEnd }}</strong> of <strong>{{ filteredUsers.length }}</strong> users
      </p>
      <div class="user-table__pagination">
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
          <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
        </button>
        <button
          v-for="p in visiblePages"
          :key="p"
          class="page-btn"
          :class="{ 'page-btn--active': p === currentPage, 'page-btn--ellipsis': p === '...' }"
          :disabled="p === '...'"
          @click="p !== '...' && (currentPage = p)"
        >{{ p }}</button>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
          <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Add User Modal -->
  <Teleport to="body">
    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal">
        <div class="modal__header">
          <h2>{{ editingUser ? 'Edit User' : 'Add New User' }}</h2>
          <button class="modal__close" @click="closeModal">
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
          </button>
        </div>
        <div class="modal__body">
          <div class="form-group">
            <label>Full Name</label>
            <input v-model="form.name" type="text" placeholder="John Doe" class="form-input" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="john@example.com" class="form-input" />
          </div>
          <div class="form-group">
            <label>Role</label>
            <select v-model="form.role" class="form-input">
              <option value="">Select a role</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="form.status" class="form-input">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
        <div class="modal__footer">
          <button class="btn btn--outline" @click="closeModal">Cancel</button>
          <button class="btn btn--primary" @click="saveUser">{{ editingUser ? 'Save Changes' : 'Add User' }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { USERS, ROLES, STATUSES } from '../data/users.js'

// State
const users = ref([...USERS])
const search = ref('')
const selectedRole = ref('All Roles')
const selectedStatus = ref('All Statuses')
const selectedIds = ref([])
const allChecked = ref(false)
const currentPage = ref(1)
const perPage = 4
const sortKey = ref('name')
const sortDir = ref(1)

// Modal
const showAddModal = ref(false)
const editingUser = ref(null)
const form = ref({ name: '', email: '', role: '', status: 'Active' })

// Filtering
const filteredUsers = computed(() => {
  let result = users.value

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
  }

  if (selectedRole.value !== 'All Roles') {
    result = result.filter(u => u.role === selectedRole.value)
  }

  if (selectedStatus.value !== 'All Statuses') {
    result = result.filter(u => u.status === selectedStatus.value)
  }

  return [...result].sort((a, b) => {
    if (a[sortKey.value] < b[sortKey.value]) return -sortDir.value
    if (a[sortKey.value] > b[sortKey.value]) return sortDir.value
    return 0
  })
})

// Pagination
const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / perPage)))
const pageStart = computed(() => filteredUsers.value.length === 0 ? 0 : (currentPage.value - 1) * perPage + 1)
const pageEnd = computed(() => Math.min(currentPage.value * perPage, filteredUsers.value.length))
const paginatedUsers = computed(() => filteredUsers.value.slice(pageStart.value - 1, pageEnd.value))

const visiblePages = computed(() => {
  const total = totalPages.value
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = [1]
  if (currentPage.value > 3) pages.push('...')
  for (let i = Math.max(2, currentPage.value - 1); i <= Math.min(total - 1, currentPage.value + 1); i++) pages.push(i)
  if (currentPage.value < total - 2) pages.push('...')
  pages.push(total)
  return pages
})

watch([search, selectedRole, selectedStatus], () => { currentPage.value = 1 })

// Methods
function sortBy(key) {
  if (sortKey.value === key) sortDir.value *= -1
  else { sortKey.value = key; sortDir.value = 1 }
}

function toggleAll() {
  selectedIds.value = allChecked.value ? paginatedUsers.value.map(u => u.id) : []
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const COLORS = ['#6c47ff', '#ff4081', '#00bcd4', '#4caf50', '#ff9800', '#e91e63']
function avatarColor(name) {
  const idx = name.charCodeAt(0) % COLORS.length
  return COLORS[idx]
}

function exportUsers() {
  alert(`Exporting ${filteredUsers.value.length} users...`)
}

function editUser(user) {
  editingUser.value = user
  form.value = { name: user.name, email: user.email, role: user.role, status: user.status }
  showAddModal.value = true
}

function deleteUser(user) {
  if (confirm(`Delete ${user.name}?`)) {
    users.value = users.value.filter(u => u.id !== user.id)
  }
}

function closeModal() {
  showAddModal.value = false
  editingUser.value = null
  form.value = { name: '', email: '', role: '', status: 'Active' }
}

function saveUser() {
  if (!form.value.name || !form.value.email || !form.value.role) {
    alert('Please fill in all required fields.')
    return
  }
  if (editingUser.value) {
    const idx = users.value.findIndex(u => u.id === editingUser.value.id)
    if (idx !== -1) Object.assign(users.value[idx], form.value)
  } else {
    users.value.push({
      id: Date.now(),
      ...form.value,
      lastLogin: 'Never',
      avatar: null,
      initials: getInitials(form.value.name),
    })
  }
  closeModal()
}
</script>

<style scoped>
.user-table {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #f0f0f0;
  overflow: hidden;
}

/* Toolbar */
.user-table__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f5f5f8;
  gap: 12px;
  flex-wrap: wrap;
}

.user-table__filters {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.user-table__search {
  position: relative;
}

.user-table__search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: #aab0bc;
}

.user-table__search-input {
  padding: 8px 12px 8px 32px;
  border: 1px solid #e8e8ef;
  border-radius: 8px;
  font-size: 13px;
  color: #1a1a2e;
  background: #fafafa;
  width: 220px;
  outline: none;
  transition: border-color 0.15s;
}

.user-table__search-input:focus {
  border-color: #6c47ff;
  background: #fff;
}

.user-table__select-wrap {
  position: relative;
}

.user-table__select {
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
}

.user-table__select:focus {
  border-color: #6c47ff;
}

.user-table__select-arrow {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: #aab0bc;
  pointer-events: none;
}

.user-table__actions {
  display: flex;
  gap: 10px;
}

/* Buttons */
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
}

.btn svg {
  width: 14px;
  height: 14px;
}

.btn--outline {
  background: #fff;
  border: 1px solid #e8e8ef;
  color: #374151;
}

.btn--outline:hover {
  background: #f5f5f8;
}

.btn--primary {
  background: #1a1a2e;
  color: #fff;
}

.btn--primary:hover {
  background: #6c47ff;
}

/* Table */
.user-table__wrapper {
  overflow-x: auto;
}

.user-table__table {
  width: 100%;
  border-collapse: collapse;
}

.user-table__th {
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

.user-table__th:hover {
  color: #6c47ff;
}

.user-table__th--check,
.user-table__td--check {
  width: 40px;
  padding-left: 20px;
}

.user-table__th--actions,
.user-table__td--actions {
  text-align: right;
  padding-right: 20px;
}

.user-table__sort-icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 4px;
  vertical-align: middle;
  opacity: 0.5;
}

.user-table__row {
  border-bottom: 1px solid #f5f5f8;
  transition: background 0.1s;
}

.user-table__row:hover {
  background: #fafbff;
}

.user-table__row--selected {
  background: #f5f0ff;
}

.user-table__td {
  padding: 12px 16px;
  font-size: 13.5px;
  color: #374151;
  vertical-align: middle;
}

.user-table__td--login {
  color: #6b7280;
  font-size: 13px;
}

/* User cell */
.user-table__user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-table__avatar {
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

.user-table__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-table__user-info {
  display: flex;
  flex-direction: column;
}

.user-table__user-name {
  font-weight: 600;
  color: #1a1a2e;
  font-size: 13.5px;
}

.user-table__user-email {
  font-size: 12px;
  color: #9ca3af;
}

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
.badge--role.badge--admin { background: #f5f5f8; color: #374151; }

.badge--status .badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.badge--status.badge--active { background: #ecfdf5; color: #059669; }
.badge--status.badge--active .badge__dot { background: #059669; }
.badge--status.badge--inactive { background: #fff1f2; color: #e11d48; }
.badge--status.badge--inactive .badge__dot { background: #e11d48; }
.badge--status.badge--pending { background: #fffbeb; color: #d97706; }
.badge--status.badge--pending .badge__dot { background: #d97706; }

/* Row actions */
.user-table__row-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-end;
}

.user-table__action-btn {
  width: 30px;
  height: 30px;
  border-radius: 7px;
  border: none;
  background: #f5f5f8;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
}

.user-table__action-btn svg {
  width: 14px;
  height: 14px;
}

.user-table__action-btn:hover {
  background: #e8e8ff;
  color: #6c47ff;
}

.user-table__action-btn--delete:hover {
  background: #fff1f2;
  color: #e11d48;
}

/* Checkbox */
.user-table__checkbox {
  width: 15px;
  height: 15px;
  accent-color: #6c47ff;
  cursor: pointer;
}

/* Empty state */
.user-table__empty {
  text-align: center;
  padding: 48px;
  color: #aab0bc;
}

.user-table__empty svg {
  width: 40px;
  height: 40px;
  margin: 0 auto 12px;
  display: block;
  opacity: 0.4;
}

.user-table__empty p {
  margin: 0;
  font-size: 14px;
}

/* Footer */
.user-table__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-top: 1px solid #f0f0f0;
}

.user-table__count {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.user-table__count strong {
  color: #1a1a2e;
}

.user-table__pagination {
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
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-btn:not(:disabled):hover {
  background: #f5f0ff;
  border-color: #6c47ff;
  color: #6c47ff;
}

.page-btn--active {
  background: #1a1a2e !important;
  border-color: #1a1a2e !important;
  color: #fff !important;
}

.page-btn svg {
  width: 14px;
  height: 14px;
}

.page-btn--ellipsis {
  border: none;
  background: none;
  cursor: default;
  color: #aab0bc;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 30, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal {
  background: #fff;
  border-radius: 16px;
  width: 440px;
  max-width: 95vw;
  box-shadow: 0 24px 64px rgba(0,0,0,0.15);
  overflow: hidden;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.modal__header h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: #1a1a2e;
}

.modal__close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #9ca3af;
  border-radius: 6px;
  transition: all 0.15s;
}

.modal__close:hover {
  background: #f5f5f8;
  color: #1a1a2e;
}

.modal__close svg {
  width: 16px;
  height: 16px;
}

.modal__body {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 12.5px;
  font-weight: 600;
  color: #374151;
}

.form-input {
  padding: 9px 12px;
  border: 1px solid #e8e8ef;
  border-radius: 8px;
  font-size: 13.5px;
  color: #1a1a2e;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  background: #fafafa;
  appearance: none;
  width: 100%;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #6c47ff;
  box-shadow: 0 0 0 3px rgba(108,71,255,0.1);
  background: #fff;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}
</style>
