<template>
  <GradientLayout class="justify-content-center align-items-center">
    <AuthCard title="Cadastro">
      <BaseInput v-model="form.nome"  placeholder="Nome completo" />
      <BaseInput v-model="form.email" type="email" placeholder="E-mail" />
      <BaseInput v-model="form.cpf"   placeholder="CPF" />
      <BaseInput v-model="form.senha" type="password" placeholder="Senha" />
      <BaseButton @click="cadastrar">Cadastrar</BaseButton>
      <p class="mt-3 small text-primary-app text-center mb-0">
        Já tem conta?
        <RouterLink to="/login" class="text-primary-app fw-bold">Fazer login</RouterLink>
      </p>
    </AuthCard>
  </GradientLayout>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import GradientLayout from '../components/GradientLayout.vue'
import AuthCard from '../components/AuthCard.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import { useApi } from '../composables/useApi.js'

const form = reactive({ nome: '', email: '', cpf: '', senha: '' })
const router = useRouter()
const { cadastro } = useApi()

async function cadastrar() {
  if (!form.nome || !form.email || !form.cpf || !form.senha) { alert('Preencha todos os campos!'); return }
  try {
    const resultado = await cadastro(form)
    alert(resultado.mensagem)
    router.push('/login')
  } catch (e) { alert(e.message) }
}
</script>
