<template>
  <transition name="popup-fade">
    <div class="popup-overlay" v-if="visible">
      <div class="popup-box border border-white">

        <!-- SVG-ikon -->
        <div class="mb-4">
          <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_378_990" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="67" height="67">
              <rect width="67" height="67" fill="white"/>
            </mask>
            <g mask="url(#mask0_378_990)">
              <path d="M29.5588 45.375L48.3271 26.6067L45.3854 23.665L29.5588 39.4916L21.6025 31.5354L18.6608 34.4771L29.5588 45.375ZM33.5257 60.0208C29.8575 60.0208 26.4095 59.3248 23.1819 57.9327C19.9543 56.5405 17.1468 54.6513 14.7594 52.2649C12.3721 49.8785 10.4819 47.0721 9.08886 43.8459C7.69629 40.6197 7 37.1727 7 33.5049C7 29.8366 7.69606 26.3887 9.08817 23.1611C10.4803 19.9334 12.3695 17.1259 14.7559 14.7386C17.1424 12.3513 19.9487 10.4611 23.1749 9.06802C26.4012 7.67544 29.8482 6.97916 33.5159 6.97916C37.1842 6.97916 40.6321 7.67521 43.8598 9.06732C47.0874 10.4594 49.8949 12.3487 52.2822 14.7351C54.6696 17.1215 56.5598 19.9278 57.9528 23.1541C59.3454 26.3803 60.0417 29.8273 60.0417 33.4951C60.0417 37.1634 59.3456 40.6113 57.9535 43.8389C56.5614 47.0666 54.6721 49.8741 52.2857 52.2614C49.8993 54.6487 47.093 56.5389 43.8668 57.932C40.6405 59.3245 37.1935 60.0208 33.5257 60.0208ZM33.5208 55.8333C39.7556 55.8333 45.0365 53.6698 49.3635 49.3427C53.6906 45.0156 55.8542 39.7347 55.8542 33.5C55.8542 27.2653 53.6906 21.9844 49.3635 17.6573C45.0365 13.3302 39.7556 11.1667 33.5208 11.1667C27.2861 11.1667 22.0052 13.3302 17.6781 17.6573C13.351 21.9844 11.1875 27.2653 11.1875 33.5C11.1875 39.7347 13.351 45.0156 17.6781 49.3427C22.0052 53.6698 27.2861 55.8333 33.5208 55.8333Z" fill="white"/>
            </g>
          </svg>
        </div>

        <span class="popup-text">{{ t('messageSent') }}</span>

        <button class="btn-custom border border-white mt-3" @click="closePopup">
          {{ t('okayClose') }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from '../../i18n/useI18n'

// Definierar att komponenten skickar ut ett "close"-event
const emit = defineEmits<{
  (e: 'close'): void
}>()

// Översättningsfunktionen
const { t } = useI18n()

// Synlighet på popupen
const visible = ref(true)

// Funktion som stänger popupen
function closePopup() {
  visible.value = false   // göm popupen
  emit('close')           // meddela föräldern
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.popup-box {
  background: rgba(73, 81, 64, 0.9);
  color: white;
  padding: 32px;
  border-radius: 10px;
  width: 300px;
  height: 260px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.3s ease;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}
</style>