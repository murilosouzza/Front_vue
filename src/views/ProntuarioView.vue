<template>
  <div class="tela-fundo min-vh-100 pb-5">

    <!-- HEADER -->
    <div class="d-flex align-items-center gap-3 px-4 pt-5 pb-3">
      <h1 class="mb-0 fw-bold fs-3" style="color:#4b3f5c">📋 Prontuários</h1>
    </div>

    <!-- LISTA DE PACIENTES -->
    <div v-if="!pacienteSelecionado" class="px-3">
      <p class="mb-3 px-1" style="color:#6b5e7a">Selecione um paciente:</p>
      <div v-if="carregando" class="text-center py-5" style="color:#6b5e7a">Carregando...</div>
      <div
        v-for="paciente in pacientes" :key="paciente.id"
        class="card card-paciente d-flex flex-row align-items-center gap-3 p-3 mb-3"
        @click="abrirProntuario(paciente.id)" style="cursor:pointer"
      >
        <img :src="paciente.fotoPerfil || 'https://ui-avatars.com/api/?name=' + paciente.nome + '&background=FFD166&color=6C5B7B'"
          class="rounded-circle" width="52" height="52" style="object-fit:cover;border:2px solid #FFD166" />
        <div class="flex-fill">
          <div class="fw-bold" style="color:#4b3f5c">{{ paciente.nome }}</div>
          <div class="small text-muted">{{ paciente.email }}</div>
        </div>
        <span style="color:#6b5e7a;font-size:22px">›</span>
      </div>
    </div>

    <!-- PRONTUÁRIO DO PACIENTE -->
    <div v-else class="px-3">

      <button class="btn btn-sm mb-3 fw-bold" style="color:#6b5e7a;background:rgba(255,255,255,0.5);border-radius:20px" @click="pacienteSelecionado = null">
        ‹ Voltar
      </button>

      <div class="card card-custom d-flex flex-row align-items-center gap-3 p-4 mb-3">
        <img :src="prontuario.paciente.fotoPerfil || 'https://ui-avatars.com/api/?name=' + prontuario.paciente.nome + '&background=FFD166&color=6C5B7B'"
          class="rounded-circle" width="72" height="72" style="object-fit:cover;border:3px solid #FFD166" />
        <div>
          <h2 class="fw-bold mb-0" style="color:#4b3f5c">{{ prontuario.paciente.nome }}</h2>
          <p class="mb-0 small text-muted">{{ prontuario.paciente.email }}</p>
        </div>
      </div>

      <div class="card card-custom p-4 mb-3">
        <h5 class="fw-bold mb-3" style="color:#4b3f5c">😊 Histórico de Humor</h5>
        <div class="d-flex flex-wrap gap-2">
          <div v-for="(av, i) in prontuario.avaliacoes" :key="i"
            class="d-flex flex-column align-items-center p-2 rounded-3"
            style="background:rgba(255,255,255,0.6);min-width:70px">
            <span style="font-size:1.4rem">{{ emojiHumor(av.humor) }}</span>
            <span class="fw-bold small" style="color:#4b3f5c">{{ av.humor }}</span>
            <span class="text-muted" style="font-size:10px">{{ formatarData(av.data) }}</span>
          </div>
          <div v-if="prontuario.avaliacoes.length === 0" class="text-muted small">Nenhum registro ainda.</div>
        </div>
      </div>

      <div class="card card-custom p-4 mb-3">
        <h5 class="fw-bold mb-3" style="color:#4b3f5c">📊 Relatórios Diários</h5>
        <div v-for="(p, i) in prontuario.pesquisas" :key="i" class="relatorio-item mb-3 p-3 rounded-3">
          <div class="fw-bold small mb-2" style="color:#4b3f5c">{{ formatarData(p.data) }}</div>
          <div class="d-flex flex-wrap gap-2">
            <span class="badge-info">💤 Sono: {{ p.qualidadeSono }}/5</span>
            <span class="badge-info">💊 Medicação: {{ p.medicacao }}</span>
            <span class="badge-info">⚡ Disposição: {{ p.disposicao }}/5</span>
            <span class="badge-info">😰 Ansiedade: {{ p.ansiedade }}</span>
          </div>
          <div v-if="p.relato" class="mt-2 p-2 rounded-2 fst-italic small" style="background:rgba(255,255,255,0.5);color:#6b5e7a">
            "{{ p.relato }}"
          </div>
        </div>
        <div v-if="prontuario.pesquisas.length === 0" class="text-muted small">Nenhum relatório ainda.</div>
      </div>

      <div class="card card-custom p-4 mb-3 text-center">
        <h5 class="fw-bold mb-3" style="color:#4b3f5c">📈 Mapa de Humor</h5>
        <div style="width:100%;height:300px;position:relative">
          <canvas ref="barCanvas"></canvas>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const BASE_URL = 'http://localhost:5123/api'

export default {
  name: 'ProntuarioView',
  data() {
    return { pacientes: [], pacienteSelecionado: null, prontuario: null, carregando: false, grafico: null }
  },
  async mounted() { await this.carregarPacientes() },
  beforeUnmount() { if (this.grafico) this.grafico.destroy() },
  methods: {
    async carregarPacientes() {
      this.carregando = true
      try { const res = await fetch(`${BASE_URL}/Prontuario`); this.pacientes = await res.json() }
      catch (e) { console.error(e) }
      finally { this.carregando = false }
    },

    async abrirProntuario(id) {
      this.carregando = true
      try {
        const res = await fetch(`${BASE_URL}/Prontuario/${id}`)
        this.prontuario = await res.json()
        this.pacienteSelecionado = id
        this.$nextTick(() => this.criarGrafico())
      } catch (e) { console.error(e) }
      finally { this.carregando = false }
    },

    criarGrafico() {
      if (this.grafico) this.grafico.destroy()
      const pesquisas = this.prontuario.pesquisas
      if (!pesquisas || pesquisas.length === 0) return

      const media = (campo) => {
        const v = pesquisas.map(p => p[campo]).filter(x => typeof x === 'number')
        return v.length > 0 ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : 3
      }
      const mapearSimNao = (campo) => {
        const v = pesquisas.map(p => p[campo])
        return Math.round((v.filter(x => x && x.includes('Sim')).length / v.length) * 10)
      }

     const dados = [
            media('qualidadeSono'),
            mapearSimNao('ansiedade'),
            media('disposicao'),
            mapearSimNao('medicacao'),
            10 - mapearSimNao('ansiedade')
        ]

      this.grafico = new Chart(this.$refs.barCanvas, {
        type: 'bar',
        data: {
          labels: ['Sono', 'Ansiedade', 'Disposição', 'Medicação', 'Foco'],
          datasets: [{
            label: 'Média',
            data: dados,
            backgroundColor: ['rgba(155,181,209,0.8)', 'rgba(231,185,179,0.8)', 'rgba(249,216,149,0.8)', 'rgba(108,91,123,0.8)', 'rgba(201,127,122,0.8)'],
            borderColor: ['#6b8fa8', '#c97f7a', '#c9a84c', '#4b3f5c', '#a05a56'],
            borderWidth: 2,
            borderRadius: 10,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { min: 0, max: 10, ticks: { color: '#4b3f5c' }, grid: { color: 'rgba(75,63,92,0.15)' } },
            x: { ticks: { color: '#4b3f5c', font: { size: 13, weight: 'bold' } }, grid: { display: false } }
          }
        }
      })
    },

    emojiHumor(humor) {
      const map = { 'Muito bem': '😄', 'Bem': '😊', 'Neutro': '😐', 'Mal': '😔', 'Muito mal': '😢' }
      return map[humor] || '😐'
    },

    formatarData(data) { return new Date(data).toLocaleDateString('pt-BR') }
  }
}
</script>

<style scoped>
.tela-fundo { background: linear-gradient(180deg, #9bb5d1 0%, #f7c5c5 50%, #f9d895 100%); }
.card-paciente { background: rgba(255,255,255,0.6); border-radius: 20px; border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: transform 0.2s; }
.card-paciente:hover { transform: scale(1.02); }
.card-custom { background: rgba(255,255,255,0.55); border-radius: 20px; border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
.relatorio-item { background: rgba(255,255,255,0.4); border-left: 3px solid #F4A261; }
.badge-info { background: rgba(108,91,123,0.15); color: #4b3f5c; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
</style>