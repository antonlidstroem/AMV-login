import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'

async function prepareApp() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mock/browser')
    return worker.start()
  }
}

prepareApp().then(() => {
  createApp(App).mount('#app')
})