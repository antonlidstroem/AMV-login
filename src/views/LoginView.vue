<template>
  <!--
    LoginView is a thin shell. All navigation state lives in UIStore.
    AuthLayoutLeft reads ui.currentView internally — no prop needed.
    AuthLayoutRight manages its own overlays via UIStore — no props needed.
  -->
  <div
    class="main-container d-flex flex-column flex-md-row shadow rounded-5 w-100 p-0"
    style="max-width: 1120px; width: 100%;"
  >
    <!-- Left panel: auth forms (desktop only — also injected below for mobile) -->
    <AuthLayoutLeft class="d-none d-md-flex flex-fill" />

    <!-- Right panel: overlays + language switcher + mobile slot -->
    <div class="col-12 col-md-6 d-flex p-0">
      <AuthLayoutRight class="flex-fill d-flex flex-column">
        <template #mobile-left>
          <div class="d-flex d-md-none w-100 justify-content-center align-items-start py-3 px-2">
            <AuthLayoutLeft class="w-100" style="max-width: 460px; width: 100%;" />
          </div>
        </template>
      </AuthLayoutRight>
    </div>
  </div>
</template>

<script setup lang="ts">
// LoginView no longer needs local refs, handleViewChange, or auth/router imports.
// All navigation is driven by UIStore (via ui.setView() calls inside child components).
// The App.vue watcher on authStore.isLoggedIn handles the push to /dashboard.
import AuthLayoutLeft from '../components/AuthLayoutLeft.vue'
import AuthLayoutRight from '../components/AuthLayoutRight.vue'
</script>
