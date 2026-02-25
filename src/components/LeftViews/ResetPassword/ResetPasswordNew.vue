<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <h4>{{ t('EnterNewPassword') }}</h4>

    <div v-if="errorMsg" class="error-banner">{{ errorMsg }}</div>

    <label>{{ t('newPassword') }}</label>
    <input type="password" v-model="p1" class="form-control mb-2" :class="inputClass" />

    <label>{{ t('confirmPassword') }}</label>
    <input type="password" v-model="p2" class="form-control mb-2" :class="inputClass" />

    <button class="btn-custom w-100" @click="change">
      {{ t('changePassword') }}
    </button>

    <div class="d-flex justify-content-between align-items-center mt-3">
      <a 
        href="#" 
        class="password-link"
        @click.prevent="showDemands"
      >
        {{ t('showPasswordDemands') }}
      </a>

    <Popup
      v-if="success"
      title="✔"
      text="Du har nu bytt lösenord."
      button="Till inloggning"
      @close="$emit('change-view','login')"
    />
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import Popup from '../../common/LoginPopup.vue'

export default defineComponent({
  name: 'ResetPasswordForm',
  components: { Popup },

  emits: {
    'change-view': (view: string) => typeof view === 'string',
    'show-password-demands': () => true
  },

  setup(_, { emit }) {
    const { t } = useI18n()

    // ── State ─────────────────────────────
    const p1 = ref<string>('')
    const p2 = ref<string>('')
    const errorMsg = ref<string>('')
    const success = ref<boolean>(false)

    // ── Computed ──────────────────────────
    const inputClass = computed(() =>
      errorMsg.value ? 'error-border' : ''
    )

    // ── Methods ──────────────────────────
    const change = () => {
      if (p1.value !== p2.value) {
        errorMsg.value = 'De angivna lösenorden stämmer inte överens'
        return
      }

      if (p1.value.length < 5) {
        errorMsg.value = 'Ditt lösenord uppfyller inte kraven'
        return
      }

      errorMsg.value = ''
      success.value = true
    }

    const showDemands = () => {
      emit('show-password-demands')
    }

    return {
      t,
      p1,
      p2,
      errorMsg,
      success,
      inputClass,
      change,
      showDemands
    }
  }
})
</script>