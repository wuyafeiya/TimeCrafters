export default defineNuxtRouteMiddleware((to, _) => {
  if (to.path === '/') {
    return '/login'
  }
})
