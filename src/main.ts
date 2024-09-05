import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import gsapPlugin from './plugins/gsapPlugin'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(gsapPlugin)
app.mount('#app')
