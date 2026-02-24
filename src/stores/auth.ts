import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { LoginData } from '@/types'
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY


export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const tokenExpiration = ref<number | null>(null)

  const getToken = computed(() => token.value)

  const isAuthenticated = computed(() => {
    if (!token.value || !tokenExpiration.value) return false
    return Date.now() < tokenExpiration.value
  })

  async function auth(data: LoginData) {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
       method: 'POST',
       body: JSON.stringify({
         email: data.email,
         password: data.password,
         returnSecureToken: true,
        })
    })

    const responseData = await response.json()
    if(!response.ok) {
      console.log(responseData);
      const error = new Error(responseData.error.message || 'Failed to auth');
      throw error
    }

    const expiresAt = Date.now() + Number(responseData.expiresIn) * 1000

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('tokenExpiration', String(expiresAt))
    token.value = responseData.idToken
    tokenExpiration.value = expiresAt
  }

  function tryLogin() {
    const localStorageToken = localStorage.getItem('token')
    const localStorageExpiration = localStorage.getItem('tokenExpiration')

    if (localStorageToken && localStorageExpiration) {
      const expiresAt = Number(localStorageExpiration)
      if (Date.now() < expiresAt) {
        token.value = localStorageToken
        tokenExpiration.value = expiresAt
      } else {
        logout()
      }
    }
  }

  function logout() {
    token.value = null
    tokenExpiration.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiration')
  }

  return { auth, tryLogin, logout, getToken, isAuthenticated }
})
