<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { LoginData } from '@/types/index.ts'

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref(<string | null>(null))

const submitForm = async () => {
    const loginData: LoginData = {
        email: email.value,
        password: password.value
    }

    try {
        await authStore.auth(loginData)
        router.replace('/dashboard')
    } catch(err) {
        error.value = 'Failed to authenticate, try later'
    }
}

</script>

<template>
    <form @submit.prevent="submitForm">
        <div class="min-h-screen bg-base-300 flex items-center justify-center p-4">
          <div class="card w-full max-w-md bg-base-100 shadow-xl">
            <div class="card-body gap-6 m-8">
              <h2 class="card-title justify-center text-4xl">Login</h2>
              <label class="floating-label">
                <input class="input" type="email" required placeholder="mail@site.com" v-model="email" />
              </label>
               <label class="floating-label">
                <input
                  type="password"
                  placeholder="Password"
                  class="input input-md"
                  v-model="password"
                />
                <span>Password</span>
              </label>
              <p class="text-center text-error" :show="!!error"> {{ error }}</p>
                <div class="card-actions justify-start pt-2">
                  <button class="btn btn-primary w-30" type="submit">Login</button>
                </div>
              </div>
          </div>
        </div>
    </form>
</template>