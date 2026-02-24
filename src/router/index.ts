import { createRouter, createWebHistory } from 'vue-router'
import ReservationDash from '@/views/reservations/ReservationDash.vue'
import AddReservation from '@/views/reservations/AddReservation.vue'
import UserAuth from '@/views/auth/UserAuth.vue'
import NotFound from '@/views/NotFound.vue'
import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'dashboard'
    },
    {
      path: '/dashboard',
      component: ReservationDash,
      meta: {requiresAuth: true}
    },
    {
      path: '/add-reservation',
      component: AddReservation,
      meta: {requiresAuth: true}
    },
    {
      path: '/auth',
      component: UserAuth,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if(to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/auth' 
  }
})

export default router
