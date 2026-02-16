<template>
  <a href="#" @click.prevent="$emit('click')" class="d-inline-flex align-items-center gap-2 text-decoration-none fw-medium text-primary">
    <span class="arrow">←</span>
    <span>{{ label }}</span>
  </a>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'back'
    }
  },
  emits: ['click']
}
</script>
