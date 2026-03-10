import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'
import { router } from './router'

async function prepareApp() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mock/browser')
    return worker.start()
  }
}

prepareApp().then(() => {
  const app = createApp(App)
  app.use(router) // DU MÅSTE LÄGGA TILL DENNA RAD
  app.mount('#app')
})