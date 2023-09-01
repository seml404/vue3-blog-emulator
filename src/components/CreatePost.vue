<template>
  <form @click.prevent class="box">
    <div class="field">
      <input-main
        :modelValue="newBlog.title"
        :custom_placeholder="'title'"
        @update:modelValue="(data) => (newBlog.title = data)"
        class="input-new-blog"
      ></input-main>
    </div>
    <div class="field">
      <input-main
        :modelValue="newBlog.body"
        :custom_placeholder="'text'"
        @update:modelValue="(data) => (newBlog.body = data)"
        class="input-new-blog"
      ></input-main>
    </div>
    <btn-main @click="handleSubmit" class="mt-4 mb-4">Create new post</btn-main>
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
