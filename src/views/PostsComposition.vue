<template>
  <div class="content">
    <div>
      <input-main
        @update:model-value="(val) => (search = val.trim())"
        :custom_placeholder="'Search'"
        :model-value="search"
      ></input-main>

      <div class="is-flex is-justify-content-center is-align-content-center p-4">
        <btn-main
          class="is-primary mr-5"
          @click="searchPost"
          v-if="!searchValue"
          :disabled="!search"
          >Search for post</btn-main
        >
        <btn-main class="is-primary mr-5" @click="() => (search = '')" v-else
          >Clear search</btn-main
        >
        <btn-main @click="showModal = true" class="is-primary">Create new post</btn-main>
      </div>
    </div>
    <div class="is-flex is-justify-content-center is-align-content-center">
      <p class="is-size-2">List of posts</p>
    </div>

    <Transition name="posts-fade">
      <div v-if="posts.length">
        <posts-list :posts="posts" @deletePost="handleDeletePost"></posts-list>
        <div ref="bottom" class="card has-text-centered">End of list</div>
      </div>
      <div v-else>
        <div class="is-flex is-justify-content-center is-align-content-center">
          <p class="is-size-3">No posts yet</p>
        </div>
        <btn-main class="is-primary mt-4 mb-4" v-if="!searchValue" @click="() => requestForPosts()"
          >Request for posts</btn-main
        >
      </div>
    </Transition>
    <Transition name="modal-fade">
      <modal-window :showItem="showModal" @closeModal="showModal = false"
        ><create-post @submitNewBlog="handleSubmitNewBlog"></create-post>
      </modal-window>
    </Transition>

    <Transition name="modal-fade">
      <modal-window :showItem="noMorePosts" @closeModal="closeShowNoPosts"
        ><div class="p-5">No more posts!</div>
      </modal-window>
    </Transition>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PostsView'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useBlogStore } from '@/stores'
import InputMain from '../components/UI/InputMain.vue'
import { useSearch, useFetchPosts, useHandleScroll, useAmendPosts } from '@/hooks'
const bottom = ref()
const { requestForPosts } = useFetchPosts()
const { searchPost, search } = useSearch(requestForPosts)
useHandleScroll(requestForPosts, bottom)
const { handleSubmitNewBlog, handleDeletePost, closeShowNoPosts, showModal } = useAmendPosts()
const store = useBlogStore()
const { searchValue, postsList: posts, noMorePosts } = store
</script>

<style scoped>
.posts .post-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

.posts-fade-enter-active,
.modal-fade-enter-active {
  transition: all 0.3s ease-out;
}

.posts-fade-leave-active,
.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.posts-fade-enter-from,
.posts-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
