import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserTable from '../UserTable.vue'

// Mock fetch API
global.fetch = vi.fn()

describe('UserTable Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('devrait rendre le composant correctement', () => {
    const wrapper = mount(UserTable)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.user-table').exists()).toBe(true)
  })

  it('devrait appeler fetchUsers au montage', async () => {
    const mockUsers = [
      { id: 1, name: 'Test User', email: 'test@example.com', role: 'Student', status: 'Active' }
    ]
    fetch.mockResolvedValueOnce({
      json: async () => mockUsers
    })

    const wrapper = mount(UserTable)
    await wrapper.vm.$nextTick()

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/users')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('devrait afficher les utilisateurs après chargement', async () => {
    const mockUsers = [
      { id: 1, name: 'Test User', email: 'test@example.com', role: 'Student', status: 'Active' }
    ]
    fetch.mockResolvedValueOnce({
      json: async () => mockUsers
    })

    const wrapper = mount(UserTable)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick() // Double attente pour la réponse async

    expect(wrapper.vm.users).toEqual(mockUsers)
  })

  it('devrait filtrer les utilisateurs par recherche', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Active' }
    ]
    fetch.mockResolvedValueOnce({
      json: async () => mockUsers
    })

    const wrapper = mount(UserTable)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    // Test de recherche
    wrapper.vm.search = 'John'
    await wrapper.vm.$nextTick()

    const filtered = wrapper.vm.filteredUsers
    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe('John Doe')
  })

  it('devrait filtrer par rôle', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', status: 'Active' }
    ]
    fetch.mockResolvedValueOnce({
      json: async () => mockUsers
    })

    const wrapper = mount(UserTable)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    wrapper.vm.selectedRole = 'Student'
    await wrapper.vm.$nextTick()

    const filtered = wrapper.vm.filteredUsers
    expect(filtered).toHaveLength(1)
    expect(filtered[0].role).toBe('Student')
  })

  it('devrait trier les utilisateurs', async () => {
    const mockUsers = [
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Student', status: 'Active' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Teacher', status: 'Active' }
    ]
    fetch.mockResolvedValueOnce({
      json: async () => mockUsers
    })

    const wrapper = mount(UserTable)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    // Test tri par nom
    wrapper.vm.sortBy('name')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.sortKey).toBe('name')
    expect(wrapper.vm.sortDir).toBe(1)
  })

  it('devrait gérer les erreurs API', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const wrapper = mount(UserTable)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(consoleSpy).toHaveBeenCalledWith(
      'Impossible de récupérer les utilisateurs',
      expect.any(Error)
    )

    consoleSpy.mockRestore()
  })
})
