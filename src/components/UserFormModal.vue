<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal">
        <div class="modal__header">
          <h2>{{ user ? 'Edit User' : 'Add New User' }}</h2>
          <button class="modal__close" @click="$emit('close')">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
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
          <button class="btn btn--outline" @click="$emit('close')">Cancel</button>
          <button class="btn btn--primary" @click="submit">{{ user ? 'Save Changes' : 'Add User' }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  user: { type: Object, default: null },
})

const emit = defineEmits(['close', 'save'])

const form = ref({ name: '', email: '', role: '', status: 'Active' })

// Sync form when user prop changes (edit mode)
watch(() => props.user, (u) => {
  form.value = u
    ? { name: u.name, email: u.email, role: u.role, status: u.status }
    : { name: '', email: '', role: '', status: 'Active' }
}, { immediate: true })

function submit() {
  if (!form.value.name || !form.value.email || !form.value.role) {
    alert('Please fill in all required fields.')
    return
  }
  emit('save', { ...form.value })
}
</script>

<style scoped>
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

.modal__close:hover { background: #f5f5f8; color: #1a1a2e; }
.modal__close svg { width: 16px; height: 16px; }

.modal__body {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-group { display: flex; flex-direction: column; gap: 5px; }

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
  font-family: inherit;
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

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  font-family: inherit;
}

.btn--outline { background: #fff; border: 1px solid #e8e8ef; color: #374151; }
.btn--outline:hover { background: #f5f5f8; }
.btn--primary { background: #1a1a2e; color: #fff; }
.btn--primary:hover { background: #6c47ff; }
</style>
