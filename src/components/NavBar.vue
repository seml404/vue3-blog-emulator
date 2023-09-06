<template>
  <div class="is-flex is-justify-content-center is-align-content-center mt-5 mb-5">
    <button-main @click="$router.push('/')" class="is-link mr-5">Home Page</button-main>
    <button-main @click="$router.push('/posts')" class="is-link">Posts</button-main>
  </div>
</template>

<script lang="ts">
import ButtonMain from './UI/ButtonMain.vue'
export default {
  components: { ButtonMain },
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
.nav-link {
  font-weight: 500;
  display: inline-block;
  margin-right: 50px;
  text-decoration: none;
}
</style>
