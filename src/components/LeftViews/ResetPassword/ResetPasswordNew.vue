<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <img :src="AMVLogo" class="logo-top" />
    <h4 class="mb-4">{{ t('EnterNewPassword') }}</h4>

    <div v-if="errorMsg" class="error-banner">{{ errorMsg }}</div>
    <PasswordCheck v-if="errorMsg" :password="p1" />

    <label class="mb-2">{{ t('newPassword') }}</label>
    <input type="password" v-model="p1" class="form-control mb-2" :class="inputClass" />

    <label class="mb-2">{{ t('confirmPassword') }}</label>
    <input type="password" v-model="p2" class="form-control mb-4" :class="inputClass" />

    <!-- Länk som skickar event uppåt -->
    <a href="#" class="password-link d-block mb-3" @click.prevent="showDemands">
      <i class="bi bi-question-circle"></i> {{ t('passwordRequirements') }}
    </a>

    <button class="btn-custom w-100" @click="change">{{ t('changePassword') }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import AMVLogo from '../../../assets/logo_horizontal.svg'
import PasswordCheck from '../../RightViews/PasswordDemands/PasswordCheck.vue'

export default defineComponent({
  name: 'ResetPasswordNew',
  components: { PasswordCheck },
  emits: ['change-view', 'show-password-demands'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const p1 = ref(''), p2 = ref(''), errorMsg = ref(''), success = ref(false)
    const inputClass = computed(() => errorMsg.value ? 'error-border' : '')

    const change = () => {
      if (p1.value !== p2.value) { errorMsg.value = 'De angivna lösenorden stämmer inte överens'; return }
      if (p1.value.length < 5) { errorMsg.value = 'Ditt lösenord uppfyller inte kraven'; return }
      errorMsg.value = ''; success.value = true
    }

    // ✅ Klick på länk skickar event till RPage
    const showDemands = () => { emit('show-password-demands') }

    return { t, p1, p2, errorMsg, success, inputClass, change, AMVLogo, showDemands }
  }
})
</script>