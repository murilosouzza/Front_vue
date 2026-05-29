<template>
  <GradientLayout>
    <PageHeader title="Relatório Diário" back-to="/home" />

    <div class="mx-auto px-3 pb-5 d-flex flex-column gap-4" style="max-width:900px; padding-top:4px;">
      <PerguntaEscala :numero="1" texto="Como foi a qualidade do seu sono essa noite?" v-model="respostas.sono" />
      <hr class="border-0 m-0" style="height:1px; background: rgba(255,255,255,0.4);" />

      <PerguntaBotoes :numero="2" texto="Você tomou sua medicação conforme a prescrição hoje?" v-model="respostas.medicacao" />
      <hr class="border-0 m-0" style="height:1px; background: rgba(255,255,255,0.4);" />

      <PerguntaEscala :numero="3" texto="Sentiu-se disposto para realizar suas tarefas hoje?" v-model="respostas.disposicao" />
      <hr class="border-0 m-0" style="height:1px; background: rgba(255,255,255,0.4);" />

      <PerguntaBotoes :numero="4" texto="Sentiu algum aperto no peito ou preocupação excessiva?" v-model="respostas.ansiedade" />
      <hr class="border-0 m-0" style="height:1px; background: rgba(255,255,255,0.4);" />

      <div>
        <p class="text-white mb-3" style="font-size:18px;">5. Aconteceu algo fora do comum que afetou seu humor?</p>
        <input
          v-model="respostas.relato"
          class="input-app"
          type="text"
          placeholder="Conte-nos um pouco sobre o que aconteceu..."
        />
      </div>

      <BaseButton variant="yellow" @click="enviar">Enviar Relatório</BaseButton>
    </div>

    <!-- Notificação -->
    <Transition name="notif">
      <div
        v-if="sucesso"
        class="position-fixed top-0 end-0 mt-3 me-3 rounded-3 px-4 py-3 text-white fw-semibold"
        style="background: var(--color-primary);"
      >✔ Resposta enviada!</div>
    </Transition>
  </GradientLayout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import GradientLayout from '../components/GradientLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import PerguntaEscala from '../components/PerguntaEscala.vue'
import PerguntaBotoes from '../components/PerguntaBotoes.vue'
import BaseButton from '../components/BaseButton.vue'
import { useApi } from '../composables/useApi.js'
import { useStorage } from '../composables/useStorage.js'

const router = useRouter()
const { salvarPesquisa } = useApi()
const { KEYS, get, set } = useStorage()
const sucesso = ref(false)

const respostas = reactive({ sono: null, medicacao: null, disposicao: null, ansiedade: null, relato: '' })

async function enviar() {
  if (respostas.sono === null || respostas.medicacao === null || respostas.disposicao === null || respostas.ansiedade === null) {
    alert('Responda todas as perguntas antes de enviar!'); return
  }
  const dados = {
    usuarioId: parseInt(get(KEYS.usuarioId)) || 0,
    qualidadeSono: respostas.sono, medicacao: respostas.medicacao,
    disposicao: respostas.disposicao, ansiedade: respostas.ansiedade, relato: respostas.relato,
  }
  try {
    await salvarPesquisa(dados)
    set(KEYS.respostas, JSON.stringify(dados))
    sucesso.value = true
    setTimeout(() => { sucesso.value = false; router.push('/home') }, 2000)
  } catch (e) { alert('Erro ao conectar com o servidor.'); console.error(e) }
}
</script>
