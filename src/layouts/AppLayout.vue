<template>
  <div>
    <spinner-main></spinner-main>
    <component :is="layout">
      <slot />
    </component>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'

import { useRoute } from 'vue-router'
import SpinnerMain from '../components/UI/SpinnerMain.vue'

const route = useRoute()
const layout = ref<string | {}>('')
watch(
  () => route.meta,
  (meta) => {
    layout.value = meta.layout || 'default-layout'
  }
)
</script>

<script lang="ts">
export default {
  components: { SpinnerMain },
  name: 'AppLayout'
}
</script>
