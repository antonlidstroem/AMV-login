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
    // Texten som ska stå på knappen
    label: {
      type: String,
      required: true
    },
    // Bootstrap-ikon klass, t.ex. "bi-x-circle-fill"
    icon: {
      type: String,
      default: ''
    },
    // HTML-typ på knappen (button, submit, etc)
    buttonType: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button'
    }
  },
  emits: ['action'],
  setup() {
    return {}
  }
})
</script>