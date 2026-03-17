import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { i18n } from './modules/i18n/index'
import { router } from './modules/router'

// CSS-importer
import 'bootstrap/dist/css/bootstrap.min.css'
import 'flag-icons/css/flag-icons.min.css'
import './assets/global.css'

/**
 * Funktion för att förbereda appen (MSW i DEV-läge)
 */
async function prepareApp() {
  // Vi kör bara detta om vi är i utvecklingsläge
  if (import.meta.env.DEV) {
    try {
      // Dynamisk import gör att MSW-koden inte ens inkluderas i din "build" för produktion
      const { worker } = await import('./modules/mock/browser')
      
      return await worker.start({
        serviceWorker: {
          url: '/mockServiceWorker.js' 
        },
        // 'bypass' gör att anrop till bilder, fonter och i18n-filer inte loggas som fel i konsolen
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
  
  console.log(`%c Appen startad i ${import.meta.env.MODE}-läge `, 'background: #222; color: #bada55; padding: 2px 5px;');
})