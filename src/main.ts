// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  post_item,
  modal_window,
  btn_main,
  input_main,
  posts_list,
  create_post
} from '@/components'

import App from './App.vue'
// import router from './router'

const app = createApp(App)

app
  .use(createPinia())
  .component('post-item', post_item)
  .component('modal-window', modal_window)
  .component('btn-main', btn_main)
  .component('input-main', input_main)
  .component('posts-list', posts_list)
  .component('create-post', create_post)
  .mount('#app')
// app.use(router)
