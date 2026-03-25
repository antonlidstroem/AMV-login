import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { ViewType } from '../types/views'

export const useUIStore = defineStore('ui', () => {
  const router = useRouter()
  const currentView = ref<ViewType>('login')
  
  const showContact = ref(false)
  const showHelp = ref(false)
  const showDemands = ref(false)

  const anyOverlayOpen = computed(() => showContact.value || showHelp.value || showDemands.value)

  function setView(view: ViewType) {
    if (view === 'authenticated-view') {
      router.push('/dashboard')
      return
    }
    currentView.value = view
    closeOverlays()
  }

  function toggleContact(force?: boolean) {
    showContact.value = typeof force === 'boolean' ? force : !showContact.value
    if (showContact.value) { showHelp.value = false; showDemands.value = false }
  }

  function toggleHelp() {
    showHelp.value = !showHelp.value
    if (showHelp.value) { showContact.value = false; showDemands.value = false }
  }

  function toggleDemands() {
    showDemands.value = !showDemands.value
    if (showDemands.value) { showContact.value = false; showHelp.value = false }
  }

  function closeOverlays() {
    showContact.value = false
    showHelp.value = false
    showDemands.value = false
  }

  function reset() {
    currentView.value = 'login'
    closeOverlays()
  }

  return { 
    currentView, showContact, showHelp, showDemands, anyOverlayOpen,
    setView, toggleContact, toggleHelp, toggleDemands, closeOverlays, reset 
  }
})