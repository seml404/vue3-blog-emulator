// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { blog_item, modal_window, btn_main, input_main } from '@/components'

import App from './App.vue'
// import router from './router'

const app = createApp(App)

app
  .use(createPinia())
  .component('blog-item', blog_item)
  .component('modal-window', modal_window)
  .component('btn-main', btn_main)
  .component('input-main', input_main)
  .mount('#app')
// app.use(router)
