<template>
  <div
    class="right-page text-white d-flex flex-column justify-content-start w-100"
    :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}"
  >

    <!-- Knapprad överst -->
    <div class="top-controls d-flex justify-content-center align-items-center gap-2 p-3 w-100">
      <!-- Desktop-knappar -->
      <div class="d-none d-md-flex">
        <button @click="toggleContact" class="btn-secondary-custom flex-grow-1 me-2">
          <i class="bi bi-at text-white fs-5"></i>{{ t('contact') }}
        </button>
        <button @click="toggleHelp" class="btn-secondary-custom flex-grow-1 mx-2">
          <i class="bi bi-question-circle text-white"></i>{{ t('help') }}
        </button>
      </div>

      <!-- Mobil dropdown -->
      <div class="action-dropdown position-relative d-md-none flex-grow-1 ms-2" style="gap: 0.5rem;">
        <button @click="toggleActionMenu" class="btn-secondary-custom btn-transparent">...</button>
        <div class="dropdown-menu-custom" :class="{ show: showActionMenu }">
          <button @click="handleMobileContact"><i class="bi bi-at"></i>{{ t('contact') }}</button>
          <button @click="handleMobileHelp"><i class="bi bi-question-circle"></i>{{ t('help') }}</button>
        </div>
      </div>

      <!-- Språk -->
      <div class="language-selector position-relative">
        <button @click="toggleLanguage" class="btn-secondary-custom d-flex align-items-center gap-2" style="width:140px;">
          <span :class="[flagClasses[state.currentLang], 'd-inline-block']" style="width:24px;height:16px;"></span>
          {{ languageNames[state.currentLang] }}
        </button>
        <div class="dropdown-menu-custom" :class="{ show: showLanguageMenu }">
          <button v-for="(name, code) in languageNames" :key="code" @click="selectLanguage(code as Lang)" :class="{ active: state.currentLang === code }">
            <span :class="[flagClasses[code as Lang], 'd-inline-block']" style="width:24px;height:16px;"></span>
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
    <ContactModal v-if="showContact" @close="handleContactClose" />
    <HelpModal v-if="showHelp" @close="showHelp = false" />

    <!-- Här visas PasswordDemands när användaren klickar på länken i ResetPasswordNew -->
    <PasswordDemands
      v-if="showPasswordDemands"
      @close="handleClosePasswordDemands"
    />

    <!-- <ResetPasswordNew
      v-if="isNewPasswordView"
      @show-password-demands="handleShowPasswordDemands"
    /> -->

  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '../i18n/useI18n'
import type { Lang } from '../i18n/useI18n'
import ContactModal from './RightViews/ContactModal.vue'
import HelpModal from './RightViews/HelpModal.vue'
import PasswordDemands from './RightViews/PasswordDemands/PasswordDemands.vue'
import bgImage from '../assets/RPageCard.jpg'

export default {
  props: { currentView: { type: String as () => string, required: true } },
  components: { ContactModal, HelpModal, PasswordDemands },
  setup() {
    const { state, changeLang, languageNames, t } = useI18n()

    const flagClasses: Record<string, string> = {
      sv: 'fi fi-se',
      en: 'fi fi-gb',
      fi: 'fi fi-fi',
      no: 'fi fi-no'
    }

    const showContact = ref(false)
    const showHelp = ref(false)
    const showLanguageMenu = ref(false)
    const showActionMenu = ref(false)
    const showPasswordDemands = ref(false)

    const toggleContact = () => { showContact.value = !showContact.value; if(showContact.value) showHelp.value = false; showLanguageMenu.value = false }
    const toggleHelp = () => { showHelp.value = !showHelp.value; if(showHelp.value) showContact.value = false; showLanguageMenu.value = false }
    const toggleLanguage = () => { showLanguageMenu.value = !showLanguageMenu.value }
    const toggleActionMenu = () => { showActionMenu.value = !showActionMenu.value }
    const selectLanguage = (langCode: string) => { changeLang(langCode as Lang); showLanguageMenu.value = false }

    const handleMobileContact = () => { showActionMenu.value = false; toggleContact() }
    const handleMobileHelp = () => { showActionMenu.value = false; toggleHelp() }
    const handleContactClose = () => { showContact.value = false }

    // ❌ Här tar vi emot event från ResetPasswordNew och visar PasswordDemands
    const handleShowPasswordDemands = () => { showPasswordDemands.value = true }
    const handleClosePasswordDemands = () => { showPasswordDemands.value = false }

    const isOverlayVisible = computed(() => showContact.value || showHelp.value || showLanguageMenu.value)

    return {
      state, languageNames, t, flagClasses,
      showContact, showHelp, showLanguageMenu, showActionMenu,
      toggleContact, toggleHelp, toggleLanguage, toggleActionMenu,
      selectLanguage, bgImage, isOverlayVisible,
      handleMobileContact, handleMobileHelp, handleContactClose,
      showPasswordDemands, handleShowPasswordDemands, handleClosePasswordDemands
    }
  }
}
</script>