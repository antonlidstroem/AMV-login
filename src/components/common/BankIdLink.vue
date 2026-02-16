<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="bankid-link"
  >
    {{ label }}
  </a>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Om Mobilt BankID'
    },
    url: {
      type: String,
      default: 'https://www.bankid.com/privat/om-bankid'
    }
  }
}
</script>
