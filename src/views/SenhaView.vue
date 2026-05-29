<template>
  <GradientLayout class="justify-content-center align-items-center">
    <div
      class="glass-light rounded-4 d-flex flex-column gap-3 text-center px-4 px-md-5 py-5"
      style="width:90%; max-width:500px; box-shadow: 0 20px 50px rgba(0,0,0,0.18);"
    >
      <div style="font-size:50px;">🔒</div>
      <h1 class="text-dark-app fw-bold mb-0" style="font-size:26px;">Sua Privacidade</h1>
      <p class="mb-0 lh-base" style="font-size:15px; color:#5f5a6b;">
        Para proteger seu histórico, insira sua senha de acesso.
      </p>
      <div class="position-relative">
        <BaseInput
          v-model="senha"
          :type="mostrarSenha ? 'text' : 'password'"
          placeholder="Digite sua senha"
        />
        <span
          class="position-absolute top-50 end-0 me-3 translate-middle-y"
          style="cursor:pointer; font-size:16px; transform: translateY(-65%);"
          @click="mostrarSenha = !mostrarSenha"
        >{{ mostrarSenha ? '🙈' : '👁️' }}</span>
      </div>
      <BaseButton @click="acessar">Acessar</BaseButton>
    </div>
  </GradientLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GradientLayout from '../components/GradientLayout.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import { useApi } from '../composables/useApi.js'
import { useStorage } from '../composables/useStorage.js'

const senha = ref('')
const mostrarSenha = ref(false)
const router = useRouter()
const { verificarSenhaGrafico } = useApi()
const { KEYS, get } = useStorage()

async function acessar() {
  if (!senha.value) { alert('Digite a senha!'); return }
  try {
    const usuarioId = parseInt(get(KEYS.usuarioId))
    await verificarSenhaGrafico(usuarioId, senha.value)
    router.push('/grafico')
  } catch (e) { alert('Senha incorreta.') }
}
</script>