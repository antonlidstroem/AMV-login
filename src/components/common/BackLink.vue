<template>
  <a
    href="#"
    @click.prevent="emitClick"
    class="d-inline-flex align-items-center gap-2 text-decoration-none fw-medium text-primary"
  >
    <span class="arrow">←</span>
    <span>{{ label }}</span>
  </a>
</template>

<script lang="ts" setup>
const props = defineProps<{ label?: string }>()
const label = props.label ?? 'back'

const emit = defineEmits<{ (event: 'click'): void }>()

function emitClick() {
  emit('click')
}
</script>