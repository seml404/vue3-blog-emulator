import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Blog } from '@/types'

export const useBlogStore = defineStore('blog', () => {
  const isLoading = ref<Boolean>(false)
  const posts = ref<Blog.Post[]>([])
  const paginate_number = ref<number>(0)
  const setLoading = (value: boolean) => {
    isLoading.value = value
  }
  const setPosts = (data: Blog.Post[]) => {
    if (data.length) {
      posts.value = [...posts.value, ...data]
      paginate_number.value += 10
    }
  }

  const postsList = computed(() => posts)

  return { isLoading, posts, setLoading, setPosts, postsList, paginate_number }
})
