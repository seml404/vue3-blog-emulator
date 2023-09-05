<template>
  <div class="content">
    <div class="post-item card p-3">
      <div class="line">
        <p class="is-size-4 mr-3">Title:</p>
        <p class="is-size-6">{{ postDetails.title }}</p>
      </div>
      <div class="line">
        <p class="is-size-4 mr-3">Text:</p>
        <p class="is-size-6">{{ postDetails.body }}</p>
      </div>
      <btn-main class="mt-4" @click.stop="handleDelete(id)">Delete post</btn-main>
    </div>
    <spinner-main :showItem="isLoading"></spinner-main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PostDetails'
}
</script>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores'
import { onBeforeMount, onMounted, ref } from 'vue'
import type { Blog } from '@/types/index'
import { storeToRefs } from 'pinia'
import { posts_service } from '@/stores'

const route = useRoute()
const store = useBlogStore()
const postDetails = ref<Blog.Post>(posts_service.default_post())
const id = +route.params.id
const posts = store.postsList
const isLoading = store.isLoading

const handleDelete = (id: number) => {
  store.deletePost(id)
}

onMounted(async () => {
  if (!store.posts.length) {
    await store.getPosts()
  }
  postDetails.value = posts.value.filter((el: Blog.Post) => el.id === id)[0]
})
</script>
