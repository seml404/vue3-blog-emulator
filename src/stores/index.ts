import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Blog } from '@/types'

export const useBlogStore = defineStore('blog', () => {
  const loading = ref<Boolean>(false)
  const posts = ref<Blog.Post[]>([])
  const paginate_number = ref<number>(0)
  const setLoading = (value: boolean) => {
    loading.value = value
  }
  const setPosts = (data: Blog.Post[]) => {
    if (data.length) {
      posts.value = [...posts.value, ...data]
      paginate_number.value += 10
    }
  }

  const addPost = (post: Blog.Post) => {
    posts.value.push(post)
    paginate_number.value += 10
  }

  const deletePost = (id: number) => {
    posts.value = posts.value.filter((el: Blog.Post) => el.id !== id)
  }

  const isLoading = computed(() => loading)

  const postsList = computed(() => posts)

  return { isLoading, posts, setLoading, setPosts, addPost, deletePost, postsList, paginate_number }
})
