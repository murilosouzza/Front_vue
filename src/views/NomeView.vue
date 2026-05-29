<template>
  <GradientLayout class="justify-content-center align-items-center">
    <div
      class="glass-white rounded-4 shadow-lg d-flex flex-column gap-3 text-center px-4 px-md-5 py-5"
      style="width:90%; max-width:500px;"
    >
      <h1 class="text-mid-app fw-bold lh-sm" style="font-size:26px;">
        Como você gostaria de<br />ser chamado?
      </h1>
      <p class="text-mid-app lh-base mb-0" style="font-size:15px;">
        Suas informações são privadas e seguras conosco.
        Escolha um nome ou apelido para personalizarmos sua jornada de bem-estar.
      </p>
      <BaseInput v-model="nome" placeholder="Nome ou apelido" />
      <BaseButton @click="continuar">Continuar <span class="ms-2">→</span></BaseButton>
      <span class="text-mid-app small" style="opacity:0.8;">🔒 Seus dados estão protegidos</span>
    </div>
  </GradientLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GradientLayout from '../components/GradientLayout.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import { useStorage } from '../composables/useStorage.js'

const nome = ref('')
const router = useRouter()
const { KEYS, set } = useStorage()

function continuar() {
  if (!nome.value.trim()) { alert('Digite seu nome ou apelido!'); return }
  set(KEYS.nomeUsuario, nome.value.trim())
  router.push('/home')
}
</script>
