<template>
  <canvas ref="canvas" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import {
  Chart, RadarController, RadialLinearScale, PointElement,
  LineElement, Filler, Tooltip, Legend,
} from 'chart.js'

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const props = defineProps({ dados: { type: Array, default: () => [6, 7, 4, 5, 6] } })
const canvas = ref(null)
let chart = null

function criarGrafico() {
  if (chart) chart.destroy()
  chart = new Chart(canvas.value, {
    type: 'radar',
    data: {
      labels: ['Ansiedade', 'Estresse', 'Sono', 'Humor', 'Foco'],
      datasets: [{
        label: 'Nível atual',
        data: props.dados,
        backgroundColor: 'rgba(231, 185, 179, 0.6)',
        borderColor: '#c97f7a',
        borderWidth: 3,
        pointBackgroundColor: '#4b3f5c',
        pointBorderColor: '#fff',
        pointRadius: 5,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0, max: 10,
          ticks: { backdropColor: 'transparent', color: '#4b3f5c', font: { size: 12 } },
          grid:        { color: 'rgba(75,63,92,0.35)' },
          angleLines:  { color: 'rgba(75,63,92,0.35)' },
          pointLabels: { color: '#4b3f5c', font: { size: 14, weight: 'bold' } },
        },
      },
    },
  })
}

onMounted(criarGrafico)
onBeforeUnmount(() => chart?.destroy())
watch(() => props.dados, criarGrafico)
</script>
