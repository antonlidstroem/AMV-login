<template>
  <a href="#" @click.prevent="$emit('click')" class="back-link">
    {{ label }}
  </a>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Tillbaka'
    }
  },
  emits: ['click']
}
</script>
