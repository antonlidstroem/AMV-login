<template>
  <transition name="popup-fade">
    <div class="popup-overlay" v-if="visible">
      <div class="popup-box border border-white">

        <!-- Spinner -->
        <div v-if="loading" class="lds-spinner mb-3">
          <div v-for="n in 12" :key="n"></div>
        </div>

        <!-- Valfri ikon slot -->
        <div class="popup-icon mb-4">
        <slot name="icon"></slot>
        </div>

        <!-- Titel -->
        <h5 v-if="title" class="popup-title mb-2">{{ title }}</h5>

        <!-- Text slot -->
        <slot name="text"></slot>

        <!-- Knappar -->
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

<script lang="ts" setup>


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

// **Obs:** ingen lokal ref för visible – använd props.visible direkt i template
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* hög siffra */
}

.popup-box {
  background: rgba(73, 81, 64, 0.9);
  color: white;
  padding: 32px;
  border-radius: 10px;
  width: 300px;
  max-width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.25s ease;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}

.popup-icon,
.popup-icon i,
.popup-icon svg {
  font-size: 3rem;
  color: var(--success) !important;
}

.popup-box h1,
.popup-box h2,
.popup-box h3,
.popup-box h4,
.popup-box h5,
.popup-box h6 {
  color: white !important;
}

/* Spinner */
.lds-spinner {
  color: white;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3.2px;
  left: 36.8px;
  width: 6.4px;
  height: 17.6px;
  border-radius: 20%;
  background: white;
}
.lds-spinner div:nth-child(1) { transform: rotate(0deg); animation-delay: -1.1s; }
.lds-spinner div:nth-child(2) { transform: rotate(30deg); animation-delay: -1s; }
.lds-spinner div:nth-child(3) { transform: rotate(60deg); animation-delay: -0.9s; }
.lds-spinner div:nth-child(4) { transform: rotate(90deg); animation-delay: -0.8s; }
.lds-spinner div:nth-child(5) { transform: rotate(120deg); animation-delay: -0.7s; }
.lds-spinner div:nth-child(6) { transform: rotate(150deg); animation-delay: -0.6s; }
.lds-spinner div:nth-child(7) { transform: rotate(180deg); animation-delay: -0.5s; }
.lds-spinner div:nth-child(8) { transform: rotate(210deg); animation-delay: -0.4s; }
.lds-spinner div:nth-child(9) { transform: rotate(240deg); animation-delay: -0.3s; }
.lds-spinner div:nth-child(10){ transform: rotate(270deg); animation-delay: -0.2s; }
.lds-spinner div:nth-child(11){ transform: rotate(300deg); animation-delay: -0.1s; }
.lds-spinner div:nth-child(12){ transform: rotate(330deg); animation-delay: 0s; }
@keyframes lds-spinner { 0% { opacity: 1 } 100% { opacity: 0 } }
</style>