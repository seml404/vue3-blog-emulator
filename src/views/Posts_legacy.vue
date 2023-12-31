<template>
  <div class="content">
    <div>
      <input-main
        @update:model-value="(val) => (searchValue = val.trim())"
        :custom_placeholder="'Search'"
        :model-value="searchValue"
      ></input-main>

      <div class="is-flex is-justify-content-center is-align-content-center p-4">
        <btn-main
          class="is-primary mr-5"
          @click="searchPost"
          v-if="!searchedValue"
          :disabled="!searchValue"
          >Search for post</btn-main
        >
        <btn-main class="is-primary mr-5" @click="() => (searchValue = '')" v-else
          >Clear search</btn-main
        >
        <btn-main @click="showModal = true" class="is-primary">Create new post</btn-main>
      </div>
    </div>
    <div class="is-flex is-justify-content-center is-align-content-center">
      <p class="is-size-2">List of posts</p>
    </div>

    <Transition name="posts-fade">
      <div v-if="posts.length">
        <posts-list :posts="posts" @deletePost="handleDeletePost"></posts-list>
        <div ref="bottom" class="card has-text-centered">End of list</div>
      </div>
      <div v-else>
        <div class="is-flex is-justify-content-center is-align-content-center">
          <p class="is-size-3">No posts yet</p>
        </div>
        <btn-main
          class="is-primary mt-4 mb-4"
          v-if="!searchedValue"
          @click="() => requestForPosts()"
          >Request for posts</btn-main
        >
      </div>
    </Transition>
    <Transition name="modal-fade">
      <modal-window :showItem="showModal" @closeModal="showModal = false"
        ><create-post @submitNewBlog="handleSubmitNewBlog"></create-post>
      </modal-window>
    </Transition>

    <Transition name="modal-fade">
      <modal-window :showItem="showNoPosts" @closeModal="closeShowNoPosts"
        ><div class="p-5">No more posts!</div>
      </modal-window>
    </Transition>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PostsView'
}
</script>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Blog } from '@/types/index'
import { useBlogStore } from '@/stores'
import InputMain from '../components/UI/InputMain.vue'

// mock initial
// const posts = ref<Blog.Post[]>([{ id: 1, title: 'First blog', body: 'Text of the first blog' }])
const store = useBlogStore()
const posts = store.postsList
const showModal = ref(false)
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
  store.getPosts()
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
  if (!posts.value.length) store.getPosts()
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
