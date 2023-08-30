<template>
  <input
    class="input-main"
    :value="modelValue"
    @input="handleUpdate"
    :placeholder="custom_placeholder"
  />
</template>

<script lang="ts">
export default {
  name: 'InputMain'
}
</script>

<script setup lang="ts">
defineProps({
  modelValue: { type: String, required: true },
  custom_placeholder: {
    type: String,
    default: 'text'
  }
})
const emit = defineEmits(['update:modelValue'])
const handleUpdate = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>

<style lang="scss" scoped>
.input-main {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid teal;
}
</style>
