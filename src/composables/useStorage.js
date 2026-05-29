/**
 * Composable para acesso ao localStorage.
 * Centraliza todas as chaves usadas no app.
 */
export function useStorage() {
  const KEYS = {
    usuarioId:   'usuarioId',
    nomeUsuario: 'nomeUsuario',
    humorHoje:   'humorHoje',
    humorData:   'humorData',
    respostas:   'respostas',
  }

  const get = (key) => localStorage.getItem(key)
  const set = (key, value) => localStorage.setItem(key, String(value))
  const remove = (key) => localStorage.removeItem(key)

  return { KEYS, get, set, remove }
}
