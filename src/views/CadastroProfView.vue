<template>
  <GradientLayout class="justify-content-center align-items-center">
    <AuthCard title="Cadastro de Paciente">
      <BaseInput v-model="form.nome" placeholder="Nome completo" />
      <BaseInput v-model="form.email" type="email" placeholder="E-mail" />
      <BaseInput v-model="form.cpf" placeholder="CPF" />
      <BaseInput v-model="form.senha" type="password" placeholder="Senha de login" />
      <BaseInput v-model="form.senhaGrafico" type="password" placeholder="Senha do gráfico" />
      <BaseInput v-model="form.fotoPerfil" placeholder="URL da foto de perfil (opcional)" />
      <BaseButton @click="cadastrar">Cadastrar Paciente</BaseButton>
      <p class="mt-3 small text-primary-app text-center mb-0">🔒 Dados protegidos</p>
    </AuthCard>
  </GradientLayout>
</template>

<script setup>
import { reactive } from 'vue'
import GradientLayout from '../components/GradientLayout.vue'
import AuthCard from '../components/AuthCard.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import { useApi } from '../composables/useApi.js'

const form = reactive({ nome: '', email: '', cpf: '', senha: '', senhaGrafico: '', fotoPerfil: '' })
const { cadastro } = useApi()

async function cadastrar() {
  if (!form.nome || !form.email || !form.cpf || !form.senha || !form.senhaGrafico) {
    alert('Preencha todos os campos obrigatórios!')
    return
  }
  try {
    const resultado = await cadastro(form)
    alert(resultado.mensagem)
    form.nome = ''; form.email = ''; form.cpf = ''; form.senha = ''; form.senhaGrafico = ''; form.fotoPerfil = ''
  } catch (e) { alert(e.message) }
}
</script>