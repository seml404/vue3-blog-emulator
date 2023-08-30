<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'BtnMain'
}
</script>

<style lang="scss" scoped>
.btn {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #fff;
  background-color: #2f5cc5;
  color: #fff;
  font-weight: bold;
}
</style>
