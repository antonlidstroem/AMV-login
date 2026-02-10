<template>
  <div class="bankid-device">

    <h2>Logga in med BankID</h2>
    <p>Skriv in din säkerhetskod i BankID-appen.</p>

    <div class="waiting-box">
      <div class="spinner"></div>
      <p>Väntar på BankID...</p>
    </div>

    <div class="links">

      <a href="#" @click.prevent="$emit('change-view','login')">
        ✕ Avbryt
      </a>

      <a href="#" @click.prevent="$emit('change-view','login')">
        ← Tillbaka
      </a>

      <a
        href="https://www.bankid.com/privat/om-bankid"
        target="_blank"
        rel="noopener noreferrer"
      >
        Om BankID
      </a>


    </div>

    <div class="divider"><span>Eller</span></div>

    <button @click="$emit('change-view','mobilebankid')">
      📱 Mobilt BankID
    </button>

  </div>
</template>

<script>
export default {
  emits:['change-view','about-bankid']
}
</script>
