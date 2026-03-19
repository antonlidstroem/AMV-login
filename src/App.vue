<template>
  <div class="page-wrapper min-vh-100 d-md-flex justify-content-md-center align-items-md-center">
    
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <AppPopupGeneric
      v-model:visible="popup.visible"
      :title="popup.title"
      :loading="popup.loading"
      :buttons="popup.buttons"
    >
      <template #icon>
        <transition name="popup-media" mode="out-in">
          <AppSpinner v-if="popup.loading" color="white" key="spinner" />
          <component 
            v-else-if="popup.component" 
            :is="popup.component" 
            color="white" 
          />
          <i v-else-if="popup.icon" :class="popup.icon"></i>
        </transition>
      </template>
    </AppPopupGeneric>
  </div>
</template>

<script setup lang="ts">
import { usePopupStore } from './modules/stores/popup'
import AppPopupGeneric from './components/common/AppPopupGeneric.vue'
import AppSpinner from './components/common/AppSpinner.vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './modules/stores/auth'

const authStore = useAuthStore()
const popup = usePopupStore()
const router = useRouter()


    watch(() => authStore.isLoggedIn, (loggedIn) => {
      if (loggedIn) {
        router.push('/dashboard')
      } else {
        router.push('/')
      }
    }, { immediate: true }) // immediate kollar även när appen laddas första gången
</script>

<style>
/* Transition för sidbyten */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transition för ikoner/spinners inuti popupen */
.popup-media-enter-active,
.popup-media-leave-active {
  transition: all 0.3s ease;
}

.popup-media-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.popup-media-leave-to {
  opacity: 0;
  transform: scale(1.2);
}

/* Bas-styling för att säkerställa att wrapper tar hela höjden */
.page-wrapper {
  background-color: #f8f9fa;
  overflow-x: hidden;
}
</style>