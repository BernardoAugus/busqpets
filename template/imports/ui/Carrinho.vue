<template>
  <div class="col-12 row q-px-md">
    <div class="row no-wrap items-center col-12 text-h6 text-primary q-py-sm text-weight-ligth">
      <q-icon name="shopping_cart" class="q-pr-sm"></q-icon>
      <div class="col-auto">{{'Carrinho'}}</div>
    </div>
    <q-list class="col-12 row">
      <div v-for="(opcao, key) in lojas" :key="key" class="col-12 q-px-xs q-py-sm text-center row">
        <q-card class="col-12 items-start row" flat style="border-radius: 10px" @click="$router.push(`${opcao.id}`)">
          <div class="col-auto row items-center">
            <q-avatar
              v-if="opcao.foto_perfil"
              size="55px"
            >
              <img :src="opcao.foto_perfil"/>
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
            <div class="col-12 row q-py-xs q-px-sm">
              <div class="text-weight-light row col-12 no-wrap items-center">
                <div class="col-auto text-subtitle1">{{opcao.nome}}</div>
                <div class="col row justify-end">
                  <q-img v-for="(icon, key) in opcao.especies" v-bind:key="key" :src="`icons/${icon}.png`" color="primary"
                    style="height: 16px; width: 16px; margin-left: 2px" />
                </div>
              </div>
              <div class="col-12 row items-start text-left">
                <div class="col-auto row no-wrap items-center">
                  <div class="text-caption text-yellow row">
                    <div class="text-black  ">{{`R$ ${opcao.valor * opcao.qtd}`}}</div>
                  </div>
                </div>
                <div class="col row justify-end">
                  <q-btn v-if="opcao.qtd > 0" icon="remove" round dense outlined color="red" @click.stop="opcao.qtd -= 1" />
                  <q-btn v-else label="remove" dense outlined color="red" @click.stop="removerDoCarrinho" />
                  <div class="text-h6 text-weight-bold items-center q-px-md">{{opcao.qtd}}</div>
                  <q-btn icon="add" round dense outlined color="green" @click.stop="opcao.qtd += 1" />
                </div>
              </div>
            </div>
          </div>
        </q-card>
        <div class="q-pt-md col-12">
          <q-separator size="1px" />
        </div>
      </div>
    </q-list>
    <div class="col-12 justify-end row">
      <q-btn color="black" flat class="">{{'Voltar'}}</q-btn>
      <q-btn color="primary" class="">{{'Concluir Compra'}}</q-btn>
    </div>
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
        lojas: [
          {
            nome: 'Ração plus',
            foto_perfil: '',
            id: 1,
            especies: ['dog', 'cat'],
            nota: 4.9,
            distancia: 1.5,
            valor: 49.9,
            qtd: 3
          }
        ],
      }
    },
    components: {
      QList,
      QItem,
      QImg
    },
    methods: {
      removerDoCarrinho () {

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
    }
  }

</script>