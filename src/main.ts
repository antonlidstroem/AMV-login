import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'flag-icons/css/flag-icons.min.css'
import './assets/global.css'
import { router } from './router'

async function prepareApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mock/browser')
    
    // Notera måsvingarna runt hela objektet här:
    return worker.start({
      serviceWorker: {
        // I en standard Vue/Vite-setup ligger filen på roten i "public"
        url: '/mockServiceWorker.js' 
      },
      onUnhandledRequest: 'bypass',
    })
  }
}

prepareApp()
  .catch((err) => {
    console.warn('[MSW] Service worker failed, continuing without mocks:', err)
  })
  .finally(() => {          // ← replaces .then()
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.mount('#app')
  })