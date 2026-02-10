<template>
  <div class="mobile-bankid">

    <h2>Logga in med Mobilt BankID</h2>
    <p>Skanna QR-koden med BankID-appen på din mobil.</p>

    <div class="qr-wrapper">
      <div class="fake-qr"></div>
    </div>

    <div class="links">
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

    <button @click="$emit('change-view','bankiddevice')">
      💻 BankID på denna enhet
    </button>

  </div>
</template>

<script>
export default {
  emits:['change-view','about-bankid']
}
</script>
