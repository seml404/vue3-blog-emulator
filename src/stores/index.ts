import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Blog } from '@/types'

export const useBlogStore = defineStore('blog', () => {
  const isLoading = ref<Boolean>(false)
  const posts = ref<Blog.Post[]>([])
  const setLoading = (value: boolean) => {
    isLoading.value = value
  }
  const setPosts = (data: Blog.Post[]) => {
    posts.value = data
  }

  const postsList = computed(() => posts)

  return { isLoading, posts, setLoading, setPosts, postsList }
})
