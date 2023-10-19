import { onMounted, ref, watch, type Ref } from 'vue'
import { useBlogStore } from '@/stores'
import type { Blog } from '@/types/index'

const store = useBlogStore()

const { addPost, deletePost, noMorePosts, setLoading, setNoPosts } = store

export const useAmendPosts = () => {
  const showModal = ref(false)
  const showNoPosts = ref(false)

  const handleSubmitNewBlog = (post: Blog.Post) => {
    addPost(post)
    showModal.value = false
  }
  const handleDeletePost = (id: number) => deletePost(id)

  const closeShowNoPosts = () => {
    showNoPosts.value = false
    setNoPosts(false)
  }

  watch(noMorePosts, () => {
    if (noMorePosts.value) {
      setTimeout(() => {
        setLoading(false)
        showNoPosts.value = true
      }, 500)
    }
  })

  return { handleSubmitNewBlog, handleDeletePost, closeShowNoPosts }
}
