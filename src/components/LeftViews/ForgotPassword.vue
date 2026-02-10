<template>
  <div class="forgot-password-page">

    <h2>Återställ lösenord</h2>

    <p>
      Ange din e-postadress så skickar vi instruktioner
      för att återställa ditt lösenord.
    </p>

    <form @submit.prevent="$emit('reset')">
      <div class="form-group">
        <label>E-post</label>
        <input type="email" required />
      </div>

      <button class="btn-login">Skicka återställning</button>
    </form>

    <div class="back-link">
      <a href="#" @click.prevent="$emit('change-view','login')">
        ← Tillbaka
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ForgotPassword'
}
</script>
