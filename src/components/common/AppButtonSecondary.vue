<template>
  <button
    :type="buttonType"
    class="btn btn-secondary-custom"
    @click="emit('action')"
  >
    <i v-if="icon" :class="[icon, 'me-2 fs-6']"></i>
    {{ label }}
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  icon?: string
  buttonType?: 'button' | 'submit' | 'reset'
}>(), {
  icon: '',
  buttonType: 'button',
})

const emit = defineEmits<{ (e: 'action'): void }>()
</script>
