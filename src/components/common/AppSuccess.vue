<template>
  <div class="success-checkmark">
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle 
        class="circle" cx="40" cy="40" r="35" fill="none" 
        :stroke="successColor" stroke-width="7" 
      />
      <path 
        class="check" d="M23 41l11 11 23-23" fill="none" 
        :stroke="successColor" stroke-width="7" 
        stroke-linecap="round" stroke-linejoin="round" 
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ color?: string }>()
const successColor = computed(() => props.color || 'var(--success)')
</script>

<style scoped>
.success-checkmark {
  width: 80px;
  height: 80px;
  display: inline-block;
}

.circle {
  stroke-dasharray: 220;
  stroke-dashoffset: 220;
  animation: draw-circle 0.6s ease-out forwards;
}

.check {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: draw-check 0.4s 0.5s ease-out forwards;
}

@keyframes draw-circle {
  to { stroke-dashoffset: 0; }
}

@keyframes draw-check {
  to { stroke-dashoffset: 0; }
}
</style>