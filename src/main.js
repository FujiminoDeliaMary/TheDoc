import './assets/style/tailwind.css'
import './assets/style/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

createApp(App).use(router).mount('#app')

