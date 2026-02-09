<template>
  <div class="container">
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

<style>
.container {
  display: flex;
}
</style>
