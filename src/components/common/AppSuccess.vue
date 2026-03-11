<template>
  <div class="success-checkmark">
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle class="circle" cx="40" cy="40" r="36" fill="none" stroke="var(--success)" stroke-width="4" />
      <path class="check" d="M23 41l11 11 23-23" fill="none" stroke="var(--success)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>
</template>

<style scoped>
.success-checkmark {
  width: 80px;
  height: 80px;
  display: inline-block;
}

.circle {
  stroke-dasharray: 230;
  stroke-dashoffset: 230;
  animation: draw-circle 0.6s ease-out forwards;
}

.check {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: draw-check 0.4s 0.5s ease-out forwards; /* Startar efter cirkeln */
}

@keyframes draw-circle {
  to { stroke-dashoffset: 0; }
}

@keyframes draw-check {
  to { stroke-dashoffset: 0; }
}
</style>