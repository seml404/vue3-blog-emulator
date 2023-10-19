import { onMounted, ref } from 'vue'
import { useBlogStore } from '@/stores'

const store = useBlogStore()

export const fetchPosts = async () => {
  const { setIsIntersected } = store
  const posts = ref(store.postsList)
  const isIntersected = ref(store.isIntersected)

  onMounted(() => {
    if (!posts.value.length) store.getPosts()
  })

  const requestForPosts = async () => {
    setIsIntersected(false)
    store.getPosts()
  }
  return { posts, requestForPosts }
}
