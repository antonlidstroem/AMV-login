<template>
  <div class="right-page-container" :style="backgroundStyle">
    <div class="fixed-top-bar">
      <div class="top-controls d-flex justify-content-center align-items-center gap-2 p-3 w-100">
        
        <div class="d-none d-md-flex">
          <button @click="toggleContact" class="btn-secondary-custom flex-grow-1 me-2" type="button">
            <i class="bi bi-at text-white fs-5"></i>{{ t('contact') }}
          </button>
          <button @click="toggleHelp" class="btn-secondary-custom flex-grow-1 mx-2" type="button">
            <i class="bi bi-question-circle text-white"></i>{{ t('help') }}
          </button>
        </div>

        <div class="action-dropdown position-relative d-md-none flex-grow-1 ms-2">
          <button @click="toggleActionMenu" class="btn-secondary-custom btn-transparent" type="button">
            <i class="bi bi-list fs-1"></i>
          </button>
          <div class="dropdown-menu-custom" :class="{ show: showActionMenu }">
            <button @click="handleMobileContact" type="button">
              <i class="bi bi-at me-2"></i>{{ t('contact') }}
            </button>
            <button @click="handleMobileHelp" type="button">
              <i class="bi bi-question-circle me-2"></i>{{ t('help') }}
            </button>
          </div>
        </div>

        <div class="language-selector position-relative">
          <button @click="showLanguageMenu = !showLanguageMenu" class="btn-secondary-custom d-flex align-items-center gap-2 w-100" type="button">
            <span :class="[flagClasses[locale], 'd-inline-block']" style="width:24px;height:16px;"></span>
            <span class="d-none d-md-inline">{{ (languageNames as any)[locale] }}</span>
            <span class="d-md-none d-flex align-items-center gap-1 text-nowrap">
              {{ shortLanguageNames[locale] }}
              <i class="bi bi-caret-down-fill" style="font-size: 0.7rem;"></i>
            </span>
          </button>
          
          <div class="dropdown-menu-custom w-100" :class="{ show: showLanguageMenu }">
            <button 
              v-for="(name, code) in languageNames" 
              :key="code" 
              @click="selectLanguage(code as string)" 
              :class="{ active: locale === code }" 
              class="w-100" 
              type="button"
            >
              <span :class="[flagClasses[code as string], 'd-inline-block']" style="width:24px;height:16px;"></span>
              <span class="d-none d-md-inline">{{ name }}</span>
              <span class="d-md-none">{{ shortLanguageNames[code as string] }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="scrollable-content">
      <div class="content-padding">
        <OverlayContact v-if="showContact" @close="showContact = false" @show-popup="emit('show-popup', $event)" />
        <OverlayHelp v-if="showHelp" @close="showHelp = false" />
        <OverlayPasswordDemands v-if="showOverlayPasswordDemands" @close="handleCloseOverlayPasswordDemands" @show-popup="emit('show-popup', $event)" />
        
        <div v-show="!shouldHideMobileContent" class="mobile-left-page">
          <slot name="mobile-left"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { languageNames } from '../modules/i18n/translations'
import OverlayContact from './overlays/OverlayContact.vue'
import OverlayHelp from './overlays/OverlayHelp.vue'
import OverlayPasswordDemands from './overlays/password-demands/OverlayPasswordDemands.vue'
import bgImage from '../assets/auth-background.jpg'

const props = defineProps<{
  currentView: string,
  externalShowDemands?: boolean,
  forceOpenContact?: boolean
}>()

const emit = defineEmits(['change-view', 'close-demands', 'contact-opened', 'show-popup'])

const { t, locale } = useI18n()

const flagClasses: Record<string, string> = { sv: 'fi fi-se', en: 'fi fi-gb'}
const shortLanguageNames: Record<string, string> = { sv: 'SE', en: 'GB' }

const showContact = ref(false)
const showHelp = ref(false)
const showLanguageMenu = ref(false)
const showActionMenu = ref(false) // För hamburger-menyn
const showOverlayPasswordDemands = ref(false)

const selectLanguage = (langCode: string) => {
  locale.value = langCode
  showLanguageMenu.value = false
}

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}))

// Funktioner
const toggleActionMenu = () => {
  showActionMenu.value = !showActionMenu.value
  if (showActionMenu.value) showLanguageMenu.value = false
}

const toggleContact = () => {
  showContact.value = !showContact.value
  if (showContact.value) { 
    showHelp.value = false; 
    showOverlayPasswordDemands.value = false; 
    emit('close-demands'); 
  }
  showLanguageMenu.value = false
}

const toggleHelp = () => {
  showHelp.value = !showHelp.value
  if (showHelp.value) { 
    showContact.value = false; 
    showOverlayPasswordDemands.value = false; 
    emit('close-demands'); 
  }
  showLanguageMenu.value = false
}

const handleMobileContact = () => {
  showActionMenu.value = false
  toggleContact()
}

const handleMobileHelp = () => {
  showActionMenu.value = false
  toggleHelp()
}

const handleCloseOverlayPasswordDemands = () => {
  showOverlayPasswordDemands.value = false
  emit('close-demands')
}

// Stäng menyer när man klickar utanför
const handleGlobalClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.language-selector')) showLanguageMenu.value = false
  if (!target.closest('.action-dropdown')) showActionMenu.value = false
}

onMounted(() => document.addEventListener('click', handleGlobalClick, true))
onUnmounted(() => document.removeEventListener('click', handleGlobalClick, true))

const shouldHideMobileContent = computed(() => showContact.value || showHelp.value || showOverlayPasswordDemands.value)
</script>

<style scoped>
/* Behållaren fyller hela högra sidan */
.right-page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.fixed-top-bar {
  flex: 0 0 auto;
  z-index: 100;
  background: transparent;
}

.scrollable-content {
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.content-padding {
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Stil för dropdown-menyn (Samma som förut) */
.dropdown-menu-custom {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: none;
  flex-direction: column;
  min-width: 150px;
  margin-top: 5px;
  overflow: hidden;
}

.dropdown-menu-custom.show {
  display: flex;
}

.dropdown-menu-custom button {
  background: transparent;
  border: none;
  padding: 10px 15px;
  text-align: left;
  color: #333;
  display: flex;
  align-items: center;
}

.dropdown-menu-custom button:hover {
  background: #f5f5f5;
}

.btn-transparent {
  background: transparent !important;
  border: none !important;
  color: white !important;
  padding: 0 !important;
}

@media (max-width: 768px) {
  .right-page-container {
    height: 100dvh; 
  }
}
</style>