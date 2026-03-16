import { defineStore } from 'pinia'
import { ref, markRaw, type Component } from 'vue'

export const usePopupStore = defineStore('popup', () => {
  const visible = ref(false)
  const title = ref('')
  const component = ref<Component | null>(null)
  const loading = ref(false)
  const buttons = ref<any[]>([])

  function show(config: { 
    title?: string, 
    component?: Component, 
    loading?: boolean, 
    buttons?: any[] 
  }) {
    title.value = config.title || ''
    loading.value = config.loading || false
    buttons.value = config.buttons || []
    
    // VIKTIGT: markRaw förhindrar reaktivitets-overhead på komponenten
    component.value = config.component ? markRaw(config.component) : null
    visible.value = true
  }

  function hide() {
    visible.value = false
    // Återställ efter transitionen (valfritt)
    setTimeout(() => { component.value = null }, 300)
  }

  return { visible, title, component, loading, buttons, show, hide }
})