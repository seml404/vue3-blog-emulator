<template>
  <div
    class="post-item card"
    @click="$router.push({ name: 'post_details', params: { id: post.id } })"
  >
    <div class="line">
      <p class="is-size-4 mr-3">Title:</p>
      <p class="is-size-6">{{ post.title }}</p>
    </div>
    <div class="line">
      <p class="is-size-4 mr-3">Text:</p>
      <p class="is-size-6">{{ post.body }}</p>
    </div>
    <btn-main class="mt-4 is-danger" @click.stop="$emit('deletePost', post.id)"
      >Delete post</btn-main
    >
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
