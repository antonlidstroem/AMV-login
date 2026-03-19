<template>
  <div class="dashboard-container p-5 text-center">
    <h1 class="text-dark">Välkommen, {{ auth.user?.name || auth.user?.username }}!</h1>
    <button class="btn btn-danger mt-4" type="button" @click="handleLogout">
      Logga ut
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../modules/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/') // Navigate back to login
}
</script>