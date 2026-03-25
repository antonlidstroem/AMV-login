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


async function prepareApp() {
  const useMocks = import.meta.env.VITE_USE_MSW === 'true'

  if (useMocks) {
    try {
      const { worker } = await import('./modules/mock/browser')
      
      return await worker.start({
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
        onUnhandledRequest(req, print) {
          const url = new URL(req.url)

          // 1. Om anropet INTE går till /api, ignorera det helt (bypass).
          // Detta gör att MSW inte ens försöker "titta" på din index-sida eller assets.
          if (!url.pathname.startsWith('/api/')) {
            return 
          }

          // 2. Om det är ett /api/-anrop som du har GLÖMT att skriva en handler för, varna.
          print.warning()
        },
      })
    } catch (err) {
      console.error('[MSW] Kunde inte starta:', err)
    }
  }
  
  // Om useMocks är false (dvs vi vill köra mot backend), 
  // så gör vi ingenting och låter appen fortsätta.
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
