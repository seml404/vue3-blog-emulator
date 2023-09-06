<template>
  <div class="spinner-background" v-if="showItem">
    <div class="spinner-content"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SpinnerMain'
}
</script>

<script lang="ts" setup>
import { watch } from 'vue'
import { useBlogStore } from '@/stores'
const store = useBlogStore()
const showItem = store.isLoading

watch(
  showItem,
  () => {
    showItem.value ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '')
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.spinner-background {
  background-color: rgb(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.spinner-content {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
