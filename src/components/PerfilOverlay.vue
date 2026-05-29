<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style="background: rgba(30,20,50,0.35); backdrop-filter: blur(8px); z-index: 999;"
      @click.self="$emit('fechar')"
    >
      <div
        class="position-relative text-center rounded-4 glass pb-4"
        style="width: calc(100% - 48px); max-width: 360px;"
      >
        <!-- Close -->
        <button
          class="btn position-absolute top-0 end-0 mt-3 me-3 rounded-circle d-flex align-items-center justify-content-center p-0 border-0"
          style="width:30px; height:30px; background: rgba(255,255,255,0.5); color:#5a4a6a; font-size:18px;"
          @click="$emit('fechar')"
        >×</button>

        <!-- Avatar -->
        <div class="d-flex justify-content-center" style="margin-top: -44px; margin-bottom:14px;">
          <div
            class="rounded-circle overflow-hidden d-flex align-items-center justify-content-center border border-4 border-white"
            style="width:90px; height:90px; background: rgba(200,215,235,0.7); cursor:pointer; font-size:36px;"
            @click="fileInput.click()"
          >
            <img v-if="fotoSrc" :src="fotoSrc" alt="foto" class="w-100 h-100 object-fit-cover" />
            <span v-else>👤</span>
          </div>
        </div>

        <strong class="d-block mb-1 text-mid-app" style="font-size:20px;">{{ nome }}</strong>
        <p class="text-muted small mb-4">Toque na foto para alterar</p>

        <div class="d-flex flex-column gap-2 px-3">
          <button
            v-for="label in ['Tirar foto', 'Escolher da galeria']"
            :key="label"
            class="btn rounded-pill py-3 fw-bold text-mid-app border-0"
            style="background: rgba(255,255,255,0.45); font-size:14px;"
            @click="fileInput.click()"
          >{{ label }}</button>
          <button
            class="btn rounded-pill py-3 fw-bold text-mid-app border-0"
            style="background: rgba(255,255,255,0.45); font-size:14px;"
            @click="removerFoto"
          >Remover foto</button>
        </div>

        <button
          v-if="fotoAlterada"
          class="btn rounded-pill mt-3 px-4 py-3 fw-bold text-white border-0"
          style="background: rgba(155,181,209,0.85);"
          @click="salvarFoto"
        >Salvar foto ✓</button>

        <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="handleFile" />
      </div>
    </div>
  </Transition>

  <!-- Toast -->
  <Transition name="toast">
    <div
      v-if="toastMsg"
      class="position-fixed rounded-pill px-4 py-2 text-white"
      style="bottom:28px; left:50%; transform:translateX(-50%); background: rgba(75,63,92,0.9); z-index:1000; font-family: var(--font-family);"
    >{{ toastMsg }}</div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ visible: { type: Boolean, required: true }, nome: { type: String, default: '' } })
const emit = defineEmits(['fechar'])

const fileInput = ref(null)
const fotoSrc = ref('')
const fotoAlterada = ref(false)
const toastMsg = ref('')

function handleFile(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    fotoSrc.value = ev.target.result
    fotoAlterada.value = true
    showToast('Foto selecionada!')
  }
  reader.readAsDataURL(file)
}

function removerFoto() { fotoSrc.value = ''; fotoAlterada.value = false; showToast('Foto removida') }
function salvarFoto() { showToast('✓ Foto salva!'); fotoAlterada.value = false; setTimeout(() => emit('fechar'), 900) }

let toastTimer = null
function showToast(msg) {
  toastMsg.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMsg.value = '' }, 2200)
}
</script>
