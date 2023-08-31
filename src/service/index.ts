import { Axios, URL } from '@/api/index'

export const get_posts = async () => {
  const dataLoading = { is_loading: true }
  try {
    const posts = await Axios.get(`${URL}/posts`)
    console.log(posts)
  } catch (er) {
    console.log(er)
  } finally {
    dataLoading.is_loading = false
  }
}
