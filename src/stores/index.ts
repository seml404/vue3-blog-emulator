import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Blog } from '@/types'
import type { ComputedRef } from 'vue'
import { PostsService } from '@/service/'

export const posts_service = new PostsService()

export const useBlogStore = defineStore('blog', () => {
  const loading = ref<Boolean>(false)
  const hasNoMorePosts = ref<Boolean>(false)
  const posts = ref<Blog.Post[]>([])
  const searchValue = ref<string>('')
  const paginate_number = ref<number>(0)
  const _isIntersected = ref<boolean>(false)
  const setLoading = (value: boolean) => {
    loading.value = value
  }
  const setPosts = (data: Blog.Post[]) => {
    if (data.length) {
      posts.value = [...posts.value, ...data]
      paginate_number.value += 5
      setNoPosts(false)
    } else {
      setNoPosts(true)
    }
  }

  const getPosts = async () => {
    setLoading(true)
    try {
      const { data, status } = await posts_service.get_posts(paginate_number.value)
      setPosts(data)
      return status
    } catch (er) {
      console.log(er)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
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

  const setNoPosts = (value: boolean) => {
    hasNoMorePosts.value = value
  }

  const isLoading = computed<Ref<Boolean>>(() => loading)

  const noMorePosts = computed<Ref<Boolean>>(() => hasNoMorePosts)

  const postsListSearched = computed(() =>
    posts.value.filter((el) => el.body.includes(searchValue.value))
  )
  // const postsListSorted = computed<Ref<Blog.Post[]>>(() => postsListSearched)
  const postsList = computed(() => postsListSearched)

  const searchedValue = computed(() => searchValue)

  const isIntersected = computed(() => _isIntersected)
  const setIsIntersected = (value: boolean) => {
    _isIntersected.value = value
  }

  return {
    getPosts,
    loading,
    isLoading,
    posts,
    setLoading,
    setPosts,
    addPost,
    deletePost,
    postsList,
    paginate_number,
    setSearchValue,
    noMorePosts,
    setNoPosts,
    searchedValue,
    isIntersected,
    setIsIntersected
  }
})
