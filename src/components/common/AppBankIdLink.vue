<template>
  <a
  
    href="https://www.bankid.com/privat/om-bankid"
    target="_blank"
    rel="noopener noreferrer"
    class="d-inline-flex align-items-center gap-2 text-decoration-none fw-medium text-primary"
  
  >
    {{ props.label ?? 'Om Mobilt BankID' }}
  </a>
</template>

<script lang="ts" setup>
const props = defineProps<{ label?: string }>()
</script>
