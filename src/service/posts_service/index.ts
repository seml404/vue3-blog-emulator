import { Axios } from '@/api/index'
import { URL } from '@/consts'
import { ResponseStatuses } from '@/enums'
import { useBlogStore } from '@/stores'

export class PostsService {
  get_posts = async (startNum: number) => {
    const data = await Axios.get(`${URL}/posts/?_start=${startNum}&_limit=5`)
    return data
  }

  default_post = () => {
    return {
      id: 0,
      body: '',
      title: ''
    }
  }
}
