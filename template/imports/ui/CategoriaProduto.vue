<template>
  <div class="col-12 row q-px-md">
    <div class="row no-wrap items-center col-12 text-h6 text-primary q-py-sm text-weight-ligth">
      <div class="col-auto">{{'Lojas'}}</div>
      <div class="col row justify-end">
        <q-btn icon="filter_list" flat dense></q-btn>
      </div>
    </div>
    <div class="col-12 row q-pb-md">
      <q-input outlined dense class="col-12">
        <template v-slot:append>
          <q-btn color="primary" dense flat icon="search" />
        </template>
      </q-input>
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
              <div class="col-12 row items-center text-left">
                <q-icon name="star" color="yellow" size="14px" class="q-mr-xs" />
                <div class="text-caption text-yellow row">
                  <div>{{opcao.nota}}</div>
                  <div class="text-black q-pl-sm">{{` - ${opcao.distancia} Km`}}</div>
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
            nome: 'Dog store',
            foto_perfil: '',
            id: 1,
            especies: ['dog', 'cat'],
            nota: 4.9,
            distancia: 1.5
          },
          {
            nome: 'Meus pets',
            foto_perfil: '',
            id: 2,
            especies: ['dog', 'cat', 'fish', 'bird'],
            nota: 4.5,
            distancia: 0.3
          },
          {
            nome: `Dog's life`,
            foto_perfil: '',
            id: 3,
            especies: ['dog'],
            nota: 4.5,
            distancia: 0.3
          },
          {
            nome: 'My little pet',
            foto_perfil: '',
            id: 4,
            especies: ['dog', 'fish', 'bird', 'hamster'],
            nota: 4.5,
            distancia: 0.3
          },
          {
            nome: 'Pet Store',
            foto_perfil: '',
            id: 5,
            especies: ['dog', 'cat'],
            nota: 4.5,
            distancia: 0.3
          },
        ],
      }
    },
    components: {
      QList,
      QItem,
      QImg
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