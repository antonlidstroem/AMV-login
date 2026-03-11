<template>
  <transition name="popup-fade">
    <div class="popup-overlay" v-if="visible">
      <div class="popup-box border border-white">
        
        <div class="error-icon mb-4">
          <i :class="icon"></i>
        </div>

        <h5 class="mb-4 text-white">{{ message }}</h5>

        <div v-if="buttonLabel" class="w-100">
          <button 
            class="btn-custom border border-white" 
            @click="$emit('action')"
          >
            {{ buttonLabel }}
          </button>
        </div>

        <button class="btn-close-x" @click="$emit('update:visible', false)">
          <i class="bi bi-x"></i>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  icon: string
  message: string
  buttonLabel?: string
}>()

defineEmits(['update:visible', 'action'])
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.popup-box {
  background: rgba(134, 43, 43, 0.95);
  color: white;
  padding: 40px;
  border-radius: 20px;
  width: 350px;
  max-width: 90%;
  text-align: center;
  position: relative;
}
.error-icon { font-size: 4rem; color: white; }
.btn-close-x {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}
.popup-fade-enter-active, .popup-fade-leave-active { transition: opacity 0.2s; }
.popup-fade-enter-from, .popup-fade-leave-to { opacity: 0; }
</style>
