<template>
  <button
    class="btn w-100 py-3 fw-bold rounded-pill border-0"
    :class="variantClass"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  variant:  { type: String, default: 'primary' },
  disabled: { type: Boolean, default: false },
})
defineEmits(['click'])

const variantClass = {
  primary: 'btn-app-primary',
  yellow:  'btn-app-yellow',
  ghost:   'btn-app-ghost',
}[props.variant] || 'btn-app-primary'
</script>
