<template>
  <div class="col-12 row bg-white">
    <q-list class="col-12 row">
      <q-card class="col-12 items-start row q-pa-md cursor-pointer" flat style="border-radius: 10px">
        <q-btn round color="red" icon="close" class="absolute-top-right" style="top: -0px" v-close-popup/>
        <div class="col-auto row justify-center q-mt-sm items-center">
          <q-avatar
            v-if="produto.fotoProduto"
            size="55px"
          >
            <img :src="produto.fotoProduto"/>
          </q-avatar>
          <q-avatar
            v-else
            class="text-center"
            color="primary"
            text-color="white"
            size="55px"
          >
            {{pegarAInicialDoOPrimeiroEUltimoNome(produto.nome)}}</q-avatar>
        </div>
        <div class="col row">
          <div class="col-12 row q-py-xs items-center q-px-sm">
            <div class="text-weight-light row col-12 no-wrap items-center">
              <div class="col-auto text-subtitle1">{{produto.nome}}</div>
              <div class="col row justify-end q-pr-lg">
                <q-img v-for="(icon, key) in produto.especies" v-bind:key="key" :src="`icons/${icon}.png`" color="primary"
                  style="height: 16px; width: 16px; margin-left: 2px" />
              </div>
            </div>
            <div class="col-12 row items-start text-left">
              <div class="col-auto row no-wrap items-center">
                <q-icon name="star" color="yellow" size="20px" class="q-mr-xs" />
                <div class="text-caption text-yellow row">
                  <div class=" text-subtitle1">{{produto.nota}}</div>
                  <div class="text-black text-subtitle1 q-pl-sm">{{` - R$ ${produto.valor}`}}</div>
                </div>
              </div>
              <div v-if="$q.platform.is.mobile" class="col-12 row">
                <q-btn dense outlined color="primary" label="Adicionar" class="full-width q-mt-sm"/>
              </div>
            </div>
          </div>
        </div>
        <div class="q-pt-md col-12">
          <q-separator size="1px" />
        </div>
        <div class="col-12 row q-pa-sm">
          <div class="col-12 row q-py-xs justify-between">
            <div class="col-12 text-left text-weight-bold">{{'Descrição:'}}</div>
            <div class="col-12 row text-justify">
              {{produto.descricao}}
            </div>
          </div>
        </div>
        <div class="q-pt-md col-12">
          <q-separator size="1px" />
        </div>
        <div v-if="consumidor" class="col-12 row justify-between q-pt-md q-px-md">
          <div class="col-4 text-left text-h4">
            {{`R$ ${produto.qtd * produto.valor} `}}
          </div>
          <div class="col-4 row items-center">
            <q-btn icon="remove" round dense outlined color="red" @click.stop="produto.qtd -= produto.qtd > 0 ? 1 : 0" />
            <div class="text-h5 text-weight-bold items-center q-px-md">{{produto.qtd}}</div>
            <q-btn icon="add" round dense outlined color="green" @click.stop="produto.qtd += 1" />
          </div>
          <div class="col-4 text-h6">
            <q-btn color="primary" icon="local_grocery_store" label="adicionar" class="full-width" />
          </div>
        </div>
        <div v-else class="col-12 row justify-end q-pt-md q-px-md">
          <div class="col q-pr-sm text-h6">
            <q-btn color="red" icon="delete" label="Excluir" class="full-width" @click="excluirProduto" />
          </div>
          <div class="col q-pl-sm text-h6">
            <q-btn color="primary" icon="edit" label="Editar" class="full-width" />
          </div>
        </div>
      </q-card>
    </q-list>
  </div>
</template>

<script>
  import {
    QList,
    QItem,
    QImg
  } from 'quasar';

  export default {
    data() {
      return {
        consumidor: false,
        produto: {}
      }
    },
    components: {
      QList,
      QItem,
      QImg
    },

    mounted() {
      console.log(this.$store.state.produto)
      this.produto = this.$store.state.produto.produtoSelecionado
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

      excluirProduto () {
        console.log('excluir prod')
        this.$emit('excluir-produto', this.produto)
      }
    }
  }

</script>