<template>
  <div>
    <form @click.prevent>
      <input-main
        :modelValue="newBlog.title"
        :custom_placeholder="'title'"
        @update:modelValue="(data) => (newBlog.title = data)"
        class="input-new-blog"
      ></input-main>
      <input-main
        :modelValue="newBlog.text"
        :custom_placeholder="'text'"
        @update:modelValue="(data) => (newBlog.text = data)"
        class="input-new-blog"
      ></input-main>
      <btn-main @click="handleSubmit">Create new post</btn-main>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const emit = defineEmits(['submitNewBlog'])
const newBlog = reactive({
  id: Date.now(),
  title: '',
  text: ''
})
const handleSubmit = () => {
  console.log('submit new blogА', newBlog)
  if (newBlog.title && newBlog.text) {
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
