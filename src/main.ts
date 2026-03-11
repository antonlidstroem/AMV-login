import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'
import { router } from './router'

async function prepareApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mock/browser')
    return worker.start()
  }
}

prepareApp()
  .then(() => {
    console.log("Appen förberedd, monterar...");
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.mount('#app')
  })
  .catch((err) => {
    console.error("Hoppsan! Appen dog vid start:", err);
  });
