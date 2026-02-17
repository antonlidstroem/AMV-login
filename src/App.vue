<template>
  <div class="page-wrapper">
    <div class="main-container">
      <!-- Desktop LPage -->
      <LPage
        class="left-page"
        :currentView="currentView"
        @change-view="currentView = $event"
      />

      <!-- Right Page -->
      <RPage
        :currentView="currentView"
        @change-view="currentView = $event"
      >
        <!-- Mobil-LPage ligger inuti RPage -->
        <template #mobile-left>
          <LPage
            class="mobile-left-page"
            :currentView="currentView"
            @change-view="currentView = $event"
          />
        </template>
      </RPage>
    </div>
  </div>
</template>

<script>
import LPage from './components/LPage.vue'
import RPage from './components/RPage.vue'

export default {
  components: { LPage, RPage },
  data() {
    return {
      currentView: 'login'
    }
  }
}
</script>
