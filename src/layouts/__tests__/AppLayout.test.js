import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../AppLayout.vue'
import UserManagement from '../../views/UserManagement.vue'

// Mock des composants
vi.mock('../../components/AppSidebar.vue', () => ({
  default: { template: '<div class="sidebar-mock">Sidebar</div>' }
}))

vi.mock('../../components/AppTopbar.vue', () => ({
  default: { template: '<div class="topbar-mock">Topbar</div>' }
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: UserManagement },
    { path: '/users', component: UserManagement }
  ]
})

describe('AppLayout Component', () => {
  it('devrait rendre le layout correctement', async () => {
    const wrapper = mount(AppLayout, {
      global: {
        plugins: [router],
        stubs: {
          'router-view': true
        }
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.app-layout').exists()).toBe(true)
  })

  it('devrait avoir une sidebar et une topbar', async () => {
    const wrapper = mount(AppLayout, {
      global: {
        plugins: [router],
        stubs: {
          'router-view': true
        }
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.sidebar-mock').exists()).toBe(true)
    expect(wrapper.find('.topbar-mock').exists()).toBe(true)
  })

  it('devrait avoir une zone de contenu principale', async () => {
    const wrapper = mount(AppLayout, {
      global: {
        plugins: [router],
        stubs: {
          'router-view': true
        }
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.app-layout__content').exists()).toBe(true)
  })

  it('devrait calculer le bon titre selon la route', async () => {
    const wrapper = mount(AppLayout, {
      global: {
        plugins: [router],
        stubs: {
          'router-view': true
        }
      }
    })

    await router.push('/users')
    await router.isReady()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.currentTitle).toBe('User Management')
  })

  it('devrait avoir une fonction de navigation', async () => {
    const wrapper = mount(AppLayout, {
      global: {
        plugins: [router],
        stubs: {
          'router-view': true
        }
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    expect(typeof wrapper.vm.navigate).toBe('function')
  })

  it('devrait gérer les routes inexistantes', async () => {
    const wrapper = mount(AppLayout, {
      global: {
        plugins: [router],
        stubs: {
          'router-view': true
        }
      }
    })

    await router.push('/route-inexistante')
    await router.isReady()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.currentTitle).toBe('Dashboard')
  })
})
