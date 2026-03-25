<template>
  <button
    :type="buttonType"
    class="btn-secondary-custom" 
    @click="$emit('action')"
  >
    <i v-if="icon" :class="[icon, label ? 'me-2' : '']" class="fs-6"></i>
    <span class="text-white" v-if="label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  icon?: string
  buttonType?: 'button' | 'submit' | 'reset'
}>(), {
  label: '',
  icon: '',
  buttonType: 'button',
})

defineEmits<{ (e: 'action'): void }>()
</script>

<style scoped>
/* Flytta gärna in den specifika stilen här om du vill ha den "scoped", 
  men för att dina globala klasser ska fungera behåller vi dem som de är.
*/
</style>