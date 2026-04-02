<template>
  <div class="user-management">
    <UserTable />
  </div>
</template>

<script setup>
import UserTable from '../components/UserTable.vue'
</script>

<style scoped>
.user-management {
  padding: 28px;
  max-width: 1100px;
}
</style>
