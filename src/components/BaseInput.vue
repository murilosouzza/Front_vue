<template>
  <div class="w-100 mb-3">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input-app"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  type:        { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
})
defineEmits(['update:modelValue'])
</script>
