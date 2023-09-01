<template>
  <div>
    <h1>List of posts</h1>
    <Transition name="posts-fade">
      <div v-if="posts.length">
        <posts-list :posts="posts" @deletePost="handleDeletePost"></posts-list>
        <div ref="bottom"></div>
      </div>
      <div v-else>No posts yet</div>
    </Transition>

    <modal-window :showModal="showModal" @toggleModal="showModal = !showModal"
      ><create-post @submitNewBlog="handleSubmitNewBlog"></create-post>
    </modal-window>
    <btn-main @click="showModal = true">Create new post</btn-main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PostsView'
}
</script>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { Blog } from '@/types/index'
import { RouterLink, RouterView } from 'vue-router'
import { get_posts } from '@/service/index'
import { useBlogStore } from '@/stores'

// const posts = ref<Blog.Post[]>([{ id: 1, title: 'First blog', body: 'Text of the first blog' }])
const store = useBlogStore()
const posts = store.postsList
const showModal = ref(false)
const handleSubmitNewBlog = (data) => {
  posts.value.push(data)
  showModal.value = false
}

const handleDeletePost = (id: number) => {
  posts.value = posts.value.filter((el) => el.id !== id)
}

const bottom = ref()

watch(bottom, () => {
  if (bottom.value) {
    const observer = new IntersectionObserver((data) => {
      data[0].isIntersecting ? get_posts(store.paginate_number) : null
    })
    observer.observe(bottom.value)
  }
})

onMounted(() => {
  get_posts(store.paginate_number)
})

const scrolledToBottom = ref(false)
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.post-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

[v-cloak] {
  display: none;
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
