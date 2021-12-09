// Import the router
//import { RouterFactory } from 'meteor/akryum:vue-router2'
// Components
import Home from '/imports/ui/Home.vue'
import Session from '/imports/ui/Session.vue'
import Help from '/imports/ui/Help.vue'
import Login from '/imports/ui/Login.vue'
import EsqueciMinhaSenha from '/imports/ui/EsqueciMinhaSenha.vue'
import Cadastro from '/imports/ui/Cadastro.vue'
import Carrinho from '/imports/ui/Carrinho.vue'
import Pedidos from '/imports/ui/Pedidos.vue'
import VisualizarPedido from '/imports/ui/VisualizarPedido.vue'
import Dashboards from '/imports/ui/Dashboards.vue'
/*
RouterFactory.configure(factory => {
    // Simple routes
    factory.addRoutes([
      {
          path: '/',
          name: 'home',
          component: Home,
      },
      {
          path: '/session',
          name: 'session',
          component: Session,
      },
      {
          path: '/help',
          name: 'help',
          component: Help,
      },
    ])
})
*/
let routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/dados-pessoais',
    name: 'dados-pessoais',
    component: () => import('/imports/ui/DadosPessoais.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/meus-pets',
    name: 'meus-pets',
    component: () => import('/imports/ui/MeusPets.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: () => import('/imports/ui/Produtos.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:product/stores/:idStore',
    component: () => import('/imports/ui/Loja.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/inicio',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/session',
    name: 'session',
    component: Session,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/help',
    name: 'help',
    component: Help,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      login: true,
    },
  },
  {
    path: '/esqueci-minha-senha',
    name: 'esqueci-minha-senha',
    component: EsqueciMinhaSenha,
    meta: {
      login: true,
    },
  },
  {
    path: '/novo-cadastro',
    name: 'novo-cadastro',
    component: Cadastro,
    meta: {
      login: true,
    },
  },
  {
    path: '/carrinho',
    name: 'carrinho',
    component: Carrinho,
    meta: {
      login: true,
      requiresAuth: true
    },
  },
  {
    path: '/meus-pedidos',
    name: 'meus-pedidos',
    component: Pedidos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/meus-pedidos/:id',
    name: 'visualizar-pedido',
    component: VisualizarPedido,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboards',
    name: 'dashboards',
    component: Dashboards,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:everything',
    name: 'everything',
    component: Login,
    meta: {
      requiresAuth: true
    }
  },
];

module.exports = {
    routes: routes,
};
