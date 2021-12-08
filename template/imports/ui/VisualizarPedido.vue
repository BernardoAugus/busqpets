<template>
  <div class="col-12 row bg-white">
    <q-list class="col-12 row">
      <q-card class="col-12 items-start row q-pa-md cursor-pointer" flat style="border-radius: 10px">
        <div class="col-12 row">
          <div class="col-12 row q-py-xs q-px-sm">
            <div class="text-weight-light row col-12 no-wrap items-center">
              <div class="col-auto text-h6 q-pr-sm">{{`Pedido: #${pedido.codigo} - ${nome}`}}</div>(<span :class="pedido.status === 'pendente' ? 'text-orange' : pedido.status === 'cancelado' ? 'text-red' : 'text-green'" class="text-weight-bold">{{pedido.status}}</span>)
              <div class="col row justify-end">
                {{date}}
              </div>
            </div>
            <div class="col-12 row items-center text-left">
              <div class="col text-h6 text-left justify-end row">
                <div v-if="pedido.total">{{`R$: ${(parseFloat(pedido.total) || 0).toFixed(2)}`}}</div>
                <div v-else>{{0}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="q-pt-md col-12">
          <q-separator size="1px" />
        </div>
        <div class="col-12 row q-pa-sm">
          <div v-for="(item, key) in pedido.produtos" :key="key" class="col-12 row no-wrap q-py-xs justify-between">
            <div class="col-auto text-left">
              {{`${item.quantidade}x - ${item.nome}`}}
            </div>
            <div class="col q-px-md row items-end">
              <q-item-label class=" row items-end" lines="1">
                {{'..............................................................................................................................................................................................................................................................................................................................................................'}}
              </q-item-label>
            </div>
            <div class="col-auto text-right">
              {{`${((item.valor * item.quantidade) || 0).toFixed(2)} `}}
            </div>
          </div>
        </div>
        <div class="q-pt-md col-12">
          <q-separator size="1px" />
        </div>
        <div class="col-12 row justify-end q-py-sm">
          <div class="col-auto">
            <q-btn v-close-popup flat label="Voltar"/>
          </div>
          <div class="col-auto">
            <q-btn v-if="pedido.status === 'pendente'" color="red" @click="mudarStatus('cancelado')" label="Cancelar Pedido"/>
            <q-btn v-if="pedido.status === 'pendente' && tipoUsuario === 1" color="green" @click="mudarStatus('aprovado')" label="Aprovar Pedido"/>
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
        nome: '',
        date: '',
        tipoUsuario: 1
      }
    },

    props: {
      pedido: {}
    },

    components: {
      QList,
      QItem,
      QImg
    },
    created () {
      console.log(this.pedido, this.pedido.consumidor)
      this.buscarFornecedor(this.$store.state.user?.user?.profile?.tipo === 1 ? this.pedido.consumidor : this.pedido.fornecedor)
      this.dataAtualFormatada()
    },
    mounted () {
      this.tipoUsuario = this.$store.state.user?.user?.profile?.tipo
    },
    methods: {
      retornarTotal (pedido, i) {
        let total = 0
        pedido.itens.map((item) => {
          total += i === 'valor' ? item[i] * item['qtd'] : item[i]
        })
        return total
      },

      dataAtualFormatada(){
        var data = this.pedido.createdAt,
          dia  = data.getDate().toString().padStart(2, '0'),
          mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
          ano  = data.getFullYear();
          hour = data.getHours()
          minute = data.getMinutes()
          console.log('datat')
        this.date = `${dia}/${mes}/${ano} ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
      },

      async buscarFornecedor(id) {
        console.log(id)
        await Meteor.call('fetchUserById',id,(error,result)=>{
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
            console.log(error.reason) 
          } else {
            this.nome = result.profile.name
          }
        })
      },

      mudarStatus (status) {
        this.pedido.status = status
        this.$emit('mudar-status', this.pedido)
      }
    }
  }

</script>