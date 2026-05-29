<template>
  <Transition name="slide-up">
    <div
      v-if="visible"
      class="position-fixed bottom-0 start-0 end-0 text-center px-4 py-4 glass-dark"
      style="border-radius: 25px 25px 0 0; box-shadow: 0 -4px 30px rgba(0,0,0,0.3); z-index: 100;"
    >
      <p class="text-white mb-2" style="font-size:15px;">💜 Se você precisa de ajuda, ligue para o CVV:</p>
      <p class="fw-black mb-1 text-warning" style="font-size:48px;">188</p>
      <p class="text-white mb-4 small" style="opacity:0.8;">Disponível 24h, todos os dias. Gratuito.</p>
      <BaseButton variant="ghost" @click="$emit('fechar')">Fechar</BaseButton>
    </div>
  </Transition>
</template>

<script setup>
import BaseButton from './BaseButton.vue'
defineProps({ visible: { type: Boolean, required: true } })
defineEmits(['fechar'])
</script>
