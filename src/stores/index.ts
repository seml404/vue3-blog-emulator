import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Blog } from '@/types'
import { PostsService } from '@/service/'

export const posts_service = new PostsService()

export const useBlogStore = defineStore('blog', () => {
  const _loading = ref<Boolean>(false)
  const _noMorePosts = ref<Boolean>(false)
  const _posts = ref<Blog.Post[]>([])
  const _paginateNumber = ref<number>(0)
  const _isIntersected = ref<boolean>(false)
  const _searchValue = ref<string>('')

  const setLoading = (value: boolean) => {
    _loading.value = value
  }
  const setPosts = (data: Blog.Post[]) => {
    if (data.length) {
      _posts.value = [..._posts.value, ...data]
      _paginateNumber.value += 5
      setNoPosts(false)
    } else {
      setNoPosts(true)
    }
  }
  const getPosts = async () => {
    setLoading(true)
    try {
      const { data, status } = await posts_service.get_posts(_paginateNumber.value)
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
    _posts.value.unshift(post)
    _paginateNumber.value += 10
  }
  const deletePost = (id: number) => {
    _posts.value = _posts.value.filter((el: Blog.Post) => el.id !== id)
  }
  const setNoPosts = (value: boolean) => {
    _noMorePosts.value = value
  }
  const setSearchValue = (value: string) => {
    console.log('set search')
    _searchValue.value = value
  }
  const setIsIntersected = (value: boolean) => {
    _isIntersected.value = value
  }

  const isLoading = computed<Ref<Boolean>>(() => _loading)
  const noMorePosts = computed<Ref<Boolean>>(() => _noMorePosts)
  const postsListSearched = computed(() =>
    _posts.value.filter((el) => el.body.includes(_searchValue.value.trim()))
  )
  const isIntersected = computed(() => _isIntersected)
  // const postsListSorted = computed<Ref<Blog.Post[]>>(() => postsListSearched)
  const postsList = computed(() => postsListSearched)
  const searchValue = computed(() => _searchValue)
  const posts = computed(() => _posts)

  return {
    isLoading,
    searchValue,
    isIntersected,
    noMorePosts,
    postsList,
    posts,
    setLoading,
    setPosts,
    addPost,
    deletePost,
    getPosts,
    setSearchValue,
    setNoPosts,
    setIsIntersected
  }
})
