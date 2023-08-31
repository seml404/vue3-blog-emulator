<template>
  <form @click.prevent>
    <input-main
      :modelValue="newBlog.title"
      :custom_placeholder="'title'"
      @update:modelValue="(data) => (newBlog.title = data)"
      class="input-new-blog"
    ></input-main>
    <input-main
      :modelValue="newBlog.body"
      :custom_placeholder="'text'"
      @update:modelValue="(data) => (newBlog.body = data)"
      class="input-new-blog"
    ></input-main>
    <btn-main @click="handleSubmit">Create new post</btn-main>
  </form>
</template>

<script setup lang="ts">
import type { Blog } from '@/types'
import { reactive } from 'vue'
const emit = defineEmits(['submitNewBlog'])
const newBlog = reactive<Blog.Post>({
  id: Date.now(),
  title: '',
  body: ''
})
const handleSubmit = () => {
  console.log('submit new blogА', newBlog)
  if (newBlog.title && newBlog.body) {
    emit('submitNewBlog', newBlog)
  }
}
</script>

<script lang="ts">
export default {
  name: 'CreatePost'
}
</script>

<style scoped>
.input-new-blog {
  margin-right: 10px;
}
</style>
