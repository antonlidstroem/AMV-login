<template>
  <div class="login-page">
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label>Användarnamn</label>
        <input v-model="username" type="text" placeholder="Ange användarnamn" required />
      </div>

      <div class="form-group">
        <label>Lösenord</label>
        <input v-model="password" type="password" placeholder="Ange lösenord" required />
      </div>

      <button type="submit" class="btn-login">
        Logga in
      </button>

      <div class="forgot-password">
        <span>Glömt lösenord?</span>
        <a href="#" @click.prevent="$emit('change-view','forgot')">Klicka här</a>

      </div>
    </form>

    <div class="divider">
      <span>Eller</span>
    </div>

    <div class="bankid-options">
      <button @click="$emit('changeView','mobilebankid')" class="btn-bankid">
        📱 Mobilt BankID
      </button>

      <button @click="$emit('changeView','bankiddevice')" class="btn-bankid-alt">
        💻 BankID på denna enhet
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['changeView'],

  data() {
    return {
      username: '',
      password: ''
    };
  },

  methods: {
    handleLogin() {
      alert('Login: ' + this.username);
    }
  }
};
</script>
