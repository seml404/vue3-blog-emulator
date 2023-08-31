<template>
  <TransitionGroup name="posts">
    <post-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
      class="post-item"
      @deletePost="handleDeletePost"
    ></post-item>
  </TransitionGroup>
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
  posts: {
    type: Array<Blog.Post>,
    required: true
  }
})
const handleDeletePost = (data: number) => {
  emits('deletePost', data)
}
</script>

<style lang="scss" scoped>
.posts-enter-active,
.posts-leave-active {
  transition: all 0.5s ease;
}
.posts-enter-from,
.posts-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.post-item {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
