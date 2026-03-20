<template>
  <button type="button" class="btn btn-secondary-custom" @click="emit('close')">
    <i class="bi bi-x-circle-fill me-2 fs-6"></i> {{ t('closeWindow') }}
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits<{ (e: 'close'): void }>()
</script>
