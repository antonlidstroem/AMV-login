<template>
  <a
    href="https://www.bankid.com/privat/om-bankid"
    target="_blank"
    rel="noopener noreferrer"
    class="bankid-link"
  >
    {{ props.label ?? 'Om Mobilt BankID' }}
  </a>
</template>

<script lang="ts" setup>
const props = defineProps<{ label?: string }>()
</script>