<template>
  <GradientLayout>
    <div class="mx-auto px-4 pt-5 pb-5 d-flex flex-column min-vh-100" style="max-width:420px;">
      <h1 class="text-white fw-bold mb-2" style="font-size:38px; text-shadow: 0 2px 10px rgba(0,0,0,0.15);">Olá!</h1>
      <p class="mb-4 text-white" style="font-size:16px; opacity:0.9; text-shadow: 0 1px 6px rgba(0,0,0,0.1);">
        Como você está se sentindo hoje?
      </p>

      <div class="d-flex flex-column gap-3">
        <button
          v-for="opcao in opcoesHumor"
          :key="opcao.valor"
          class="btn border-0 py-3 px-4 rounded-4 text-white fw-normal text-start shadow-sm"
          :class="[`opcao-${opcao.classe}`, { 'border border-3 border-white': selecionado === opcao.valor }, opcao.destaque ? 'text-center' : '']"
          style="font-size:17px; transition: transform 0.15s, box-shadow 0.15s; font-family: var(--font-family);"
          @click="selecionar(opcao.valor)"
          @mouseenter="e => e.currentTarget.style.transform='scale(1.02)'"
          @mouseleave="e => e.currentTarget.style.transform=''"
        >
          <strong v-if="opcao.destaque">{{ opcao.label }}</strong>
          <template v-else>{{ opcao.label }}</template>
        </button>
      </div>
    </div>

    <CvvPanel :visible="mostrarCvv" @fechar="mostrarCvv = false" />
  </GradientLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GradientLayout from '../components/GradientLayout.vue'
import CvvPanel from '../components/CvvPanel.vue'
import { useApi } from '../composables/useApi.js'
import { useStorage } from '../composables/useStorage.js'

const router = useRouter()
const { salvarAvaliacao } = useApi()
const { KEYS, get, set } = useStorage()

const selecionado = ref(null)
const mostrarCvv = ref(false)

const opcoesHumor = [
  { label: 'Muito bem',         valor: 'Muito bem',       classe: 'muito-bem'  },
  { label: 'Bem',               valor: 'Bem',             classe: 'bem'        },
  { label: 'Neutro',            valor: 'Neutro',          classe: 'neutro'     },
  { label: 'Mal',               valor: 'Mal',             classe: 'mal'        },
  { label: 'Muito mal',         valor: 'Muito mal',       classe: 'muito-mal'  },
  { label: 'Preciso de ajuda!', valor: 'Preciso de ajuda', classe: 'ajuda', destaque: true },
]

async function selecionar(humor) {
  selecionado.value = humor
  if (humor === 'Preciso de ajuda') { mostrarCvv.value = true; return }
  set(KEYS.humorHoje, humor)
  set(KEYS.humorData, new Date().toLocaleDateString('pt-BR'))
  const usuarioId = get(KEYS.usuarioId)
  if (usuarioId) {
    try { await salvarAvaliacao(usuarioId, humor) } catch (e) { console.error(e) }
  }
  setTimeout(() => router.push('/home'), 600)
}
</script>

<style scoped>
.opcao-muito-bem  { background: rgba(130, 210, 180, 0.85); }
.opcao-bem        { background: rgba(165, 225, 200, 0.75); }
.opcao-neutro     { background: rgba(240, 185, 155, 0.75); }
.opcao-mal        { background: rgba(235, 130, 100, 0.80); }
.opcao-muito-mal  { background: rgba(200,  80, 120, 0.80); }
.opcao-ajuda      { background: rgba(130, 140, 200, 0.80); }
</style>
