<template>
  <div class="user-table">
    <UserTableToolbar
      v-model:search="search"
      v-model:selectedRole="selectedRole"
      v-model:selectedStatus="selectedStatus"
      :roles="ROLES"
      :statuses="STATUSES"
      @export="exportUsers"
      @add="openAdd"
    />

    <UserTableBody
      :users="paginatedUsers"
      :selectedIds="selectedIds"
      :allChecked="allChecked"
      @sort="sortBy"
      @toggle-all="toggleAll"
      @toggle-row="toggleRow"
      @edit="openEdit"
      @delete="deleteUser"
    />

    <UserTablePagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :total="filteredUsers.length"
      :pageStart="pageStart"
      :pageEnd="pageEnd"
      @change="currentPage = $event"
    />

    <UserFormModal
      v-if="showModal"
      :user="editingUser"
      @close="closeModal"
      @save="saveUser"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import UserTableToolbar from './UserTableToolbar.vue'
import UserTableBody from './UserTableBody.vue'
import UserTablePagination from './UserTablePagination.vue'
import UserFormModal from './UserFormModal.vue'

const ROLES = ['All Roles', 'Student', 'Teacher', 'Admin']
const STATUSES = ['All Statuses', 'Active', 'Inactive', 'Pending']

const users = ref([])
const search = ref('')
const selectedRole = ref('All Roles')
const selectedStatus = ref('All Statuses')
const sortKey = ref('name')
const sortDir = ref(1)
const selectedIds = ref([])
const perPage = 4
const currentPage = ref(1)
const showModal = ref(false)
const editingUser = ref(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function fetchUsers() {
  try {
    const res = await fetch(`${API_URL}/users`)
    users.value = await res.json()
  } catch (err) {
    console.error('Impossible de récupérer les utilisateurs', err)
  }
}

onMounted(fetchUsers)

function sortBy(key) {
  if (sortKey.value === key) sortDir.value *= -1
  else { sortKey.value = key; sortDir.value = 1 }
}

const allChecked = computed(() =>
  paginatedUsers.value.length > 0 &&
  paginatedUsers.value.every(u => selectedIds.value.includes(u.id))
)

function toggleAll(checked) {
  selectedIds.value = checked ? paginatedUsers.value.map(u => u.id) : []
}

function toggleRow(id) {
  const idx = selectedIds.value.indexOf(id)
  idx === -1 ? selectedIds.value.push(id) : selectedIds.value.splice(idx, 1)
}

const filteredUsers = computed(() => {
  let result = users.value
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    )
  }
  if (selectedRole.value !== 'All Roles') result = result.filter(u => u.role === selectedRole.value)
  if (selectedStatus.value !== 'All Statuses') result = result.filter(u => u.status === selectedStatus.value)
  return [...result].sort((a, b) => {
    if (a[sortKey.value] < b[sortKey.value]) return -sortDir.value
    if (a[sortKey.value] > b[sortKey.value]) return sortDir.value
    return 0
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / perPage)))
const pageStart = computed(() => filteredUsers.value.length === 0 ? 0 : (currentPage.value - 1) * perPage + 1)
const pageEnd = computed(() => Math.min(currentPage.value * perPage, filteredUsers.value.length))
const paginatedUsers = computed(() => filteredUsers.value.slice(pageStart.value - 1, pageEnd.value))

watch([search, selectedRole, selectedStatus], () => { currentPage.value = 1 })

function openAdd() { editingUser.value = null; showModal.value = true }
function openEdit(user) { editingUser.value = user; showModal.value = true }
function closeModal() { showModal.value = false; editingUser.value = null }

async function saveUser(data) {
  if (editingUser.value) {
    // Edit via API
    try {
      const res = await fetch(`${API_URL}/users/${editingUser.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const updated = await res.json()
      const idx = users.value.findIndex(u => u.id === editingUser.value.id)
      if (idx !== -1) users.value[idx] = updated
    } catch (err) { console.error(err) }
  } else {
    // Add via API
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const newUser = await res.json()
      users.value.push(newUser)
    } catch (err) { console.error(err) }
  }
  closeModal()
}

async function deleteUser(user) {
  if (!confirm(`Supprimer ${user.name} ?`)) return
  try {
    await fetch(`${API_URL}/users/${user.id}`, { method: 'DELETE' })
    users.value = users.value.filter(u => u.id !== user.id)
  } catch (err) { console.error(err) }
}

function exportUsers() {
  alert(`Exporting ${filteredUsers.value.length} users...`)
}
</script>

<style scoped>
.user-table {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #f0f0f0;
  overflow: hidden;
}
</style>