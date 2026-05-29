<template>
  <header class="d-flex align-items-center gap-3 px-4 pt-4 pb-3">
    <RouterLink
      v-if="backTo"
      :to="backTo"
      class="text-dark-app text-decoration-none fw-light"
      style="font-size:32px; opacity:0.8; line-height:1; transition: opacity 0.2s;"
      @mouseenter="e => e.currentTarget.style.opacity='1'"
      @mouseleave="e => e.currentTarget.style.opacity='0.8'"
    >‹</RouterLink>
    <div>
      <h1 class="mb-0 text-dark-app fw-bold" style="font-size:26px;">{{ title }}</h1>
      <p v-if="subtitle" class="mb-0 small text-muted-app">{{ subtitle }}</p>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title:    { type: String, required: true },
  subtitle: { type: String, default: '' },
  backTo:   { type: String, default: '' },
})
</script>
