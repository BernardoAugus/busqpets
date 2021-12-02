<template>
  <div class="col-12 row q-pa-lg">
    <div class="row no-wrap items-center col-12 text-h6 text-primary q-py-sm text-weight-ligth">
      <div class="col-auto">{{'Produtos'}}</div>
      <div class="col row justify-end">
        <q-btn icon="filter_list" flat dense></q-btn>
        <!-- <q-btn icon="shopping_cart" flat dense to="/carrinho">
          <q-badge color="red" floating>1</q-badge>
        </q-btn> -->
      </div>
    </div>
    <div class="col-12 row q-pb-md">
      <q-input outlined dense class="col-12 bg-white">
        <template v-slot:append>
          <q-btn color="primary" dense flat icon="search" />
        </template>
      </q-input>
    </div>
    <q-list class="col-12 row">
      <div v-for="(opcao, key) in produtos" :key="key" class="col-12 q-px-xs q-py-sm text-center row">
        <q-card class="col-12 items-start row q-pa-md cursor-pointer" flat style="border-radius: 10px" @click="abrirPopup = true">
          <div class="col-auto row justify-center q-mt-sm items-center">
            <q-avatar
              v-if="opcao.fotoProduto"
              size="55px"
            >
              <img :src="opcao.fotoProduto"/>
            </q-avatar>
            <q-avatar
              v-else
              class="text-center"
              color="primary"
              text-color="white"
              size="55px"
            >
              {{pegarAInicialDoOPrimeiroEUltimoNome(opcao.nome)}}</q-avatar>
          </div>
          <div class="col row">
            <div class="col-12 row q-py-xs items-center q-px-sm">
              <div class="text-weight-light row col-12 no-wrap items-center">
                <div class="col-auto text-subtitle1">{{opcao.nome}}</div>
                <div class="col row justify-end">
                  <q-img v-for="(icon, key) in opcao.especies" v-bind:key="key" :src="`icons/${icon}.png`" color="primary"
                    style="height: 16px; width: 16px; margin-left: 2px" />
                </div>
              </div>
              <div class="col-12 row items-start text-left">
                <div class="col-auto row no-wrap items-center">
                  <q-icon name="star" color="yellow" size="20px" class="q-mr-xs" />
                  <div class="text-caption text-yellow row">
                    <div class=" text-subtitle1">{{opcao.nota}}</div>
                    <div class="text-black text-subtitle1 q-pl-sm">{{` - R$ ${opcao.valor}`}}</div>
                  </div>
                </div>
                <div class="col row justify-end">
                  <!-- <q-btn v-if="opcao.qtd > 0" icon="remove" round dense outlined color="red" @click.stop="opcao.qtd -= 1" />
                  <div class="text-h6 text-weight-bold items-center q-px-md">{{opcao.qtd}}</div>
                  <q-btn icon="add" round dense outlined color="green" @click.stop="opcao.qtd += 1" /> -->
                </div>
                <div v-if="$q.platform.is.mobile" class="col-12 row">
                  <q-btn dense outlined color="primary" label="Adicionar" class="full-width q-mt-sm"/>
                </div>
              </div>
            </div>
          </div>
        </q-card>
        <div v-if="(key +1) !== produtos.length" class="q-pt-md col-12">
          <q-separator size="1px" />
        </div>
        <q-dialog v-model="abrirPopupCadastro">
          <q-card class="col-12 row q-pa-md" style="max-width: 700px">
            <div class="col-12 text-h6 text-weight-bold">{{'Cadastro Produto'}}</div>
            <div class="col-12 row ">
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-xs row q-pt-sm">
                <div class="text-grey-7">{{'Produto:'}}</div>
                <q-input v-model="produto.nome" class="col-12" outlined dense />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-xs row q-pt-sm">
                <div class="text-grey-7">{{'Valor:'}}</div>
                <q-input prefix="R$" v-model="produto.valor" class="col-12" outlined dense />
              </div>
              <div class="col-xs-12 q-pa-xs row q-pt-sm">
                <div class="text-grey-7">{{'Descrição:'}}</div>
                <q-input v-model="produto.descricao" class="col-12" outlined dense />
              </div>
            </div>
            <div class="q-pt-md col-12">
              <q-separator size="1px" />
            </div>
            <div class="col-12 row justify-end q-pt-md q-px-md">
              <div class="col q-pr-sm text-h6">
                <q-btn flat label="Cancelar" class="full-width" autogrow />
              </div>
              <div class="col q-pl-sm text-h6">
                <q-btn color="primary"  label="Cadastrar" class="full-width" />
              </div>
            </div>
          </q-card>
        </q-dialog>
        <q-dialog v-model="abrirPopup" >
          <q-card style="max-width: 700px">
            <VisualizarProduto></VisualizarProduto>
          </q-card>
        </q-dialog>
      </div>
    </q-list>
    <q-page-sticky position="bottom-right" :offset="[18, 10]">
      <q-btn fab icon="add" color="secondary" @click="abrirPopupCadastro = true"/>
    </q-page-sticky>
  </div>
</template>

<script>
  import {
    QList,
    QItem,
    QImg
  } from 'quasar';
  import VisualizarProduto from './VisualizarProduto'

  export default {
    data() {
      return {
        abrirPopupCadastro: false,
        abrirPopup: false,
        produto: {},
        produtos: [
          {
            nome: 'Ração plus',
            fotoProduto: '',
            id: 1,
            especies: ['dog', 'cat'],
            nota: 4.9,
            valor: 50.0
          },
          {
            nome: 'Ração dog care',
            fotoProduto: '',
            id: 2,
            especies: ['dog'],
            nota: 4.5,
            valor: 74.2
          },
          {
            nome: `Ração for dogs`,
            fotoProduto: '',
            id: 3,
            especies: ['dog'],
            nota: 4.5,
            valor: 24.9
          },
          {
            nome: 'Raração',
            fotoProduto: '',
            id: 4,
            especies: ['dog'],
            nota: 4.5,
            valor: 30.0
          },
          {
            nome: 'Pet food',
            fotoProduto: '',
            id: 5,
            especies: ['dog', 'cat'],
            nota: 4.5,
            valor: 33.3
          },
        ],
      }
    },
    components: {
      QList,
      QItem,
      QImg,
      VisualizarProduto
    },
    methods: {
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
    }
  }

</script>