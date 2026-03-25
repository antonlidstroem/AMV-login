<template>
  <div class="right-page" :style="backgroundStyle">
    <div>
      <div class="top-controls d-flex justify-content-center align-items-center gap-2 p-3 w-100">

        <!-- Desktop buttons -->
        <div class="d-none d-md-flex">
          <button @click="ui.toggleContact()" class="btn-secondary-custom flex-grow-1 me-2" type="button">
            <i class="bi bi-at text-white fs-5"></i>{{ t('contact') }}
          </button>
          <button @click="ui.toggleHelp()" class="btn-secondary-custom flex-grow-1 mx-2" type="button">
            <i class="bi bi-question-circle text-white"></i>{{ t('help') }}
          </button>
        </div>

        <!-- Mobile hamburger -->
        <div class="action-dropdown position-relative d-md-none flex-grow-1 ms-1" @click.stop>
          <button
            @click="showActionMenu = !showActionMenu"
            class="btn-secondary-custom btn-transparent"
            type="button"
          >
            <i class="bi bi-list fs-1"></i>
          </button>
          <div class="dropdown-menu-custom" :class="{ show: showActionMenu }">
            <button @click="ui.toggleContact(); showActionMenu = false" type="button">
              <i class="bi bi-at me-2"></i>{{ t('contact') }}
            </button>
            <button @click="ui.toggleHelp(); showActionMenu = false" type="button">
              <i class="bi bi-question-circle me-2"></i>{{ t('help') }}
            </button>
          </div>
        </div>

        <!-- Language selector -->
        <div class="language-selector position-relative" @click.stop>
          <button
            @click="showLanguageMenu = !showLanguageMenu"
            class="btn-secondary-custom d-flex align-items-center gap-1 w-100"
            type="button"
          >
            <span :class="[flagClasses[locale], 'd-inline-block']" style="width:24px;height:16px;"></span>
            <span class="d-none d-md-inline">{{ (languageNames as any)[locale] }}</span>
            <span class="d-md-none">
              {{ shortLanguageNames[locale] }} <i class="bi bi-caret-down-fill small"></i>
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
              <span
                :class="[flagClasses[code as string], 'd-inline-block']"
                style="width:24px;height:16px;"
              ></span>
              <span class="d-none d-md-inline ms-2">{{ name }}</span>
              <span class="d-md-none ms-2">{{ shortLanguageNames[code as string] }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="scrollable-content">
      <div class="content-padding">
        <OverlayContact v-if="ui.showContact" />
        <OverlayHelp v-if="ui.showHelp" />
        <OverlayPasswordDemands v-if="ui.showDemands" />

        <div v-show="!ui.anyOverlayOpen" class="mobile-left-page">
          <slot name="mobile-left"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUIStore } from '../modules/stores/ui'
import { languageNames } from '../modules/i18n/translations'
import OverlayContact from './overlays/OverlayContact.vue'
import OverlayHelp from './overlays/OverlayHelp.vue'
import OverlayPasswordDemands from './overlays/password-demands/OverlayPasswordDemands.vue'
import bgImage from '../assets/auth-background.jpg'

const { t, locale } = useI18n()
const ui = useUIStore()

const showLanguageMenu = ref(false)
const showActionMenu = ref(false)

const flagClasses: Record<string, string> = { sv: 'fi fi-se', en: 'fi fi-gb' }
const shortLanguageNames: Record<string, string> = { sv: 'SE', en: 'GB' }

const selectLanguage = (lang: string) => {
  locale.value = lang
  showLanguageMenu.value = false
}

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}))

const handleGlobalClick = () => {
  showLanguageMenu.value = false
  showActionMenu.value = false
}

onMounted(() => document.addEventListener('click', handleGlobalClick))
onUnmounted(() => document.removeEventListener('click', handleGlobalClick))
</script>
