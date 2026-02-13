<template>
<div>

  <h2>{{ t('resetPassword') }}</h2>
  <p>{{ t('resetPasswordDescription') }}</p>

  <div v-if="error" class="error-banner">
    Ange en giltig e-postadress
  </div>

  <input
    v-model="email"
    class="form-control mb-3"
    :class="{ 'error-border': error }"
  />

  <button class="btn btn-primary w-100" @click="send">
    Skicka
  </button>

  <Popup
    v-if="success"
    title="✔"
    text="Ett nytt mail har skickats till den adress du angav."
    button="Okej, stäng fönster"
    @close="success=false"
  />

  <div class="back-link mt-3">
    <a href="#" @click.prevent="$emit('change-view','login')">
      ← {{ t('back') }}
    </a>
  </div>

</div>
</template>


<script>
import { useI18n } from '../../i18n/useI18n'
import Popup from '../common/Popup.vue'

export default {
  name:'ForgotPassword',
  components:{ Popup },

  data(){
    return{
      email:'',
      error:false,
      success:false
    }
  },

  methods:{
    send(){
      if(!this.email.includes('@')){
        this.error=true
      }else{
        this.error=false
        this.success=true
      }
    }
  },

  setup(){
    const { t } = useI18n()
    return { t }
  }
}
</script>

