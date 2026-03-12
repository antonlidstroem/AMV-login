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
          <button @click="showActionMenu = !showActionMenu" class="btn-secondary-custom btn-transparent" type="button">
            <i class="bi bi-list fs-1"></i>
          </button>
          <div class="dropdown-menu-custom" :class="{ show: showActionMenu }">
            <button @click="handleMobileContact" type="button"><i class="bi bi-at"></i>{{ t('contact') }}</button>
            <button @click="handleMobileHelp" type="button"><i class="bi bi-question-circle"></i>{{ t('help') }}</button>
          </div>
        </div>

        <div class="language-selector position-relative">
          <button @click="showLanguageMenu = !showLanguageMenu" class="btn-secondary-custom d-flex align-items-center gap-2 w-100" type="button">
            <span :class="[flagClasses[state.currentLang], 'd-inline-block']" style="width:24px;height:16px;"></span>
            <span class="d-none d-md-inline">{{ languageNames[state.currentLang] }}</span>
            <span class="d-md-none d-flex align-items-center gap-1 text-nowrap">
              {{ shortLanguageNames[state.currentLang] }}
              <i class="bi bi-caret-down-fill" style="font-size: 0.7rem;"></i>
            </span>
          </button>
          
          <div class="dropdown-menu-custom w-100" :class="{ show: showLanguageMenu }">
            <button v-for="(name, code) in languageNames" :key="code" @click="selectLanguage(code as string)" :class="{ active: state.currentLang === code }" class="w-100" type="button">
              <span :class="[flagClasses[code as string], 'd-inline-block']" style="width:24px;height:16px;"></span>
              <span class="d-none d-md-inline">{{ name }}</span>
              <span class="d-md-none">{{ shortLanguageNames[code] }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="scrollable-content">
      <div class="content-padding">
        <ContactModal 
          v-if="showContact" 
          @close="showContact = false" 
          @show-popup="emit('show-popup', $event)" 
        />
        
        <HelpModal 
          v-if="showHelp" 
          @close="showHelp = false" 
        />
        
        <PasswordDemands 
          v-if="showPasswordDemands" 
          @close="handleClosePasswordDemands" 
          @show-popup="emit('show-popup', $event)" 
        />

        <div v-show="!shouldHideMobileContent" class="mobile-left-page">
          <slot name="mobile-left"></slot>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../i18n/useI18n'
import type { Lang } from '../i18n/useI18n'
import ContactModal from './RightViews/ContactModal.vue'
import HelpModal from './RightViews/HelpModal.vue'
import PasswordDemands from './RightViews/PasswordDemands/PasswordDemands.vue'
import bgImage from '../assets/RPageCard.jpg'

const props = defineProps<{
  currentView: string,
  externalShowDemands?: boolean,
  forceOpenContact?: boolean
}>()

const emit = defineEmits(['change-view', 'close-demands', 'contact-opened', 'show-popup'])

const { state, changeLang, languageNames, t } = useI18n()
const flagClasses: Record<string, string> = { sv: 'fi fi-se', en: 'fi fi-gb'}
const shortLanguageNames: Record<string, string> = { sv: 'SE', en: 'GB' }

const showContact = ref(false)
const showHelp = ref(false)
const showLanguageMenu = ref(false)
const showActionMenu = ref(false)
const showPasswordDemands = ref(false)

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed'
}))

watch(() => props.externalShowDemands, (newVal) => {
  showPasswordDemands.value = !!newVal
  if (newVal) { showContact.value = false; showHelp.value = false; }
})

watch(() => props.forceOpenContact, (newVal) => {
  if (newVal) {
    showContact.value = true; showHelp.value = false; showPasswordDemands.value = false;
    emit('contact-opened')
  }
})

const toggleContact = () => {
  showContact.value = !showContact.value
  if (showContact.value) { showHelp.value = false; showPasswordDemands.value = false; emit('close-demands'); }
  showLanguageMenu.value = false
}

const toggleHelp = () => {
  showHelp.value = !showHelp.value
  if (showHelp.value) { showContact.value = false; showPasswordDemands.value = false; emit('close-demands'); }
  showLanguageMenu.value = false
}

const selectLanguage = (langCode: string) => {
  changeLang(langCode as Lang)
  showLanguageMenu.value = false
}

const handleMobileContact = () => { showActionMenu.value = false; toggleContact(); }
const handleMobileHelp = () => { showActionMenu.value = false; toggleHelp(); }
const handleClosePasswordDemands = () => { showPasswordDemands.value = false; emit('close-demands'); }

const handleGlobalClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.language-selector')) showLanguageMenu.value = false
  if (!target.closest('.action-dropdown')) showActionMenu.value = false
}

onMounted(() => document.addEventListener('click', handleGlobalClick, true))
onUnmounted(() => document.removeEventListener('click', handleGlobalClick, true))

const shouldHideMobileContent = computed(() => showContact.value || showHelp.value || showPasswordDemands.value)
</script>

<style scoped>
/* Behållaren fyller hela högra sidan */
.right-page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden; /* Förhindrar att själva containern skrollar */
  position: relative;
}

/* Toppfälten sitter fast */
.fixed-top-bar {
  flex: 0 0 auto;
  z-index: 100;
  background: transparent;
}

/* Innehållet tar upp resten av platsen och skrollar internt */
.scrollable-content {
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  /* Detta gör att innehållet klipper precis vid toppfältets slut */
}

.content-padding {
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .right-page-container {
    height: 100dvh; /* Viktigt på mobil */
  }
}
</style>