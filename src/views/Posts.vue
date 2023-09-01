<template>
  <div class="posts">
    <div>
      <input-main :model-value="searchValue" :custom_placeholder="'Search'"></input-main>
      <btn-main @click="null">Search</btn-main>
    </div>
    <btn-main @click="showModal = true">Create new post</btn-main>
    <h1>List of posts</h1>
    <Transition name="posts-fade">
      <div v-if="posts.length">
        <posts-list :posts="posts" @deletePost="handleDeletePost"></posts-list>
        <div ref="bottom"></div>
      </div>
      <div v-else>No posts yet</div>
    </Transition>

    <modal-window :showItem="showModal" @toggleModal="showModal = !showModal"
      ><create-post @submitNewBlog="handleSubmitNewBlog"></create-post>
    </modal-window>

    <spinner-main :showItem="isLoading"></spinner-main>
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
const searchValue = ref<string>('')

const handleSubmitNewBlog = (post: Blog.Post) => {
  store.addPost(post)
  showModal.value = false
}

const handleDeletePost = (id: number) => store.deletePost(id)

const bottom = ref()

watch(bottom, () => {
  if (bottom.value) {
    const observer = new IntersectionObserver((data: IntersectionObserverEntry[]) => {
      data[0].isIntersecting ? get_posts(store.paginate_number) : null
    })
    observer.observe(bottom.value)
  }
})

watch(
  isLoading,
  () => {
    if (isLoading.value) {
      document.body.style.overflow = 'hidden'
      console.log('is loading')
    } else if (!isLoading.value) {
      console.log('this case, no hidden')
      document.body.style.overflow = ''
    }
  },
  {
    immediate: true
  }
)

onMounted(() => {
  if (!posts.value.length) get_posts(store.paginate_number)
})
</script>

<style scoped>
.posts .post-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

.posts-fade-enter-active {
  transition: all 0.3s ease-out;
}

.posts-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.posts-fade-enter-from,
.posts-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
