<template>
  <div class="content">
    <div>
      <input-main
        @update:model-value="(val) => (searchValue = val.trim())"
        :custom_placeholder="'Search'"
        :model-value="searchValue"
      ></input-main>
      <btn-main class="is-primary mt-4 mb-4" @click="searchPost" v-if="!searchedValue"
        >Search</btn-main
      >
      <btn-main class="is-primary mt-4 mb-4" @click="() => (searchValue = '')" v-else
        >Clear search</btn-main
      >
    </div>
    <div class="is-flex is-justify-content-center is-align-content-center">
      <p class="is-size-2">List of posts</p>
    </div>
    <btn-main @click="showModal = true">Create new post</btn-main>

    <Transition name="posts-fade">
      <div v-if="posts.length">
        <posts-list :posts="posts" @deletePost="handleDeletePost"></posts-list>
        <div ref="bottom" class="card has-text-centered">End of list</div>
      </div>
      <div v-else>No posts yet</div>
    </Transition>
    <Transition name="modal-fade">
      <modal-window :showItem="showModal" @closeModal="showModal = false"
        ><create-post @submitNewBlog="handleSubmitNewBlog"></create-post>
      </modal-window>
    </Transition>
    <spinner-main :showItem="isLoading"></spinner-main>
    <Transition name="modal-fade">
      <modal-window :showItem="showNoPosts" @closeModal="closeShowNoPosts"
        ><div class="p-5">No more posts!</div>
      </modal-window>
    </Transition>
  </div>
</template>

<script lang="ts">
export default {
  components: { SpinnerMain, InputMain },
  name: 'PostsView'
}
</script>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { Blog } from '@/types/index'
import { get_posts } from '@/service/index'
import { useBlogStore } from '@/stores'
import SpinnerMain from '../components/UI/SpinnerMain.vue'
import InputMain from '../components/UI/InputMain.vue'

// mock initial
// const posts = ref<Blog.Post[]>([{ id: 1, title: 'First blog', body: 'Text of the first blog' }])
const store = useBlogStore()
const posts = store.postsList
const showModal = ref(false)
const isLoading = store.isLoading
const noMorePosts = store.noMorePosts
const showNoPosts = ref(false)
const searchValue = ref<string>('')
const searchedValue = store.searchedValue
const isIntersected = ref<boolean>(false)
const scrolledDown = ref<boolean>(false)
const scrolledValue = ref<number>(0)

const bottom = ref()
const handleSubmitNewBlog = (post: Blog.Post) => {
  store.addPost(post)
  showModal.value = false
}

const handleDeletePost = (id: number) => store.deletePost(id)

const requestForPosts = async () => {
  isIntersected.value = false
  await get_posts(store.paginate_number)
}

const handleIntersect = () => {
  if (scrolledValue.value) isIntersected.value = true
}

const handleScroll = (e: Event) => {
  scrolledValue.value < document.body.scrollTop
    ? (scrolledDown.value = true)
    : (scrolledDown.value = false)
  if (!scrolledDown.value) isIntersected.value = false
  if (scrolledDown.value && isIntersected.value === true) requestForPosts()
  scrolledValue.value = document.body.scrollTop
}

const closeShowNoPosts = () => {
  showNoPosts.value = false
  store.setNoPosts(false)
}

const searchPost = () => {
  store.setSearchValue(searchValue.value)
}

watch(bottom, () => {
  if (bottom.value && !searchValue.value) {
    const observer = new IntersectionObserver((data: IntersectionObserverEntry[]) => {
      data[0].isIntersecting ? handleIntersect() : null
    })
    observer.observe(bottom.value)
  }
})

watch(
  isLoading,
  () => {
    isLoading.value
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = '')
  },
  {
    immediate: true
  }
)

watch(searchValue, () => {
  if (!searchValue.value) store.setSearchValue('')
})

watch(noMorePosts, () => {
  if (noMorePosts.value) {
    setTimeout(() => {
      store.setLoading(false)
      showNoPosts.value = true
    }, 500)
  }
})

onMounted(() => {
  if (!posts.value.length) get_posts(store.paginate_number)
})

onMounted(() => {
  document.body.addEventListener('scroll', (e: Event) => handleScroll(e))
})
</script>

<style scoped>
.posts .post-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

.posts-fade-enter-active,
.modal-fade-enter-active {
  transition: all 0.3s ease-out;
}

.posts-fade-leave-active,
.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.posts-fade-enter-from,
.posts-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
