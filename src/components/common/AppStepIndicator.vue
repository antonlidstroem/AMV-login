<template>
  <div class="d-flex w-100 justify-content-center align-items-center mb-3 step-indicator-container">
    <template v-for="step in totalSteps" :key="step">
      
      <div class="step-icon-wrapper">
        <i :class="[
          'bi', 
          `bi-${step}-circle-fill`, 
          step === activeStep ? 'active-step' : 'inactive-step'
        ]"></i>
      </div>

      <div v-if="step < totalSteps" class="step-arrow mx-2">
        <i class="bi bi-arrow-right"></i>
      </div>

    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  totalSteps: number;
  activeStep: number;
}>();
</script>
<style scoped>



.step-icon-wrapper i {
  font-size: 1.8rem; 
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.active-step {
  color: var(--success); 
}

.inactive-step {
  color: #ADB2A3;
}

.step-arrow {
  color: #ADB2A3;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
}
</style>