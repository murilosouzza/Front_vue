<template>
  <div class="d-flex justify-content-between px-3 pb-3 pt-2 gap-1">
    <div
      v-for="dia in semana"
      :key="dia.label"
      class="flex-fill d-flex flex-column align-items-center gap-1 py-2 rounded-3"
      :class="dia.ativo ? 'glass-light shadow-sm' : ''"
      style="cursor:default; transition: background-color 0.2s;"
    >
      <span class="text-uppercase text-muted-app fw-semibold" style="font-size:10px; letter-spacing:0.5px;">{{ dia.label }}</span>
      <span class="fw-semibold text-dark-app" style="font-size:15px;">{{ dia.numero }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const LABELS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM']
const semana = computed(() => {
  const hoje = new Date()
  const diaSemana = hoje.getDay()
  const diasParaSeg = diaSemana === 0 ? 6 : diaSemana - 1
  const seg = new Date(hoje)
  seg.setDate(hoje.getDate() - diasParaSeg)
  return LABELS.map((label, i) => {
    const d = new Date(seg)
    d.setDate(seg.getDate() + i)
    return { label, numero: d.getDate(), ativo: d.toDateString() === hoje.toDateString() }
  })
})
</script>
