<template>
  <div class="mx-3 mt-3 rounded-4 d-flex align-items-center justify-content-center p-4 glass-light shadow-sm" style="min-height:80px;">
    <p class="mb-0 small text-center fst-italic text-mid-app" style="line-height:1.6; opacity:0.85;">
      {{ mensagem }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const mensagens = [
  '💜 Cuidar da sua mente é um ato de amor próprio.',
  '🌤️ Cada dia é uma nova chance de recomeçar.',
  '🌱 Pequenos passos também são progresso.',
  '✨ Você não precisa estar bem o tempo todo. Isso é humano.',
  '🫶 Sua jornada importa. Continue.',
  '🌈 Sentir é parte de ser. Acolha seus sentimentos.',
  '🕊️ Respire fundo. Você está fazendo o melhor que pode.',
]
const mensagem = computed(() => mensagens[new Date().getDay()])
</script>
