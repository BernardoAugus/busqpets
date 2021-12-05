<template>
  <div class="col-12 row q-pa-lg">
    <div class="row no-wrap items-center col-12 text-h6 text-primary q-py-sm text-weight-ligth">
      <div class="col-auto">{{'Pedidos'}}</div>
    </div>
    <q-list class="col-12 row">
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
        abrirPopup: false,
        pedidos: [
          {
            fornecedor: 'Pet family',
            fotoProduto: '',
            id: 120,
            valor: 49.7,
            qtd: 22,
            dataHoraCompra: '17/11/2021 12:33',
            status: 'Em andamento',
            itens: [
              {
                produto: 'Ração Canina',
                valor: 45.5,
                qtd: 2
              },
              {
                produto: 'Shampoo Pet',
                valor: 15.2,
                qtd: 1
              },
              {
                produto: 'Escova Pet',
                valor: 10.9,
                qtd: 3
              },
              {
                produto: 'Creme dental',
                valor: 20.3,
                qtd: 1
              },
              {
                produto: 'Petisco Come Bem',
                valor: 5.3,
                qtd: 15
              }
            ]
          },
          {
            fornecedor: 'Pet Mais',
            fotoProduto: '',
            id: 119,
            valor: 89.7,
            qtd: 22,
            dataHoraCompra: '05/11/2021 16:40',
            status: 'Concluido',
            itens: [
              {
                produto: 'Escova Pet',
                valor: 10.9,
                qtd: 3
              },
              {
                produto: 'Creme dental',
                valor: 20.3,
                qtd: 1
              },
              {
                produto: 'Petisco Come Bem',
                valor: 5.3,
                qtd: 15
              }
            ]
          },
          {
            fornecedor: 'Pet Mais',
            fotoProduto: '',
            id: 118,
            valor: 89.7,
            qtd: 22,
            dataHoraCompra: '17/11/2021 12:33',
            status: 'Concluido',
            itens: [
              {
                produto: 'Escova Pet',
                valor: 10.9,
                qtd: 3
              },
              {
                produto: 'Creme dental',
                valor: 20.3,
                qtd: 1
              }
            ]
          },
          {
            fornecedor: 'Pet Mais',
            fotoProduto: '',
            id: 117,
            valor: 89.7,
            qtd: 22,
            dataHoraCompra: '01/11/2021 19:40',
            status: 'Concluido',
            itens: [
              {
                produto: 'Escova Pet',
                valor: 10.9,
                qtd: 1
              },
              {
                produto: 'Creme dental',
                valor: 20.3,
                qtd: 1
              }
            ]
          },
          {
            fornecedor: 'Tio dos Dogs',
            fotoProduto: '',
            id: 116,
            valor: 89.7,
            qtd: 22,
            dataHoraCompra: '05/10/2021 12:10',
            status: 'Concluido',
            itens: [
              {
                produto: 'Escova Pet',
                valor: 10.9,
                qtd: 3
              },
              {
                produto: 'Creme dental',
                valor: 20.3,
                qtd: 10
              }
            ]
          }
        ],
      }
    },
    components: {
      QList,
      QItem,
      QImg,
      VisualizarPedido
    },
    methods: {
      retornarTotal (pedido, i) {
        let total = 0
        pedido.itens.map((item) => {
          total += i === 'valor' ? item[i] * item['qtd'] : item[i]
        })
        return total
      }
    }
  }

</script>