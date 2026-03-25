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



/* Mycket säkrare selector som träffar ikonerna inuti din wrapper */
.step-icon-wrapper i {
  font-size: 1.8rem; /* Justera denna för önskad storlek (t.ex. 40px) */
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* Färg för det aktiva steget (Grön) */
.active-step {
  color: var(--success); /* Använder din globala gröna färg */
}

/* Färg för inaktiva steg (Grå) */
.inactive-step {
  color: #ADB2A3;
}

/* Stil för pilen */
.step-arrow {
  color: #ADB2A3;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
}
</style>