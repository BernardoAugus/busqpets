<template name="appLayout">
  <q-layout ref="layout" view="LHr lpR lFr">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          v-if="!$route.path.includes('login') && !$route.path.includes('cadastro') && $route.path !== '/'"
          flat round dense
          @click="showLeft = !showLeft"
          icon="menu"
        />
        <q-toolbar-title class="row no-wrap justify-between">
          <div>{{'Busqpets'}}</div>
          <div>
            <q-btn-dropdown v-if="!$route.path.includes('login') && !$route.path.includes('cadastro') && $route.path !== '/'" color="white" auto-close icon="person" flat dense>
              <q-list>
                <q-item class="items-center" to="/dados-pessoais">
                  {{'Meu Perfil'}}
                </q-item>
                <q-separator/>
                <q-item v-if="liberarParaPerfilCosumidor()" class="items-center" to="/meus-pets">
                  {{'Meus pets'}}
                </q-item>
                <q-separator/>
                <q-item class="items-center" to="/login">
                  {{'Sair'}}
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs>
        <q-route-tab slot="title" icon="save" to="/" replace label="PubSub" />
        <q-route-tab slot="title" icon="alarm" to="/session" replace label="Session" />
        <q-route-tab slot="title" icon="help" to="/help" replace label="Help" />
      </q-tabs>
    </q-header>
    <q-drawer
      side="left"
      v-model="showLeft"
      overlay
    >
      <q-list
        no-border
        link
        inset-separator
        class="q-pt-sm"
      >
        <q-item class="text-h6 justify-center">{{'Menu'}}</q-item>
        <q-separator></q-separator>
        <div v-for="(opcao, key) in setarLista()" :key="key" >
          <q-item clickable :to="opcao.ir_para" :class="estaNaRota(opcao.ir_para) ? 'bg-blue-1' : 'bg-white'">
            <q-item-section avatar>
              <q-icon color="primary" size="34px" :name="opcao.icone" />
            </q-item-section>
            <q-item-section class="text-subtitle1">{{opcao.nome}}</q-item-section>
          </q-item>
          <q-separator size="1px"/>
        </div>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view class="bg-grey-1"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
  import { QLayout, QHeader, QFooter, QDrawer, QToolbar, QToolbarTitle, QTabs, QRouteTab, QBtn, QIcon, QItem, QItemLabel, QItemSection, QList, QPageContainer, QSeparator, QBtnDropdown } from 'quasar';
  import "@quasar/extras/material-icons/material-icons.css";
  import "quasar/dist/quasar.min.css";

  export default {
    components: {
      QLayout,
      QHeader,
      QFooter,
      QDrawer,
      QToolbar,
      QToolbarTitle,
      QTabs,
      QRouteTab,
      QBtn,
      QIcon,
      QItem,
      QItemLabel,
      QItemSection,
      QList,
      QPageContainer,
      QSeparator,
      QBtnDropdown
    },
    data: function () {
      return {
        showLeft: false,
        showRight: false,
        fornecedor: true,
        lista_menu: [],
        usuarioLogado: this.$store.state.user?.user?.profile?.tipo || 1
      }
    },
    props: {
      uiid: 'mat'
    },

    watch: {
      usuarioLogado: function(val) {
        console.log(val)
      }
    },
    mounted() {
      console.log(this.$store.state.user?.user?.profile?.tipo, 'this.$store.state.user?.user?.profile?.tipo')
    },
    methods: {
      setarLista() {
        return this.$store.state.user?.user?.profile?.tipo === 1 ? [
          {
            ir_para: '/dashboards',
            nome: 'Dashboards',
            icone: 'dashboard'
          },
          {
            ir_para: '/produtos',
            nome: 'Minha Loja',
            icone: 'business'
          },
          {
            ir_para: '/meus-pedidos',
            nome: 'Pedidos',
            icone: 'list'
          }
        ] : [
          {
            ir_para: '/produtos',
            nome: 'Produtos',
            icone: 'home'
          },
          {
            ir_para: '/carrinho',
            nome: 'Carrinho',
            icone: 'shopping_cart'
          },
          {
            ir_para: '/meus-pedidos',
            nome: 'Pedidos',
            icone: 'list'
          }

        ]
      },

      estaNaRota (rota) {
        return this.$route.path.includes(rota)
      },

      pegarAInicialDoOPrimeiroEUltimoNome (texto) {
        if (texto) {
          let texto2 = '';
          texto2 = texto.toString().trim();
          if (texto2.indexOf(' ') >= 0) {
            let textos = [];
            textos = texto2.split(' ');
            let qtdTextos = 0;
            qtdTextos = textos.length;
            const iniciais = textos[0][0] + textos[qtdTextos - 1][0];
            return (iniciais).toUpperCase()
          } else {
            return ((texto2[0] + texto2[1]).toUpperCase())
          }
        }
      },

      liberarParaPerfilCosumidor () {
        return this.$store.state.user?.user?.profile?.tipo === 2
      }
    }
  }
</script>
