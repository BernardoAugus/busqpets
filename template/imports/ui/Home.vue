<template>
  <div>
    <div class="row justify-center items-center col-12 text-h6 q-pa-sm text-weight-ligth">
      {{'Home'}}
    </div>
    <q-list separator padding class="col-12 row">
      <div v-for="(opcao, key) in opacoes_menu" :key="key" class="col-6 q-pa-sm text-center row">
        <q-card class="col-12 items-end justify-center row text-h6" style="height: 150px">
          {{ opcao.nome }}
        </q-card>
      </div>
    </q-list>
  </div>
</template>

<script>
  import {
    QList,
    QItem,
  } from 'quasar';

  export default {
    data() {
      return {
        opacoes_menu: [
          {
            nome: 'Cães'
          },
          {
            nome: 'Gatos'
          }
        ],
        counter: -1
      }
    },
    components: {
      QList,
      QItem
    }
  }

</script>