<template>
  <div class="modal__background" @click="handeToggleModal" v-if="showModal">
    <div class="modal__conent">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  showModal: {
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

<style lang="scss" scoped>
.modal-background {
  position: fixed;
  opacity: 0.5;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal__conent {
}
</style>
>
