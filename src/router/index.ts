import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import { Blog } from '@/types'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: Blog.Path.HOME,
      component: HomeView
    },
    // {
    //   path: '/posts',
    //   name: Blog.Path.POSTS,
    //   component: () => import('../views/Posts_legacy.vue')
    // },
    {
      path: '/posts',
      name: Blog.Path.POSTS,
      component: () => import('../views/PostsComposition.vue')
    },
    {
      path: '/posts/:id',
      name: Blog.Path.POST_DETAILS,
      component: () => import('../views/PostDetails.vue')
    }
  ]
})

export default router
