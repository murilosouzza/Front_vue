<template>
  <RouterLink
    :to="to"
    class="d-flex align-items-center gap-3 p-3 rounded-4 text-decoration-none shadow-sm"
    :class="bgClass"
    style="transition: transform 0.2s, opacity 0.2s; backdrop-filter: blur(10px);"
    @mouseenter="e => e.currentTarget.style.transform='scale(1.02)'"
    @mouseleave="e => e.currentTarget.style.transform=''"
  >
    <!-- Ícone -->
    <div
      class="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
      style="width:60px; height:60px; background: rgba(255,255,255,0.4);"
    >
      <img :src="icone" :alt="titulo" style="width:40px; height:40px; object-fit:contain;" />
    </div>

    <!-- Texto -->
    <div class="d-flex flex-column flex-fill gap-1">
      <strong class="text-white fw-bold" style="font-size:16px; text-shadow:0 1px 4px rgba(0,0,0,0.15);">{{ titulo }}</strong>
      <span class="text-white-50 lh-sm" style="font-size:12px;">{{ descricao }}</span>
    </div>

    <!-- Seta -->
    <div class="text-white fw-light" style="font-size:26px; opacity:0.9;">›</div>
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  to:        { type: String, required: true },
  icone:     { type: String, required: true },
  titulo:    { type: String, required: true },
  descricao: { type: String, default: '' },
  cor:       { type: String, default: 'azul' },
})

const bgMap = {
  azul:    'card-azul',
  rosa:    'card-rosa',
  laranja: 'card-laranja',
}
const bgClass = bgMap[props.cor] || 'card-azul'
</script>

<style scoped>
.card-azul    { background: rgba(160, 200, 235, 0.75); }
.card-rosa    { background: rgba(235, 160, 150, 0.75); }
.card-laranja { background: rgba(240, 190, 120, 0.75); }
</style>
