<template>
  <button type="button" class="btn btn-secondary-custom" @click="$emit('close')">
    <i class="bi bi-x-circle-fill me-2 fs-6"></i> {{ t('closeWindow') }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from '../../i18n/useI18n'

export default defineComponent({
  name: 'CloseButton',
  emits: ['close'],
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
