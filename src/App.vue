<template>
  <div class="container-fluid vh-100 d-flex">
    <LPage
      :currentView="currentView"
      @change-view="currentView = $event"
    />

    <RPage />
  </div>
</template>


<script>
import LPage from './components/LPage.vue';
import RPage from './components/RPage.vue';

export default {
  components: { LPage, RPage },
  data() {
    return {
      currentView: 'login'
    };
  }
};
</script>
