import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import GroupManagement from '../GroupManagement.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/groups', component: GroupManagement }
  ]
})

describe('GroupManagement Component', () => {
  it('devrait rendre le composant correctement', async () => {
    const wrapper = mount(GroupManagement, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toContain('Gestion des Groupes')
  })

  it('devrait avoir le bon titre', async () => {
    const wrapper = mount(GroupManagement, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    const title = wrapper.find('h1')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Gestion des Groupes')
  })

  it('devrait avoir un bouton de création', async () => {
    const wrapper = mount(GroupManagement, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    const createButton = wrapper.find('button')
    expect(createButton.exists()).toBe(true)
    expect(createButton.text()).toContain('Nouveau groupe')
  })

  it('devrait avoir une section de recherche', async () => {
    const wrapper = mount(GroupManagement, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    const searchInput = wrapper.find('input[placeholder="Rechercher un groupe..."]')
    expect(searchInput.exists()).toBe(true)
  })

  it('devrait afficher des cartes de groupe', async () => {
    const wrapper = mount(GroupManagement, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    const groupCards = wrapper.findAll('.group')
    expect(groupCards.length).toBe(3) // 3 cartes de groupe dans le template
  })

  it('devrait avoir des informations de groupe valides', async () => {
    const wrapper = mount(GroupManagement, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    const firstCard = wrapper.find('.group')
    expect(firstCard.exists()).toBe(true)
    
    // Vérifier la présence du nom du groupe
    const groupName = firstCard.find('.text-xl.font-bold')
    expect(groupName.exists()).toBe(true)
    expect(groupName.text()).toBe('Équipe de Développement')
  })

  it('devrait avoir des boutons d\'action sur chaque carte', async () => {
    const wrapper = mount(GroupManagement, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    const actionButtons = wrapper.findAll('.group button')
    expect(actionButtons.length).toBe(3) // 1 bouton par carte
  })
})
