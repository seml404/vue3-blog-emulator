import { onMounted } from 'vue'
import { useBlogStore } from '@/stores'

const store = useBlogStore()

const { posts, setIsIntersected, getPosts } = store

export const useFetchPosts = async () => {
  onMounted(() => {
    if (!posts.value.length) getPosts()
  })

  const requestForPosts = async () => {
    setIsIntersected(false)
    getPosts()
  }
  return { requestForPosts }
}
