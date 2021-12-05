<template>
  <div class="col-12 row bg-white">
    <q-list class="col-12 row">
      <div v-for="(pedido, key) in pedidos" :key="key" class="col-12 q-px-xs q-pt-sm text-center row">
        <q-card class="col-12 items-start row q-pa-md cursor-pointer" flat style="border-radius: 10px" @click="$router.push(`/meus-pedidos/${pedido.id}`)">
          <div class="col-12 row">
            <div class="col-12 row q-py-xs q-px-sm">
              <div class="text-weight-light row col-12 no-wrap items-center">
                <div class="col-auto text-h6 q-pr-sm">{{`Pedido: #${pedido.id} - ${pedido.fornecedor}`}}</div>(<span class=" text-orange">{{pedido.status}}</span>)
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
          <div class="q-pt-md col-12">
            <q-separator size="1px" />
          </div>
          <div class="col-12 row q-pa-sm">
            <div v-for="(item, key) in pedido.itens" :key="key" class="col-12 row no-wrap q-py-xs justify-between">
              <div class="col-auto text-left">
                {{`${item.qtd}x - ${item.produto}`}}
              </div>
              <div class="col q-px-md row items-end">
                <q-item-label class=" row items-end" lines="1">
                  {{'..............................................................................................................................................................................................................................................................................................................................................................'}}
                </q-item-label>
              </div>
              <div class="col-auto text-right">
                {{`${(item.valor * item.qtd).toFixed(2)} `}}
              </div>
            </div>
          </div>
          <div class="q-pt-md col-12">
            <q-separator size="1px" />
          </div>
          <div class="col-12 row justify-end q-py-sm">
            <div class="col-auto">
              <q-btn flat label="Voltar"/>
            </div>
            <div class="col-auto">
              <q-btn color="red" label="Cancelar Pedido"/>
            </div>
          </div>
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