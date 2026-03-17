import { defineStore } from 'pinia'
import { ref, markRaw, type Component } from 'vue'

interface PopupButton {
  label: string
  action: () => void
  variant?: 'primary' | 'secondary'
}

export const usePopupStore = defineStore('popup', () => {
  const visible = ref(false)
  const title = ref('')
  const message = ref('')
  const loading = ref(false)
  const component = ref<Component | null>(null)
  const buttons = ref<PopupButton[]>([])

  function show(config: {
    title: string
    message?: string
    loading?: boolean
    component?: Component
    buttons?: PopupButton[]
  }) {
    title.value = config.title
    message.value = config.message || ''
    loading.value = config.loading || false
    // markRaw är kritiskt för att undvika att Vue gör hela komponenten reaktiv
    component.value = config.component ? markRaw(config.component) : null
    buttons.value = config.buttons || []
    visible.value = true
  }

  function hide() {
    visible.value = false
  }

  return { visible, title, message, loading, component, buttons, show, hide }
})