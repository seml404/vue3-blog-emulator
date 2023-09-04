<template>
  <input
    class="input"
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
  modelValue: { type: String, required: false },
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
.input {
  border: 1px solid #2f5cc5;
}
</style>
