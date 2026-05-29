<template>
  <GradientLayout class="justify-content-center align-items-center">
    <AuthCard title="Login">
      <BaseInput v-model="cpf" placeholder="CPF" />
      <BaseInput v-model="senha" type="password" placeholder="Senha" />
      <BaseButton @click="entrar">Entrar</BaseButton>
      <p class="mt-3 small text-primary-app text-center mb-0">
        Não tem conta?
        <RouterLink to="/cadastro" class="text-primary-app fw-bold">Cadastrar</RouterLink>
      </p>
    </AuthCard>
  </GradientLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GradientLayout from '../components/GradientLayout.vue'
import AuthCard from '../components/AuthCard.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import { useApi } from '../composables/useApi.js'
import { useStorage } from '../composables/useStorage.js'

const cpf = ref('')
const senha = ref('')
const router = useRouter()
const { login } = useApi()
const { KEYS, set } = useStorage()

async function entrar() {
  if (!cpf.value || !senha.value) { alert('Preencha CPF e senha!'); return }
  try {
    const resultado = await login(cpf.value, senha.value)
    set(KEYS.usuarioId, resultado.usuarioId)
    set(KEYS.nomeUsuario, resultado.apelido)
    alert(resultado.mensagem)
    router.push('/nome')
  } catch (e) { alert(e.message) }
}
</script>
