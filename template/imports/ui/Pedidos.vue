<template>
  <div v-if="exibirTela" class="col-12 row q-pa-lg">
    <div class="row no-wrap items-center col-12 text-h6 text-primary q-py-sm text-weight-ligth">
      <div class="col-auto">{{'Pedidos'}}</div>
    </div>
    <q-list v-if="pedidos && pedidos.length > 0" class="col-12 row">
      <div v-for="(pedido, key) in pedidos" :key="key" class="col-12 q-px-xs q-py-sm text-center row">
        <PedidoComponent @fechar-e-recarregar="recarregarConteudo" :pedido="pedido"></PedidoComponent>
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
      <div v-if="tipoUsuario === 2">
        <q-btn label="Ver produtos" to="/produtos" color="primary" class="q-mt-md" />
      </div>
    </div>
  </div>
</template>

<script>
  import {
    QList,
    QItem,
    QImg
  } from 'quasar';
  import PedidoComponent from '/imports/ui/PedidoComponent.vue'

  export default {
    data() {
      return {
        exibirTela: false,
        abrirPopup: false,
        pedidos: [],
        fornecedores: [],
        pedidoSelecionado: {},
        tipoUsuario: 1
      }
    },
    components: {
      QList,
      QItem,
      QImg,
      PedidoComponent
    },

    async created() {
      await this.carregarPedidos()
    },
    mounted() {
      this.tipoUsuario = this.$store.state.user.user.profile.tipo;
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

            setTimeout(() => {
              this.carregarPedidos()
            }, 30000);
          }
          this.exibirTela = true
        })
      },

      async buscarFornecedor(idFornecedor) {
        console.log(idFornecedor)
        const retorno = await Meteor.callPromise('fetchUserById',idFornecedor)
        console.log(retorno.profile.name)
        return retorno.profile.name
      },

      recarregarConteudo () {
        this.$q.loading.show()
        this.carregarPedidos()
        this.$q.loading.hide()
      }
    }
  }

</script>