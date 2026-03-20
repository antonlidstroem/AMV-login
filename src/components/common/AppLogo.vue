<template>
  <div class="logo-container">
    <img :src="AMVLogo" alt="Logo" class="logo-top" />
  </div>
</template>

<script setup lang="ts">
import AMVLogo from '../../assets/logo-horizontal.svg'
</script>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.logo-top {
  width: 260px;
  max-width: 100%;
  display: block;
  margin: 15px auto 28px auto;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .logo-top {
    width: 180px;
    margin: 10px auto 20px auto;
  }
}
</style>
