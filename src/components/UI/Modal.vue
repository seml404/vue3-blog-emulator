<template>
  <div class="modal__background" @click="handeToggleModal" v-if="showItem">
    <div class="modal__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  showItem: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['toggleModal'])
const handeToggleModal = (e) => {
  emit('toggleModal')
}
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
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
>
