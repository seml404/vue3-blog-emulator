import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  post_item,
  modal_window,
  btn_main,
  input_main,
  posts_list,
  create_post,
  nav_bar,
  spinner_main
} from '@/components'
import { app_layout, clean_layout, default_layout } from './layouts'
import '@/scss/main.scss'
import 'bulma/css/bulma.css'

import App from './App.vue'
import router from './router/'

const app = createApp(App)

// #TODO - factory

app
  .use(createPinia())
  .component('post-item', post_item)
  .component('modal-window', modal_window)
  .component('btn-main', btn_main)
  .component('input-main', input_main)
  .component('posts-list', posts_list)
  .component('create-post', create_post)
  .component('nav-bar', nav_bar)
  .component('spinner-main', spinner_main)
  .component('app-layout', app_layout)
  .component('default-layout', default_layout)
  .component('clean-layout', clean_layout)
  .use(router)
  .mount('#app')
