<template>
  <a
    href="#"
    @click.prevent="emit('click')"
    class="d-inline-flex align-items-center gap-2 text-decoration-none fw-medium text-primary"
  >
    <i class="bi bi-arrow-left"></i>
    <span>{{ displayLabel }}</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * Both 'label' and 'text' are accepted for backwards compatibility.
 * 'label' takes precedence; 'text' is the legacy alias.
 * If neither is provided, the i18n 'back' key is used as the default.
 */
const props = defineProps<{
  label?: string
  text?: string
}>()

const emit = defineEmits<{ (event: 'click'): void }>()

const { t } = useI18n()
const displayLabel = computed(() => props.label ?? props.text ?? t('back'))
</script>
