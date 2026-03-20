import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { i18n } from './modules/i18n/index'
import { router } from './modules/router'

// CSS-importer
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'flag-icons/css/flag-icons.min.css'
import './assets/global.css'

/**
 * Funktion för att förbereda appen (MSW i DEV-läge)
 */
async function prepareApp() {
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import('./modules/mock/browser')
      return await worker.start({
        serviceWorker: { url: '/mockServiceWorker.js' },
        onUnhandledRequest: 'bypass',
      })
    } catch (err) {
      console.error('[MSW] Kunde inte starta mock-tjänsten:', err)
    }
  }
  return Promise.resolve()
}

// Starta appen
prepareApp().then(() => {
  const app = createApp(App)

  app.use(createPinia())
  app.use(i18n)
  app.use(router)

  app.mount('#app')

  console.log(`%c Appen startad i ${import.meta.env.MODE}-läge `, 'background: #222; color: #bada55; padding: 2px 5px;')
})
