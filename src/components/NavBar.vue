<template>
  <div>
    <router-link class="nav-link" to="/">Home Page</router-link>
    <router-link to="/posts">Posts Page</router-link>
  </div>
</template>

<script lang="ts">
export default {
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
