<template>
  <button
    type="button"
    class="btn btn-transparent btn-sm rounded-circle position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center p-0"
    @click="emit('close')"
    aria-label="Close"
  >
    <i class="bi bi-x-circle text-white fs-4"></i>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<style scoped>
.btn-transparent:hover i {
  opacity: 0.8;
  transform: scale(1.1);
  transition: all 0.2s ease;
}
</style>
