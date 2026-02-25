<template>
<div
  class="right-page text-white d-flex flex-column justify-content-start w-100"
  :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}"
>

    <!-- Knapprad överst -->
<div class="top-controls d-flex justify-content-center align-items-center  gap-2 p-3 w-100">

  
  <div class="d-none d-md-flex">
  <button @click="toggleContact" class="btn-secondary-custom flex-grow-1 me-2">
    <i class="bi bi-at text-white fs-5"></i>{{ t('contact') }}
  </button>
  <button @click="toggleHelp" class="btn-secondary-custom flex-grow-1 mx-2">
    <i class="bi bi-question-circle text-white"></i>{{ t('help') }}
  </button>
</div>

  <!-- Mobil dropdown för Kontakt/Hjälp -->
  <div class="action-dropdown position-relative d-md-none flex-grow-1 ms-2" style="gap: 0.5rem; ">
    <button @click="toggleActionMenu" class="btn-secondary-custom btn-transparent">
        <svg width="42" height="31" viewBox="0 0 42 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_482_4169)">
          <mask id="mask0_482_4169" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="3" y="1" width="35" height="24">
          <rect x="3.86328" y="1.72621" width="33.9524" height="23" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_482_4169)">
          <path d="M4 24.4524V20.7103H37.6786V24.4524H4ZM4 15.0972V11.3552H37.6786V15.0972H4ZM4 5.74206V2H37.6786V5.74206H4Z" fill="white"/>
          </g>
          </g>
          <defs>
          <filter id="filter0_d_482_4169" x="0" y="0" width="41.6787" height="30.4524" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="2"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_482_4169"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_482_4169" result="shape"/>
          </filter>
          </defs>
          </svg>
      
    </button>

    <div class="dropdown-menu-custom" :class="{ show: showActionMenu }">
      <button @click="handleMobileContact">
        <i class="bi bi-at text-white fs-5"></i>{{ t('contact') }}
      </button>
      <button @click="handleMobileHelp">
         <i class="bi bi-question-circle text-white"></i>{{ t('help') }}
      </button>
    </div>
  </div>

   <!-- Språkknapp -->
<div class="language-selector position-relative">
  <button
    @click="toggleLanguage"
    class="btn-secondary-custom d-flex align-items-center justify-content-start gap-2"
    style="width: 140px;"
  >
    <span :class="[flagClasses[state.currentLang], 'd-inline-block']"
          style="width: 24px; height: 16px;">
    </span>
    {{ languageNames[state.currentLang] }}
  </button>

  <!-- Dropdown med alla språk -->
  <div class="dropdown-menu-custom" :class="{ show: showLanguageMenu }">
    <button
      v-for="(name, code) in languageNames"
      :key="code"
      @click="selectLanguage(code as Lang)"
      :class="{ active: state.currentLang === code }"
    >
      <span :class="[flagClasses[code as Lang], 'd-inline-block']"
            style="width: 24px; height: 16px;"></span>
      {{ name }}
    </button>
  </div>
</div>
    </div>



    <!-- Mobil: LPage inuti RPage -->
    <div v-show="!isOverlayVisible" class="mobile-left-page">
      <slot name="mobile-left"></slot>
    </div>


    <!-- Modals -->
    <!-- <ContactModal v-if="showContact" @close="showContact = false" /> -->
     <ContactModal v-if="showContact" @close="handleContactClose" />
    <HelpModal v-if="showHelp" @close="showHelp = false" />
    <PasswordDemands 
      v-if="showPasswordDemands" 
      @close="handleClosePasswordDemands" 
    />


  </div>
</template>
<script lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from '../i18n/useI18n'
import type { Lang } from '../i18n/useI18n'
import ContactModal from './RightViews/ContactModal.vue'
import HelpModal from './RightViews/HelpModal.vue'
import bgImage from '../assets/RPageCard.jpg'
import PasswordDemands from './RightViews/PasswordDemands.vue'


export default {
  components: { ContactModal, HelpModal, PasswordDemands },
  setup() {
    const { state, changeLang, languageNames, t } = useI18n()

    type LangCode = keyof typeof languageNames
    const flagClasses: Record<LangCode, string> = {
      sv: 'fi fi-se',
      en: 'fi fi-gb',
      fi: 'fi fi-fi',
      no: 'fi fi-no'
    }

    const showContact: Ref<boolean> = ref(false)
    const showHelp: Ref<boolean> = ref(false)
    const showLanguageMenu: Ref<boolean> = ref(false)
    const showActionMenu: Ref<boolean> = ref(false)

    const toggleContact = () => {
      showContact.value = !showContact.value
      if (showContact.value) showHelp.value = false
      showLanguageMenu.value = false
    }

    const toggleHelp = () => {
      showHelp.value = !showHelp.value
      if (showHelp.value) showContact.value = false
      showLanguageMenu.value = false
    }

    const toggleLanguage = () => {
      showLanguageMenu.value = !showLanguageMenu.value
    }

    const toggleActionMenu = () => {
      showActionMenu.value = !showActionMenu.value
    }

    const selectLanguage = (langCode: LangCode) => {
      changeLang(langCode)
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

    const handleContactClose = () => {
      showContact.value = false
    }

    const showPasswordDemands: Ref<boolean> = ref(false)

    const handleShowPasswordDemands = () => {
      showPasswordDemands.value = true
    }

    const handleClosePasswordDemands = () => {
      showPasswordDemands.value = false
    }

    const isOverlayVisible = computed<boolean>(() => {
      return showContact.value || showHelp.value || showLanguageMenu.value
    })

    return {
      state,
      languageNames,
      t,
      showContact,
      showHelp,
      showLanguageMenu,
      showActionMenu,
      toggleContact,
      toggleHelp,
      toggleLanguage,
      toggleActionMenu,
      selectLanguage,
      bgImage,
      isOverlayVisible,
      handleMobileContact,
      handleMobileHelp,
      flagClasses,
      handleContactClose,
      handleShowPasswordDemands,
      handleClosePasswordDemands,
      showPasswordDemands
    }
  }
}
</script>
