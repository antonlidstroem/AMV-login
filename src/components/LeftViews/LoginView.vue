<template>
  <div class="dashboard-container p-5 text-center">
    <h1 class="text-dark">Välkommen!</h1>
    <p class="text-muted">Du är nu inloggad i systemet.</p>

    <button class="btn btn-danger mt-4" @click="handleLogout">
      Logga ut
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default defineComponent({
  name: 'LoginView',

  setup() {
    const auth = useAuthStore()
    const router = useRouter()

    const handleLogout = () => {
      auth.logout()
      router.push('/')
    }

    return { handleLogout }
  }
})
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: white;
  width: 100%;
}
</style>
