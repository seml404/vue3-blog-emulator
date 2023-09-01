<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

[v-cloak] {
  display: none;
}
</style>
