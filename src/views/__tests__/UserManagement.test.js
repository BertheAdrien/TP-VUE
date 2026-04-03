import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import UserManagement from '../UserManagement.vue'

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/users', component: UserManagement }
  ]
})

describe('UserManagement Component', () => {
  it('devrait rendre le composant correctement', async () => {
    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toContain('Gestion des Utilisateurs')
  })

  it('devrait avoir le bon titre', async () => {
    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    const title = wrapper.find('h1')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Gestion des Utilisateurs')
  })

  it('devrait avoir un bouton d\'ajout', async () => {
    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    const addButton = wrapper.find('button')
    expect(addButton.exists()).toBe(true)
    expect(addButton.text()).toContain('Ajouter un utilisateur')
  })

  it('devrait avoir une section de recherche', async () => {
    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    const searchInput = wrapper.find('input[placeholder="Rechercher un utilisateur..."]')
    expect(searchInput.exists()).toBe(true)
  })

  it('devrait avoir des boutons de filtre et export', async () => {
    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    const buttons = wrapper.findAll('button')
    const filterButton = buttons.find(btn => btn.text().includes('Filtres'))
    const exportButton = buttons.find(btn => btn.text().includes('Exporter'))

    expect(filterButton.exists()).toBe(true)
    expect(exportButton.exists()).toBe(true)
  })

  it('devrait avoir une structure de tableau', async () => {
    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    // Vérifier les en-têtes de tableau
    const headers = wrapper.findAll('.text-sm.font-semibold')
    expect(headers.length).toBeGreaterThan(0)
    
    const userHeader = headers.find(h => h.text().includes('Utilisateur'))
    expect(userHeader.exists()).toBe(true)
  })
})
