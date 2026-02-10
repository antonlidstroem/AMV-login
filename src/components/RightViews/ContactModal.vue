<template>
  <div class="contact-panel">
    <!-- Stäng-cirkel -->
    <button class="close-circle" @click="close">×</button>

    <!-- Kontaktinfo -->
    <h2>{{ t('contact') }}</h2>
    <p>
      {{ t('contactLoginInfo') }}
    </p>

    <div class="contact-person">
      <p><strong>Emanuel Makhoul</strong></p>
      <p>emanuel@arbetsmiljoverktyget.se</p>
      <p>+4670 112</p>
    </div>

    <p>{{ t('contactOtherInfo') }}</p>

    <!-- Kontaktformulär -->
    <form @submit.prevent="sendContact">
      <div class="form-group">
        <label>{{ t('name') }}</label>
        <input v-model="name" type="text" required />
      </div>

      <div class="form-group">
        <label>{{ t('email') }}</label>
        <input v-model="email" type="email" required />
      </div>

      <div class="form-group">
        <label>{{ t('message') }}</label>
        <textarea v-model="message" rows="4" required></textarea>
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn-submit">{{ t('sendMessage') }}</button>
        <button type="button" class="btn-close" @click="close">{{ t('closeWindow') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from '../../i18n/useI18n'

export default {
  emits: ['close'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const name = ref('')
    const email = ref('')
    const message = ref('')

    function sendContact() {
      alert(`${t('sendMessage')}:\n${name.value}, ${email.value}\n${message.value}`)
      name.value = ''
      email.value = ''
      message.value = ''
      emit('close')
    }

    function close() {
      emit('close')
    }

    return {
      t,
      name,
      email,
      message,
      sendContact,
      close
    }
  }
}
</script>

