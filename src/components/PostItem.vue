<template>
  <div class="post-item">
    <div class="line">
      <p class="title">Title:</p>
      <p class="text">{{ post.title }}</p>
    </div>
    <div class="line">
      <p class="title">Text:</p>
      <p class="text">{{ post.body }}</p>
    </div>
    <btn-main @click="$emit('deletePost', post.id)">Delete post</btn-main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PostItem'
}
</script>

<script setup lang="ts">
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">
.post-item {
  border: 1px solid #2f5cc5;
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
