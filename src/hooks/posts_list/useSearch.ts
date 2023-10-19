import { watch, type Ref, ref, onMounted } from 'vue'
import { useBlogStore } from '@/stores'
const store = useBlogStore()
const { searchValue, setSearchValue } = store

export const useSearch = (requestForPosts: () => {}) => {
  const search = ref<string>('')
  watch(searchValue, () => {
    if (!search.value) setSearchValue('')
  })
  const searchPost = () => {
    setSearchValue(search.value)
  }

  return { searchPost, search }
}
