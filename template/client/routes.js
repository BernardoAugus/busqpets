// Import the router
//import { RouterFactory } from 'meteor/akryum:vue-router2'
// Components
import Home from '/imports/ui/Home.vue'
import Session from '/imports/ui/Session.vue'
import Help from '/imports/ui/Help.vue'
import Login from '/imports/ui/Login.vue'
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
  },
];

module.exports = {
    routes: routes,
};
