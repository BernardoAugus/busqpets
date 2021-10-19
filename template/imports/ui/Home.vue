<template>
  <div class=" bg-grey-1 col-12 row q-px-md">
    <div class="row justify-center items-center col-12 text-h6 text-primary q-pa-sm text-weight-ligth">
      {{'Home'}}
    </div>
    <q-list separator padding class="col-12 row">
      <div v-for="(opcao, key) in opacoes_menu" :key="key" class="col-6 q-pa-sm text-center row">
        <q-card class="col-12 items-end justify-center row text-h6" flat style="height: 150px; border-radius: 20px" @click="$router.push(opcao.ir_para)">
          <q-img :src="`icons/${opcao.icon}`" color="black"
            style="height: 100px; max-width: 100px" />
          <div class="col-12">{{ opcao.nome }}</div>
        </q-card>
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
        opacoes_menu: [
          {
            nome: 'Cães',
            ir_para: '/dog/stores/',
            icon: 'dog.png'
          },
          {
            nome: 'Gatos',
            ir_para: '/cat/stores/',
            icon: 'cat.png'
          },
          {
            nome: 'Peixes',
            ir_para: '/fish/stores/',
            icon: 'fish.png'
          },
          {
            nome: 'Aves',
            ir_para: '/bird/stores/',
            icon: 'bird.png'
          },
          {
            nome: 'Roedores',
            ir_para: '/rat/stores/',
            icon: 'hamster.png'
          },
          {
            nome: 'Répteis',
            ir_para: '/reptil/stores/',
            icon: 'reptile.png'
          }
        ],
      }
    },
    components: {
      QList,
      QItem,
      QImg
    }
  }

</script>