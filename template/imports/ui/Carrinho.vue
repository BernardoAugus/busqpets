<template>
  <div v-if="liberarTela" class="col-12 row q-px-md">
    <div class="row no-wrap items-center col-12 text-h6 text-primary q-py-sm text-weight-ligth">
      <q-icon name="shopping_cart" class="q-pr-sm"></q-icon>
      <div class="col-auto">{{'Carrinho'}}</div>
    </div>
    <q-list v-if="carrinho.length > 0" class="col-12 row">
      <div v-for="(fornecedor, key) in carrinho" :key="key" class="col-12 q-px-xs q-py-sm text-center row">
        <div class="col-12 row text-h6">{{fornecedor.nomefornecedor}}</div>
        <div v-for="(produto, key_produto) in fornecedor.produtos" :key="key_produto" class="col-12 q-px-xs q-py-sm text-center row">
          <q-card class="col-12 items-start row" flat style="border-radius: 10px">
            <div class="col-auto row items-center">
              <q-avatar
                v-if="produto.foto_perfil"
                size="55px"
              >
                <img :src="produto.foto_perfil"/>
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
              <div class="col-12 row q-py-xs q-px-sm">
                <div class="text-weight-light row col-12 no-wrap items-center">
                  <div class="col-auto text-subtitle1">{{produto.nome}}</div>
                  <div class="col row justify-end">
                    <q-img v-for="(icon, key) in produto.especies" v-bind:key="key" :src="`icons/${icon}.png`" color="primary"
                      style="height: 16px; width: 16px; margin-left: 2px" />
                  </div>
                </div>
                <div class="col-12 row items-start text-left">
                  <div class="col-auto row no-wrap items-center">
                    <div class="text-caption text-yellow row">
                      <div class="text-black  ">{{`R$ ${parseFloat(produto.valor * produto.quantidade).toFixed(2)}`}}</div>
                    </div>
                  </div>
                  <div class="col row justify-end">
                    <q-btn v-if="produto.quantidade > 0" icon="remove" round dense outlined color="red" @click.stop="produto.quantidade -= 1" />
                    <q-btn v-else label="remover" dense outlined color="red" @click.stop="removerDoCarrinho(fornecedor.produtos, key_produto, carrinho, key)" />
                    <div class="text-h6 text-weight-bold items-center q-px-md">{{produto.quantidade}}</div>
                    <q-btn icon="add" round dense outlined color="green" @click.stop="produto.quantidade += 1" />
                  </div>
                </div>
              </div>
            </div>
          </q-card>
          <div class="q-pt-md col-12">
            <q-separator size="1px" />
          </div>
        </div>
      </div>
    </q-list>
    <div v-else class="col-12 row text-center justify-center items-center text-h6">
      Ainda não existem produtos por aqui
      <div class="col-12 row justify-center">
        <q-icon name="block" color="primary" size="250px" />
      </div>
      <div>
        <q-btn label="Ver produtos" to="/produtos" color="primary" class="q-mt-md" />
      </div>
    </div>
    <div v-if="carrinho.length > 0" class="col-12 justify-end row">
      <q-btn color="black" @click="$router.push({ name: 'produtos' })" flat class="">{{'Voltar'}}</q-btn>
      <q-btn @click="solicitarPedido" color="primary" class="">{{'Concluir Compra'}}</q-btn>
    </div>
  </div>
</template>

<script>
  import {
    QList,
    QItem,
    QImg
  } from 'quasar';
  import Lodash from 'lodash'

  export default {
    data() {
      return {
        carrinho: [],
        liberarTela: false
      }
    },
    components: {
      QList,
      QItem,
      QImg
    },

    async mounted() {
      this.carrinho = this.$store.getters['carrinho/getCarrinho']
      console.log(this.carrinho)
      for (const iterator of this.carrinho) {
        iterator.nomefornecedor = Lodash.cloneDeep(await this.buscarFornecedor(iterator.fornecedor))
      }
      this.liberarTela = true
    },

    methods: {
      async buscarFornecedor(idFornecedor) {
        console.log(idFornecedor)
        const retorno = await Meteor.callPromise('fetchUserById',idFornecedor)
        console.log(retorno.profile.name)
        return retorno.profile.name
      },

      removerDoCarrinho (list, i, carrinho, j) {
        list.splice(i, 1)
        if (list.length === 0) {
          carrinho.splice(j, 1)
        }
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

      solicitarPedido () {
        console.log(this.carrinho, 'solicitarPedido')
        Meteor.call('novoPedido',this.carrinho, this.carrinho.length, (error,result)=>{
          if(error) {
            this.$q.notify({
              progress: true,
              message: error.reason,
              type: 'error',
              color: 'red',
              timeout: 3500,
              multiLine: false,
              icon: 'error'
            })
            console.log(error, 'error')
          } else {
            console.log(result, 'result')
            this.$q.notify({
              progress: true,
              message: 'Pedido solicitado com Sucesso',
              type: 'success',
              color: 'green',
              timeout: 3500,
              multiLine: false,
              icon: 'check'
            })
            this.carrinho = []
            this.$store.commit('carrinho/CLEAR_CARRINHO')
            this.$router.push({ name: 'meus-pedidos'})
          }
        })
      },
    }
  }

</script>