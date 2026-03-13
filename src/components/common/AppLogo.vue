<template>
  <div class="logo-container">
    <img :src="AMVLogo" alt="Logo" class="logo-top" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AMVLogo from '../../assets/logo_horizontal.svg'

export default defineComponent({
  name: 'AppLogo',
  setup() {
    return { AMVLogo }
  }
})
</script>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.logo-top {
  width: 260px; /* Desktop-storlek */
  max-width: 100%;
  display: block;
  margin: 15px auto 28px auto;
  transition: width 0.3s ease; /* Mjuk övergång vid storleksändring */
}

/* Responsivitet för mobilvy */
@media (max-width: 768px) {
  .logo-top {
    width: 180px; /* Mindre storlek på mobil */
    margin: 10px auto 20px auto;
  }
}
</style>