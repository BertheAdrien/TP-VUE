import { ref, provide, inject } from 'vue'

const ROUTER_KEY = Symbol('router')

export function createRouter() {
  const currentRoute = ref('users')

  function navigate(route) {
    currentRoute.value = route
  }

  return { currentRoute, navigate }
}

export function provideRouter(router) {
  provide(ROUTER_KEY, router)
}

export function useRouter() {
  return inject(ROUTER_KEY)
}
