<template>
<div class="contact-panel position-relative rounded-4 text-white p-4 border border-white"
     style="background-color: rgba(33, 33, 33, 0.70);
            width: 90%;
            max-width: 900px;
            height: 85%;        /* istället för fixed 80% */
            max-height: 90vh;    /* max 90% av viewport */
            margin: auto;
            display: flex;
            flex-direction: column;">

              
    <!-- Stäng-knapp med vit ikon och transparent knapp -->
    <button 
      class="btn btn-transparent btn-sm rounded-circle position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center p-0"
      @click="close"
    >
      <i class="bi bi-x-circle text-white fs-4"></i>
    </button>

    <!-- Rubrik -->
    <h2 class="text-white mb-4">{{ t('contact') }}</h2>

    <label class="form-label mb-0 text-white mb-3">{{ t('contactLoginInfo') }}</label>



    <!-- Kontaktinfo -->
<div class="contact-person rounded-3 p-3 mb-4 flex-shrink-0 border border-white"
     style="background-color: rgba(20,20,20,0.55);">
  <p class="mb-2" style="color: #ffffff !important;">
    <i class="bi bi-person-fill me-2" style="color: #ffffff !important;"></i>
    <strong style="color: #ffffff !important;">Emanuel Makhoul</strong>
  </p>
  <p class="mb-2" style="color: #ffffff !important;">
    <i class="bi bi-envelope me-2" style="color: #ffffff !important;"></i>
    emanuel@arbetsmiljoverktyget.se
  </p>
  <p class="mb-0" style="color: #ffffff !important;">
    <i class="bi bi-telephone me-2" style="color: #ffffff !important;"></i>
    +4670 112
  </p>
</div>

<label class="form-label mb-0 text-white mb-3">{{ t('contactOtherInfo') }}</label>


    <!-- Formulär -->
    <form @submit.prevent="sendContact" class="d-flex flex-column gap-2">

<!-- Name -->
<label class="form-label mb-0 text-white">{{ t('name') }}</label>
<div class="position-relative">
  <i class="bi bi-person-vcard position-absolute text-white" 
     style="left: 12px; top: 50%; transform: translateY(-50%); font-size: 1.2rem; opacity: 0.6;"></i>
  <input 
    v-model="name" 
    type="text" 
    class="form-control ps-5 bg-transparent text-white border-white rounded-3" 
    required 
  />
</div>

<!-- Email -->
<label class="form-label mb-0 text-white">{{ t('email') }}</label>
<div class="position-relative">
  <i class="bi bi-envelope position-absolute text-white" 
     style="left: 12px; top: 50%; transform: translateY(-50%); font-size: 1.2rem; opacity: 0.6;"></i>
  <input 
    v-model="email" 
    type="email"  
    class="form-control ps-5 bg-transparent text-white border-white rounded-3" 
    required 
  />
</div>

<!-- Message -->
<div class="position-relative">
  <i class="bi bi-pencil-square position-absolute text-white" 
     style="left: 12px; top: 12px; font-size: 1.2rem; opacity: 0.6;"></i>
  <textarea 
    v-model="message" 
    rows="4" 
    :placeholder="t('yourMessage')"
    class="form-control ps-5 pt-2 bg-transparent text-white border-white rounded-3" 
    required
  ></textarea>
</div>



      <!-- Skicka-knapp -->
      <button type="submit" class="btn-custom border border-white">
        {{ t('sendMessage') }}
      </button>

      <!-- Stäng-knapp (inte full bredd) -->
      <button type="button" class="btn-secondary-custom" @click="close">
        <i class="bi bi-x-circle-fill text-white fs-5"></i>
        {{ t('closeWindow') }}
      </button>

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

