<template>
  <GradientLayout>
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center px-4 pt-4 pb-3">
      <div class="d-flex align-items-center gap-3">
        <button
          class="rounded-circle border-0 p-0"
          style="width:48px; height:48px; background: rgba(255,255,255,0.6); backdrop-filter: blur(8px); border: 2px solid rgba(255,255,255,0.8); cursor:pointer;"
          @click="overlayAberto = true"
        />
        <div class="d-flex flex-column">
          <span class="text-dark-app" style="font-size:18px;">Olá, <strong>{{ nomeUsuario }}</strong></span>
          <span class="text-muted-app small" style="opacity:0.85;">Como está seu dia?</span>
        </div>
      </div>
      <div style="font-size:22px; cursor:pointer; opacity:0.8;">🔔</div>
    </div>

    <!-- Calendário -->
    <CalendarioSemana />

    <!-- Cards -->
    <div class="d-flex flex-column gap-3 px-3 pb-2">
      <CardNavegacao to="/checagem" :icone="iconeHumor"    titulo="Checagem de humor"  descricao="Nos diga como está se sentindo hoje"                        cor="azul"    />
      <CardNavegacao to="/perguntas" :icone="iconePerguntas" titulo="Perguntas do dia"  descricao="Tire um tempinho para responder as perguntas de hoje"       cor="rosa"    />
      <CardNavegacao to="/senha"    :icone="iconeGrafico"  titulo="Mapa de humor"      descricao="Visualize seus registros"                                   cor="laranja" />
    </div>

    <!-- Mensagem do dia -->
    <MensagemDia />

    <!-- Overlay -->
    <PerfilOverlay :visible="overlayAberto" :nome="nomeUsuario" @fechar="overlayAberto = false" />
  </GradientLayout>
</template>

<script setup>
import { ref } from 'vue'
import GradientLayout from '../components/GradientLayout.vue'
import CalendarioSemana from '../components/CalendarioSemana.vue'
import CardNavegacao from '../components/CardNavegacao.vue'
import MensagemDia from '../components/MensagemDia.vue'
import PerfilOverlay from '../components/PerfilOverlay.vue'
import { useStorage } from '../composables/useStorage.js'

import iconeHumor from '../assets/icons/mudanca-de-humor.png'
import iconePerguntas from '../assets/icons/pesquisa-de-mercado.png'
import iconeGrafico from '../assets/icons/grafico.png'

const { KEYS, get } = useStorage()
const nomeUsuario = ref(get(KEYS.nomeUsuario) || 'Usuário')
const overlayAberto = ref(false)
</script>
