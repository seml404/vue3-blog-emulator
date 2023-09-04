import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Blog } from '@/types'
import type { ComputedRef } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  const loading = ref<Boolean>(false)
  const posts = ref<Blog.Post[]>([])
  const searchValue = ref<string>('')
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
    posts.value.unshift(post)
    paginate_number.value += 10
  }

  const deletePost = (id: number) => {
    posts.value = posts.value.filter((el: Blog.Post) => el.id !== id)
  }

  const setSearchValue = (value: string) => {
    searchValue.value = value
  }

  const isLoading = computed<Ref<Boolean>>(() => loading)

  const postsListSearched = computed(() =>
    posts.value.filter((el) => el.body.includes(searchValue.value))
  )
  // const postsListSorted = computed<Ref<Blog.Post[]>>(() => postsListSearched)
  const postsList = computed(() => postsListSearched)

  return {
    loading,
    isLoading,
    posts,
    setLoading,
    setPosts,
    addPost,
    deletePost,
    postsList,
    paginate_number,
    setSearchValue
  }
})
