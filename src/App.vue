<template>
  <div>
    <h1>List of posts</h1>
    <div v-if="blogs.length">
      <posts-list :blogs="blogs" @deletePost="handleDeletePost"></posts-list>
    </div>
    <div v-else>No posts yet</div>
    <modal-window :showModal="showModal" @toggleModal="showModal = !showModal"
      ><create-post @submitNewBlog="handleSubmitNewBlog"></create-post>
    </modal-window>
    <btn-main @click="showModal = true">Create new post</btn-main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Blog } from '@/types/index'
import { RouterLink, RouterView } from 'vue-router'
import { get_posts } from './service/index'

const blogs = ref<Blog.PostItem[]>([{ id: 1, title: 'First blog', text: 'Text of the first blog' }])
const showModal = ref(false)
const handleSubmitNewBlog = (data) => {
  blogs.value.push(data)
  showModal.value = false
}

const handleDeletePost = (id: number) => {
  blogs.value = blogs.value.filter((el) => el.id !== id)
}

onMounted(() => {
  get_posts()
})
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
</style>

<style>
[v-cloak] {
  display: none;
}
</style>
