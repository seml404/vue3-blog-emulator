import { createApp } from 'vue'
import '@/scss/main.scss'
import 'bulma/css/bulma.css'
import App from './App.vue'
import { factoryMain } from './service/main'

const app = createApp(App)
factoryMain(app)
