<template>
  <div>
    <h1>List of posts</h1>
    <div v-if="blogs.length">
      <blog-item v-for="blog_item in blogs" :key="blog_item.id" :blog_item="blog_item"></blog-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
const blogs = [{ id: 1, title: 'First blog', text: 'Text of the first blog' }]
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
