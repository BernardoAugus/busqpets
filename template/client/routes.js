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
    name: '',
    component: Home
  },
  {
    path: '/dados-pessoais',
    name: 'dados-pessoais',
    component: () => import('/imports/ui/DadosPessoais.vue')
  },
  {
    path: '/meus-pets',
    name: 'meus-pets',
    component: () => import('/imports/ui/MeusPets.vue')
  },
  {
    path: '/:product/stores',
    component: () => import('/imports/ui/CategoriaProduto.vue'),
  },
  {
    path: '/:product/stores/:idStore',
    component: () => import('/imports/ui/Loja.vue'),
  },
  {
    path: '/inicio',
    name: 'home',
    component: Home
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
      },
  }
];

module.exports = {
    routes: routes,
};
