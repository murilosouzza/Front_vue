/**
 * Composable com chamadas à API do backend.
 */
const BASE_URL = 'http://localhost:5123/api'

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.mensagem || 'Erro na requisição')
  return data
}

export function useApi() {
  const login = (cpf, senha) =>
    request('/Auth/login', {
      method: 'POST',
      body: JSON.stringify({ cpf, senha, email: '' }),
    })

  const cadastro = (dados) =>
    request('/Auth/cadastro', {
      method: 'POST',
      body: JSON.stringify(dados),
    })

  const verificarSenhaGrafico = (usuarioId, senha) =>
    request('/Auth/verificarSenhaGrafico', {
      method: 'POST',
      body: JSON.stringify({ usuarioId, senha }),
    })

  const salvarAvaliacao = (usuarioId, humor) =>
    request('/Avaliacao', {
      method: 'POST',
      body: JSON.stringify({ usuarioId: parseInt(usuarioId), humor }),
    })

  const salvarPesquisa = (dados) =>
    request('/Pesquisa', {
      method: 'POST',
      body: JSON.stringify(dados),
    })

  const buscarPesquisas = (usuarioId) =>
    request(`/Pesquisa/${usuarioId}`)

  return { login, cadastro, verificarSenhaGrafico, salvarAvaliacao, salvarPesquisa, buscarPesquisas }
}