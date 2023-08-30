// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { blog_item } from '@/components'

import App from './App.vue'
// import router from './router'

const app = createApp(App)

app.use(createPinia()).component('blog-item', blog_item).mount('#app')
// app.use(router)
