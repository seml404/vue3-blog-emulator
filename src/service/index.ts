import { Axios, URL } from '@/api/index'
import { useBlogStore } from '@/stores'

export const get_posts = async () => {
  const store = useBlogStore()
  try {
    store.setLoading(true)
    const posts = await Axios.get(`${URL}/posts/?_start=0&_limit=10`)
    store.setPosts(posts.data)
    console.log(posts)
  } catch (er) {
    console.log(er)
  } finally {
    store.setLoading(false)
  }
}
