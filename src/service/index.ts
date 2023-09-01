import { Axios } from '@/api/index'
import { URL } from '@/consts'
import { useBlogStore } from '@/stores'

export const get_posts = async (startNum: number) => {
  const store = useBlogStore()
  try {
    store.setLoading(true)
    const posts = await Axios.get(`${URL}/posts/?_start=${startNum}&_limit=10`)
    store.setPosts(posts.data)
    console.log(posts)
  } catch (er) {
    console.log(er)
  } finally {
    store.setLoading(false)
  }
}
