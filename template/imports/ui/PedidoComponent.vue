<template>
  <q-card class="col-12 items-start row q-pa-md cursor-pointer" flat style="border-radius: 10px" @click="showPopup(pedido)">
    <div class="col row">
      <div class="col-12 row q-py-xs q-px-sm">
        <div class="text-weight-light row col-12 no-wrap items-center">
          <div class="col-auto text-h6 q-pr-sm">{{`Pedido: #${pedido.codigo} - ${nome}`}}</div>(<span :class="pedido.status === 'pendente' ? 'text-orange' : pedido.status === 'cancelado' ? 'text-red' : 'text-green'" class="text-weight-bold">{{pedido.status}}</span>)
          <div class="col row justify-end">
            {{data}}
          </div>
        </div>
        <div class="col-12 row items-center text-left">
          <div class="col text-h6 text-left justify-end row">
            <div>{{`R$: ${parseFloat(pedido.total).toFixed(2)}`}}</div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="abrirPopup" >
      <q-card style="max-width: 700px">
        <VisualizarPedido @mudar-status="mudarStatus" :pedido="pedido"></VisualizarPedido>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
  import {
    QList,
    QItem,
    QImg
  } from 'quasar';
  import VisualizarPedido from '/imports/ui/VisualizarPedido.vue'

  export default {
    props: {
      pedido: {}
    },
    data() {
      return {
        nome: '',
        data: '',
        abrirPopup: false
      }
    },
    components: {
      QList,
      QItem,
      QImg,
      VisualizarPedido
    },

    async created() {
      this.buscarFornecedor(this.$store.state.user?.user?.profile?.tipo === 1 ? this.pedido.consumidor : this.pedido.fornecedor)
      this.dataAtualFormatada()
    },

    methods: {
      showPopup () {
        this.abrirPopup = true
      },

      dataAtualFormatada(){
        var data = this.pedido.createdAt,
          dia  = data.getDate().toString().padStart(2, '0'),
          mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
          ano  = data.getFullYear();
          hour = data.getHours()
          minute = data.getMinutes()
        this.data = `${dia}/${mes}/${ano} ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
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

      async mudarStatus(pedido) {
        Meteor.call('mudarStatus',pedido._id, pedido.status, (error,result)=>{
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
            this.$q.notify({
              progress: true,
              message: `Pedido alterado para ${pedido.status}`,
              type: 'success',
              color: 'green',
              timeout: 3500,
              multiLine: false,
              icon: 'check'
            })
          }
          this.abrirPopup = false
          this.$emit('fechar-e-recarregar')
        })
      },

      recarregarConteudo () {
        this.abrirPopup = false
      }
    }
  }

</script>