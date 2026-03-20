<template>
  <transition name="popup-fade">
    <div class="popup-overlay" v-if="visible">
      <div class="popup-box border border-white">

        <div v-if="$slots.icon" class="popup-icon mb-3">
          <slot name="icon"></slot>
        </div>

        <h5 v-if="title" class="popup-title mb-1">{{ title }}</h5>
        <slot name="text"></slot>

        <div class="mt-3" v-if="buttons && buttons.length">
          <button
            v-for="(btn, index) in buttons"
            :key="index"
            class="btn-custom border border-white mt-2"
            @click="onButtonClick(btn)"
          >
            {{ btn.label }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
// Removed: unused import AppSpinner (spinner is passed via the icon slot from App.vue)

interface Button {
  label: string
  action?: () => void
  closeOnClick?: boolean
}

const props = defineProps<{
  visible: boolean
  title?: string
  loading?: boolean
  buttons?: Button[]
}>()

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void
  (e: 'close'): void
}>()

function onButtonClick(btn: Button) {
  if (btn.action) btn.action()
  if (btn.closeOnClick ?? true) {
    emit('update:visible', false)
    emit('close')
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.visible && !props.loading) {
    emit('update:visible', false)
    emit('close')
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.popup-box {
  background: rgba(73, 81, 64, 0.95);
  color: white;
  padding: 32px;
  border-radius: 15px;
  width: 320px;
  max-width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.popup-icon {
  font-size: 4.5rem;
  color: var(--success) !important;
  line-height: 1;
}

.popup-icon :deep(i),
.popup-icon :deep(svg) {
  font-size: 4.5rem;
}

.popup-title {
  color: white !important;
  font-weight: 600;
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.25s ease;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}
</style>
