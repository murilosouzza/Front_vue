<template>
  <div>
    <p class="text-white fw-normal mb-3" style="font-size:18px;">{{ numero }}. {{ texto }}</p>
    <div class="d-flex gap-3">
      <button
        v-for="opcao in opcoes"
        :key="opcao.valor"
        class="btn flex-fill py-3 fw-bold rounded-4 border-2"
        :class="modelValue === opcao.valor ? 'opcao-selecionada' : 'opcao-normal'"
        style="font-size:15px; transition: transform 0.2s, background-color 0.2s;"
        @click="$emit('update:modelValue', opcao.valor)"
        @mouseenter="e => e.currentTarget.style.transform='scale(1.04)'"
        @mouseleave="e => e.currentTarget.style.transform=''"
      >
        {{ opcao.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  numero:     { type: Number, required: true },
  texto:      { type: String, required: true },
  modelValue: { type: String, default: null },
  opcoes: {
    type: Array,
    default: () => [
      { label: '✖ Não', valor: 'Não' },
      { label: '✔ Sim', valor: 'Sim' },
    ],
  },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.opcao-normal    { background: rgba(255,255,255,0.65); color: var(--color-mid); border-color: transparent; }
.opcao-selecionada { background: #E6B4B0; color: white; border-color: var(--color-primary); }
</style>
