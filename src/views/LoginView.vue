<template>
  <div
    class="main-container d-flex flex-column flex-md-row shadow rounded-5 w-100 p-0"
    style="max-width: 1120px; width: 100%;"
  >
    <AuthLayoutLeft class="d-none d-md-flex flex-fill" />

    <div class="col-12 col-md-6 d-flex p-0">
      <AuthLayoutRight class="flex-fill d-flex flex-column">
        <template #mobile-left>
          <div class="d-flex d-md-none w-100 justify-content-center align-items-start py-0 px-2">
            <AuthLayoutLeft class="w-100" style="max-width: 460px; width: 100%;" />
          </div>
        </template>
      </AuthLayoutRight>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthLayoutLeft from '../components/AuthLayoutLeft.vue'
import AuthLayoutRight from '../components/AuthLayoutRight.vue'
</script>

<style scoped>

@media (min-width: 768px) {
  .main-container {
    height: 800px;
    min-height: 720px;
    max-height: 800px;
    overflow: hidden;
  }
}
</style>
