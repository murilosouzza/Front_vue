<template>
  <div>
    <p class="text-white fw-normal mb-3" style="font-size:18px;">{{ numero }}. {{ texto }}</p>

    <div class="d-flex justify-content-between gap-2 p-3 rounded-4" style="background: rgba(255,255,255,0.2);">
      <span
        v-for="n in 5"
        :key="n"
        class="flex-fill text-center py-3 rounded-3 fw-bold border-2 user-select-none"
        :class="modelValue === n ? 'opcao-selecionada' : 'opcao-normal'"
        style="cursor:pointer; transition: transform 0.2s, background-color 0.2s;"
        @click="$emit('update:modelValue', n)"
        @mouseenter="e => e.currentTarget.style.transform='scale(1.05)'"
        @mouseleave="e => e.currentTarget.style.transform=''"
      >{{ n }}</span>
    </div>

    <div class="d-flex justify-content-between mt-2 px-1">
      <small class="text-white-75">Ruim</small>
      <small class="text-white-75">Bom</small>
    </div>
  </div>
</template>

<script setup>
defineProps({
  numero:     { type: Number, required: true },
  texto:      { type: String, required: true },
  modelValue: { type: Number, default: null },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.opcao-normal    { background: rgba(255,255,255,0.7); color: var(--color-mid); border: 2px solid transparent; }
.opcao-selecionada { background: #E6B4B0; color: white; border: 2px solid var(--color-primary); }
.text-white-75   { color: rgba(255,255,255,0.85); }
</style>