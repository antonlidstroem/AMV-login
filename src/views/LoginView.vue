<template>
  <div class="main-container d-flex flex-column flex-md-row shadow rounded-5 w-100 p-0" style="max-width:1120px; width:100%;">
    <AuthLayoutLeft
      class="d-none d-md-flex flex-fill"
      :currentView="currentView"
      @change-view="handleViewChange"
      @show-password-demands="showDemands = !showDemands"
      @trigger-error="handleLoginError"
      @show-popup="$emit('show-popup', $event)"
    />

    <div class="col-12 col-md-6 d-flex p-0">
      <AuthLayoutRight
        class="flex-fill d-flex flex-column"
        :currentView="currentView"
        :externalShowDemands="showDemands"
        :force-open-contact="contactTrigger"
        @change-view="handleViewChange"
        @contact-opened="contactTrigger = false"
        @close-demands="showDemands = false"
        @show-popup="$emit('show-popup', $event)"
      >
        <template #mobile-left>
          <div class="d-flex d-md-none w-100 justify-content-center align-items-start py-3 px-2">
            <AuthLayoutLeft
              class="w-100"
              style="max-width: 460px; width: 100%;"
              :currentView="currentView"
              @change-view="handleViewChange"
              @trigger-error="handleLoginError"
              @show-password-demands="showDemands = !showDemands"
              @show-popup="$emit('show-popup', $event)"
            />
          </div>
        </template>
      </AuthLayoutRight>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayoutLeft from '../components/AuthLayoutLeft.vue'
import AuthLayoutRight from '../components/AuthLayoutRight.vue'
import { useAuthStore, type AuthUser } from '../stores/auth'
import type { ViewType } from '../types/views'

const emit = defineEmits(['show-popup', 'trigger-error'])
const auth = useAuthStore()
const router = useRouter()

const currentView = ref<ViewType>('login')
const showDemands = ref(false)
const contactTrigger = ref(false)

const handleViewChange = (view: ViewType, payload?: AuthUser) => {
  if (payload) auth.setPendingUser(payload)
  
  if (view === 'authenticated-view') {
    auth.confirmLogin()
    router.push('/dashboard') // <--- VIKTIGT: Här byter vi sida i routern
  } else {
    currentView.value = view
  }
}

const handleLoginError = () => {
  emit('trigger-error', {
    action: () => { contactTrigger.value = true }
  })
}
</script>