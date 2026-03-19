<template>
  <a href="#"
    @click.prevent="emitClick"
    class="d-inline-flex align-items-center gap-2 text-decoration-none fw-medium text-primary">
    <i class="bi bi-arrow-left"></i>
    <span>{{ displayLabel }}</span>
  </a>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{ label?: string }>();
  const displayLabel = computed(() => props.label ?? 'back'); // Rename this
  const emit = defineEmits<{ (event: 'click'): void }>()

  function emitClick() {
    emit('click')
  }
</script>
