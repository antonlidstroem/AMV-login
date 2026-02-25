<template>
  <div class="page-wrapper min-vh-100 d-md-flex justify-content-md-center align-items-md-center">
    
    <div class="main-container d-flex flex-column flex-md-row shadow rounded-5 w-100 overflow-hidden p-0"
         style="max-width:1120px; width:100%;">
      <!-- Desktop LPage -->
      <div class="col-12 col-md-6 d-flex p-0">
        <LPage
          class="d-none d-md-flex flex-fill"
          :currentView="currentView"
          @change-view="currentView = $event"
        />
      </div>

      <!-- Right Page -->
      <div class="col-12 col-md-6 d-flex p-0">
        <RPage
          class="flex-fill d-flex flex-column"
          :currentView="currentView"
          @change-view="currentView = $event"
        >
          <!-- Mobil-LPage ligger inuti RPage -->
          <template #mobile-left>
            <div class="d-block d-md-none w-100 d-flex justify-content-center align-items-start py-3 px-2">
              <LPage
                class="w-100 h-100"
                style="max-width: 460px; max-height: 90vh; border-radius: 20px; overflow: hidden;"
                :currentView="currentView"
                @change-view="currentView = $event"
              />
            </div>
          </template>
        </RPage>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LPage from './components/LPage.vue'
import RPage from './components/RPage.vue'
import type { ViewType } from './types/views'

const currentView = ref<ViewType>('login')

export default defineComponent({
  name: 'App',
  components: { LPage, RPage },
  setup() {



    return {
      currentView
    }
  }
})
</script>