<template>
  <div class="content">
    <p class="is-size-1">This is the post with id {{ id }}</p>
    <p class="is-size-3">{{ postDetails.title }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PostDetails'
}
</script>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores'
import { onBeforeMount, ref } from 'vue'
import type { Blog } from '@/types/index'
import { default_post } from '@/service/'

const route = useRoute()
const store = useBlogStore()
const postDetails = ref<Blog.Post>(default_post())
const id = +route.params.id
const posts = store.posts

onBeforeMount(async () => {
  // if (!store.posts.length) {
  //   await store.get_posts(store.paginate_number)
  //   console.log('posts received', posts)
  //   const post = posts.find((el) => el.id === +route.params.id)
  //   console.log(post, id)
  // } else {
  //   const post = posts.filter((el) => el.id === +route.params.id)
  //   console.log(post, id, store.posts)
  // }
})
</script>
