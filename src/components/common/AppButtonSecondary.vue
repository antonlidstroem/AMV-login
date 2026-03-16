<template>
  <button
    :type="buttonType"
    class="btn btn-secondary-custom"
    @click="$emit('action')"
  >
    <i v-if="icon" :class="[icon, 'me-2 fs-6']"></i>
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'BaseButton',
  props: {
    label: { type: String, required: true },
    icon: { type: String, default: '' },
    buttonType: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button'
    }
  },
  emits: ['action']
})
</script>
