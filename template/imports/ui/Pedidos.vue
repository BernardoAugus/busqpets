<template>
  <div v-if="exibirTela" class="col-12 row q-pa-lg">
    <div class="row no-wrap items-center col-12 text-h6 text-primary q-py-sm text-weight-ligth">
      <div class="col-auto">{{'Pedidos'}}</div>
    </div>
    <q-list v-if="pedidos.length > 0" class="col-12 row">
      <div v-for="(pedido, key) in pedidos" :key="key" class="col-12 q-px-xs q-py-sm text-center row">
        <q-card class="col-12 items-start row q-pa-md cursor-pointer" flat style="border-radius: 10px" @click="abrirPopup = true">
          <div class="col row">
            <div class="col-12 row q-py-xs q-px-sm">
              <div class="text-weight-light row col-12 no-wrap items-center">
                <div class="col-auto text-h6 q-pr-sm">{{`Pedido: #${pedido.id} - ${pedido.fornecedor}`}}</div>(<span :class="pedido.status === 'Pendente' ? 'text-orange' : 'text-green'">{{pedido.status}}</span>)
                <div class="col row justify-end">
                  {{pedido.dataHoraCompra}}
                </div>
              </div>
              <div class="col-12 row items-center text-left">
                <div class="text-caption column col row">
                  <div class="text-black">{{`Total itens: ${retornarTotal(pedido, 'qtd')}`}}</div>
                </div>
                <div class="col text-h6 text-left justify-end row">
                  <div>{{`R$: ${retornarTotal(pedido, 'valor').toFixed(2)}`}}</div>
                </div>
              </div>
            </div>
          </div>
        </q-card>
        <div v-if="(key +1) !== pedidos.length" class="q-pt-md col-12">
          <q-separator size="1px" />
        </div>
      </div>
    </q-list>
    <div v-else class="col-12 row text-center justify-center items-center text-h6">
      Ainda não existem pedidos por aqui
      <div class="col-12 row justify-center">
        <q-icon name="block" color="primary" size="250px" />
      </div>
      <div>
        <q-btn label="Ver produtos" to="/produtos" color="primary" class="q-mt-md" />
      </div>
    </div>
    <q-dialog v-model="abrirPopup" >
      <q-card style="max-width: 700px">
        <VisualizarPedido></VisualizarPedido>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import {
    QList,
    QItem,
    QImg
  } from 'quasar';
  import VisualizarPedido from '/imports/ui/VisualizarPedido.vue'

  export default {
    data() {
      return {
        exibirTela: false,
        abrirPopup: false,
        pedidos: [],
      }
    },
    components: {
      QList,
      QItem,
      QImg,
      VisualizarPedido
    },

    async created() {
      this.$q.loading.show()
      await this.carregarPedidos()
    },

    methods: {
      retornarTotal (pedido, i) {
        let total = 0
        pedido.itens.map((item) => {
          total += i === 'valor' ? item[i] * item['qtd'] : item[i]
        })
        return total
      },

      carregarPedidos () {
        Meteor.call('buscarTodosPedidos', (error,result)=>{
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
            this.pedidos = result
          }
          this.$q.loading.hide()
          this.exibirTela = true
        })
      },
    }
  }

</script>