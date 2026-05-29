import { createRouter, createWebHashHistory } from 'vue-router'

import InicialView      from '../views/InicialView.vue'
import LoginView        from '../views/LoginView.vue'
import CadastroView     from '../views/CadastroView.vue'
import CadastroProfView from '../views/CadastroProfView.vue'
import NomeView         from '../views/NomeView.vue'
import HomeView         from '../views/HomeView.vue'
import ChecagemView     from '../views/ChecagemView.vue'
import PerguntasView    from '../views/PerguntasView.vue'
import SenhaView        from '../views/SenhaView.vue'
import GraficoView      from '../views/GraficoView.vue'
import ProntuarioView   from '../views/ProntuarioView.vue'

const routes = [
  { path: '/',              name: 'Inicial',      component: InicialView      },
  { path: '/login',         name: 'Login',        component: LoginView        },
  { path: '/cadastro',      name: 'Cadastro',     component: CadastroView     },
  { path: '/cadastro-prof', name: 'CadastroProf', component: CadastroProfView },
  { path: '/nome',          name: 'Nome',         component: NomeView         },
  { path: '/home',          name: 'Home',         component: HomeView         },
  { path: '/checagem',      name: 'Checagem',     component: ChecagemView     },
  { path: '/perguntas',     name: 'Perguntas',    component: PerguntasView    },
  { path: '/senha',         name: 'Senha',        component: SenhaView        },
  { path: '/grafico',       name: 'Grafico',      component: GraficoView      },
  { path: '/prontuario',    name: 'Prontuario',   component: ProntuarioView   },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})