<template>
  <div class="modal__background" @click="handeCloseModal" v-if="showItem">
    <div class="modal__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'
const props = defineProps({
  showItem: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['closeModal'])
const handeCloseModal = () => {
  emit('closeModal')
}

const escToggle = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('closeModal')
}

onMounted(() => {
  document.addEventListener('keydown', escToggle)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', escToggle)
})
</script>

<script lang="ts">
export default {
  name: 'ModalWindow'
}
</script>

<style lang="scss">
.modal__background {
  position: fixed;

  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal__content {
  background-color: #fff;
  opacity: 1;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
