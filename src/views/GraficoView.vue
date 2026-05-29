<template>
  <GradientLayout>
    <PageHeader
      title="Mapa de Humor"
      subtitle="Sua jornada emocional nos últimos 30 dias"
      back-to="/home"
    />

    <div class="flex-fill d-flex justify-content-center align-items-center p-4">
      <canvas ref="canvasProxy" style="width:80% !important; height:60vh !important; max-width:900px;" />
    </div>

    <footer
      class="text-center py-3 small text-dark-app position-sticky bottom-0"
      style="background: linear-gradient(#f5d491fb 100%); backdrop-filter: blur(10px);"
    >🔒 Seus dados estão protegidos</footer>
  </GradientLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GradientLayout from '../components/GradientLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import { useApi } from '../composables/useApi.js'
import { useStorage } from '../composables/useStorage.js'

import {
  Chart, BarController, BarElement, CategoryScale,
  LinearScale, Tooltip, Legend,
} from 'chart.js'
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const { buscarPesquisas } = useApi()
const { KEYS, get } = useStorage()
const canvasProxy = ref(null)
const DADOS_PADRAO = [3, 3, 3, 3, 3]
let chart = null

onMounted(async () => {
  let dados = DADOS_PADRAO
  const usuarioId = get(KEYS.usuarioId)
  if (usuarioId) {
    try {
      const pesquisas = await buscarPesquisas(usuarioId)
      if (pesquisas.length) {
        const media = (campo) => {
          const vals = pesquisas.map(p => p[campo]).filter(v => typeof v === 'number')
          return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 3
        }
        const mapearSimNao = (campo) => {
          const vals = pesquisas.map(p => p[campo])
          const sim = vals.filter(v => v?.includes('Sim')).length
          return Math.round((sim / vals.length) * 10)
        }
       dados = [
          media('qualidadeSono'),           // Sono — 5 é bom
          mapearSimNao('ansiedade'),        // Ansiedade — Sim é ruim
          media('disposicao'),              // Disposição — 5 é bom
          mapearSimNao('medicacao'),        // Medicação — Sim é bom
          10 - mapearSimNao('ansiedade'),   // Foco — inverso da ansiedade
]
      }
    } catch (e) { console.error(e) }
  }

  chart = new Chart(canvasProxy.value, {
    type: 'bar',
    data: {
      labels: ['Sono', 'Ansiedade', 'Disposição', 'Medicação', 'Foco'],
      datasets: [{
        label: 'Nível atual',
        data: dados,
        backgroundColor: [
          'rgba(155, 181, 209, 0.8)',
          'rgba(231, 185, 179, 0.8)',
          'rgba(249, 216, 149, 0.8)',
          'rgba(108, 91, 123, 0.8)',
          'rgba(201, 127, 122, 0.8)',
        ],
        borderColor: [
          '#6b8fa8',
          '#c97f7a',
          '#c9a84c',
          '#4b3f5c',
          '#a05a56',
        ],
        borderWidth: 2,
        borderRadius: 10,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          min: 0,
          max: 10,
          ticks: { color: '#4b3f5c', font: { size: 12 } },
          grid: { color: 'rgba(75,63,92,0.15)' },
        },
        x: {
          ticks: { color: '#4b3f5c', font: { size: 13, weight: 'bold' } },
          grid: { display: false },
        },
      },
    },
  })
})
</script>