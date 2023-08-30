<template>
  <div>
    <h1>List of posts</h1>
    <div v-if="blogs.length">
      <blog-item
        v-for="blog_item in blogs"
        :key="blog_item.id"
        :blog_item="blog_item"
        class="blog-item"
      ></blog-item>
    </div>
    <modal-window :showModal="showModal" @toggleModal="showModal = !showModal"
      ><CreateBlogItem @submitNewBlog="handleSubmitNewBlog"></CreateBlogItem>
    </modal-window>
    <btn-main @click="showModal = true">Create new post</btn-main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import CreateBlogItem from './components/CreateBlogItem.vue'
const blogs = ref([{ id: 1, title: 'First blog', text: 'Text of the first blog' }])
const showModal = ref(false)
const handleSubmitNewBlog = (data) => {
  blogs.value.push(data)
  showModal.value = false
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.blog-item {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
