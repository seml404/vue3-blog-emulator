// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { blog_item, modal_window } from '@/components'

import App from './App.vue'
// import router from './router'

const app = createApp(App)

app
  .use(createPinia())
  .component('blog-item', blog_item)
  .component('modal-window', modal_window)
  .mount('#app')
// app.use(router)
