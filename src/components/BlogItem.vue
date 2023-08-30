<template>
  <div class="blog-item">
    <div class="line">
      <p class="title">Title:</p>
      <p class="text">{{ blog_item.title }}</p>
    </div>
    <div class="line">
      <p class="title">Text:</p>
      <p class="text">{{ blog_item.text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BlogItem'
}
</script>

<script setup lang="ts">
import { Blog } from '@/types/index'
const props = defineProps({
  blog_item: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">
.blog-item {
  border: 1px solid teal;
  padding: 10px;
  border-radius: 10px;
  .line {
    display: flex;
  }
  .title {
    font-weight: 700;
    margin-bottom: 10px;
    margin-right: 7px;
  }
}
</style>
