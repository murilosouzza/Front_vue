<template>
  <div class="w-100 d-flex flex-column align-items-center px-3 py-5" style="max-width: 400px; margin: auto;">
    <!-- Avatar -->
    <div v-if="showAvatar" class="mb-n5 position-relative" style="z-index: 2;">
      <div
        class="rounded-circle d-flex align-items-center justify-content-center border border-4 border-white"
        style="width:120px; height:120px; background-color:#e6ecf3;"
      >
        <img :src="avatarSrc" alt="Usuário" style="width:60%;" />
      </div>
    </div>

    <!-- Card -->
    <div
      class="w-100 text-center rounded-4 glass shadow-lg"
      :class="showAvatar ? 'pt-5 pb-4 px-4' : 'p-4'"
      style="transition: transform 0.3s, box-shadow 0.3s;"
      @mouseenter="e => e.currentTarget.style.transform='translateY(-4px)'"
      @mouseleave="e => e.currentTarget.style.transform=''"
    >
      <h2 class="text-primary-app fw-semibold mb-4 pt-2" style="font-size:22px;">{{ title }}</h2>
      <slot />
    </div>
  </div>
</template>

<script setup>
import loginIcon from '../assets/icons/login-icon.png'
defineProps({
  title:      { type: String, required: true },
  showAvatar: { type: Boolean, default: true },
  avatarSrc:  { type: String, default: loginIcon },
})
</script>
