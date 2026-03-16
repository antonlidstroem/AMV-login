<template>
  <div class="dashboard-container p-5 text-center">
    <h1 class="text-dark">Välkommen, {{ auth.user?.name || auth.user?.username }}!</h1>
    <p class="text-muted">Du är inloggad med kontot: {{ auth.user?.username }}</p>
    
    <button class="btn btn-danger mt-4" type="button" @click="$emit('logout')">
      Logga ut
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '../modules/stores/auth'

export default defineComponent({
  name: 'LoginView',
  emits: ['logout'],
  setup() {
    const auth = useAuthStore() // Hämta storen här
    return { auth }
  }
})
</script>