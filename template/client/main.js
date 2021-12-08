
//quasar framework is based on vuejs
import Vue from 'vue';
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router';
import {routes} from './routes';
import AppLayout from '/imports/ui/AppLayout.vue';
import Quasar from 'quasar';
import mitt from 'mitt'

// vuex modules
import user from '../store/user'
import produto from '../store/produto'
import carrinho from '../store/carrinho'
const bus = mitt()
export { bus }

// vue-router
Vue.use(VueRouter);
const router = new VueRouter({
    routes // short for `routes: routes`
});

// vuex
Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
const store = new Vuex.Store({
  modules: {
    user,
    produto,
    carrinho
  },
  plugins: [vuexLocal.plugin]
})


//App start
Meteor.startup(() => {
    Vue.use(Quasar, {});
    new Vue({
        router: router,
        store,
        render: h => h(AppLayout),
    }).$mount('app');
});

