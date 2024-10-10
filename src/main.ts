import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import gsapPlugin from './plugins/gsapPlugin'
import { initializeStore } from './store'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(gsapPlugin)

initializeStore()

app.mount('#app')
