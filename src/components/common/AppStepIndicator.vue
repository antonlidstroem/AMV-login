<template>
  <div class="d-flex w-100 justify-content-center align-items-center gap-2 mb-3">
    <svg :width="svgWidth" height="25" :viewBox="`0 0 ${svgWidth} 25`" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle 
        v-for="step in totalSteps" 
        :key="step"
        :cx="calculateCx(step)" 
        cy="12.1296" 
        r="12.1296" 
        :fill="step === activeStep ? '#7B9B3F' : '#ADB2A3'" 
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  totalSteps: number; // Kan vara 2, 3 eller fler
  activeStep: number;
}>();

const radius = 12.1296;
const gap = 41.25; // Avståndet mellan cirklarnas kanter

// Vi räknar ut den totala bredden dynamiskt för att hålla cirklarna centrerade
const svgWidth = computed(() => {
  return (props.totalSteps * (radius * 2)) + ((props.totalSteps - 1) * gap);
});

// Funktion för att placera varje cirkel på rätt X-koordinat
const calculateCx = (step: number) => {
  const index = step - 1;
  return radius + (index * (radius * 2 + gap));
};
</script>