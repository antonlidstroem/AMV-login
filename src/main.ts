import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'flag-icons/css/flag-icons.min.css'
import './assets/styles.css'
import { router } from './router'

async function prepareApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mock/browser')
    return worker.start()
  }
}

prepareApp()
  .catch((err) => {
    // MSW failed to register — log the error but don't block app startup.
    // The app still works; API calls will hit the real network instead of mocks.
    console.warn('[MSW] Service worker failed to start, continuing without mocks:', err)
  })
  .then(() => {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
})
