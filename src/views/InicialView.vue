<template>
  <GradientLayout>
    <header class="w-100 text-center py-3" style="background: linear-gradient(180deg, #9fbad6 0%);">
      <h2 class="text-primary-app fw-bold mb-0" style="font-size:22px;">SUNSET</h2>
    </header>

    <section class="d-flex justify-content-center align-items-center flex-fill flex-wrap gap-5 px-4 py-4 pb-5">
      <div class="text-center" style="max-width:500px;">
        <p class="text-primary-app lh-base mb-4" style="white-space: pre-line; font-size:16px;">{{ textoExibido }}</p>
        <RouterLink v-if="finalizado" to="/login" class="btn btn-warning fw-bold rounded-4 px-4 py-3 anim-aparecer" style="color: var(--color-primary);">
          Fazer Login
        </RouterLink>
      </div>
      <div>
        <img
          :src="imgPsicologia"
          alt="Saúde mental"
          class="rounded-3 mt-3"
          style="width:300px; transition: transform 0.3s, box-shadow 0.3s;"
          @mouseenter="e => { e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.boxShadow='0 10px 25px rgba(0,0,0,0.2)'; }"
          @mouseleave="e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }"
        />
      </div>
    </section>

    <AppFooter />
  </GradientLayout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import GradientLayout from '../components/GradientLayout.vue'
import AppFooter from '../components/AppFooter.vue'
import imgPsicologia from '../assets/images/psicologia.png'

const TEXTO = `A saúde mental é um aspecto fundamental para o bem-estar das pessoas, principalmente em um mundo cada vez mais acelerado e cheio de desafios.\n\nMuitas pessoas já realizam acompanhamento psicológico, mas nem sempre conseguem registrar ou refletir sobre seus sentimentos no dia a dia entre uma sessão e outra.\n\nPensando nisso, foi idealizado um site de acompanhamento de saúde mental voltado para pessoas que já estão em processo de terapia. O aplicativo funcionará como um suporte diário, ajudando o usuário a acompanhar seu humor, emoções e pensamentos por meio de perguntas simples respondidas todos os dias.`

const textoExibido = ref('')
const finalizado = ref(false)
let index = 0, intervalo = null

function escrever() {
  intervalo = setInterval(() => {
    if (index < TEXTO.length) { textoExibido.value += TEXTO.charAt(index++) }
    else { clearInterval(intervalo); finalizado.value = true }
  }, 25)
}

function pularAnimacao() {
  if (!finalizado.value) { clearInterval(intervalo); textoExibido.value = TEXTO; finalizado.value = true }
}

onMounted(() => { escrever(); document.addEventListener('click', pularAnimacao) })
onBeforeUnmount(() => { clearInterval(intervalo); document.removeEventListener('click', pularAnimacao) })
</script>
