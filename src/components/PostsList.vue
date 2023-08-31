<template>
  <div>
    <post-item
      v-for="blog_item in blogs"
      :key="blog_item.id"
      :blog_item="blog_item"
      class="post-item"
      @deletePost="handleDeletePost"
    ></post-item>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PostsList'
}
</script>

<script setup lang="ts">
import type { Blog } from '@/types/index'
const emits = defineEmits(['deletePost'])
const props = defineProps({
  blogs: {
    type: Array<Blog.PostItem>,
    required: true
  }
})
const handleDeletePost = (data: number) => {
  emits('deletePost', data)
}
</script>
