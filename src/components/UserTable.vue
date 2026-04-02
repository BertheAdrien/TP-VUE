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
import { ref, computed, watch } from 'vue'
import { USERS, ROLES, STATUSES } from '../data/users.js'
import UserTableToolbar from './UserTableToolbar.vue'
import UserTableBody from './UserTableBody.vue'
import UserTablePagination from './UserTablePagination.vue'
import UserFormModal from './UserFormModal.vue'

const users = ref([...USERS])
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
    result = result.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
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

function saveUser(data) {
  if (editingUser.value) {
    const idx = users.value.findIndex(u => u.id === editingUser.value.id)
    if (idx !== -1) Object.assign(users.value[idx], data)
  } else {
    users.value.push({
      id: Date.now(),
      ...data,
      lastLogin: 'Never',
      avatar: null,
      initials: data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
    })
  }
  closeModal()
}

function exportUsers() {
  alert(`Exporting ${filteredUsers.value.length} users...`)
}

function deleteUser(user) {
  if (confirm(`Delete ${user.name}?`)) {
    users.value = users.value.filter(u => u.id !== user.id)
  }
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
