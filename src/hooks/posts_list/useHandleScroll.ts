import { onMounted, ref, watch, type Ref } from 'vue'
import { useBlogStore } from '@/stores'
const store = useBlogStore()

const { setIsIntersected, isIntersected, searchValue } = store

export const useHandleScroll = (requestForPosts: () => {}, bottom: Ref) => {
  const scrolledDown = ref<boolean>(false)
  const scrolledValue = ref<number>(0)

  const handleIntersect = () => {
    if (scrolledValue.value) setIsIntersected(true)
  }

  watch(bottom, () => {
    if (bottom.value && !searchValue.value) {
      const observer = new IntersectionObserver((data: IntersectionObserverEntry[]) => {
        data[0].isIntersecting ? handleIntersect() : null
      })
      observer.observe(bottom.value)
    }
  })
  const handleScroll = (e: Event) => {
    scrolledValue.value < document.body.scrollTop
      ? (scrolledDown.value = true)
      : (scrolledDown.value = false)
    if (!scrolledDown.value) setIsIntersected(false)
    if (scrolledDown.value && isIntersected.value === true) requestForPosts()
    scrolledValue.value = document.body.scrollTop
  }

  onMounted(() => {
    document.body.addEventListener('scroll', (e: Event) => handleScroll(e))
  })

  return { scrolledDown, scrolledValue, handleScroll, handleIntersect }
}
