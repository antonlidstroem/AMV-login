<template>
  <div class="vpage">

    <LoginForm
      v-if="currentView === 'login'"
      @change-view="$emit('change-view',$event)"
    />

    <ForgotPassword
      v-if="currentView === 'forgot'"
      @change-view="$emit('change-view',$event)"
    />

  </div>
</template>

<script>
import LoginForm from './LeftViews/LoginForm.vue'
import ForgotPassword from './LeftViews/ForgotPassword.vue'

export default {
  props:['currentView'],
  components:{ LoginForm, ForgotPassword }
}
</script>



<style scoped>
.vpage {
  width: 50%;
  padding: 20px;
  background-color: #f0f0f0;
}
</style>
