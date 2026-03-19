import { defineStore } from 'pinia'
import { ref, markRaw, type Component } from 'vue'

export interface PopupButton {
  label: string
  action: () => void
  closeOnClick?: boolean
}

export const usePopupStore = defineStore('popup', () => {
  const visible = ref(false)
  const title = ref('')
  const loading = ref(false)
  const component = ref<Component | null>(null)
  const icon = ref('')
  const buttons = ref<PopupButton[]>([])

  function show(config: {
    title?: string
    loading?: boolean
    component?: Component
    icon?: string
    buttons?: PopupButton[]
    duration?: number
  }) {
    title.value = config.title ?? ''
    loading.value = config.loading ?? false
    component.value = config.component ? markRaw(config.component) : null
    icon.value = config.icon ?? ''
    buttons.value = config.buttons ?? []
    visible.value = true

    if (config.duration) {
      setTimeout(() => (visible.value = false), config.duration)
    }
  }

  function hide() {
    visible.value = false
  }

  return { visible, title, loading, component, icon, buttons, show, hide }
})