<template>
  <a
    href="#"
    @click.prevent="emitClick"
    class="d-inline-flex align-items-center gap-2 text-decoration-none fw-medium text-primary"
  >
    <i class="bi bi-arrow-left"></i>
    <span>{{ label }}</span>
  </a>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{ label?: string }>()

// Must be computed so it stays reactive when the prop changes.
// Using a plain `const label = props.label ?? 'back'` reads the value
// once at setup time and never updates — that is a bug.
const label = computed(() => props.label ?? 'back')

const emit = defineEmits<{ (event: 'click'): void }>()

function emitClick() {
  emit('click')
}
</script>
