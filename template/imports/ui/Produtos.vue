<template>
  <div v-if="liberarTela" class="col-12 row q-pa-lg">
    <div class="row no-wrap items-center col-12 text-h6 text-primary q-py-sm text-weight-ligth">
      <div class="col-auto">{{tipoUsuario === 1 ? 'Minha Loja' : 'Produtos'}}</div>
      <div class="col row justify-end">
      </div>
    </div>
    <div class="col-12 row q-pb-md">
      <div class="col-6 q-pr-xs">
        <div>Produto</div>
        <q-input v-model="filter.nome" @keypress.enter="buscarProdutos()" outlined dense class="col-6 q-mb-sm bg-white"></q-input>
      </div>
      <div class="col-6 q-pl-xs">
        <div>Especies</div>
        <q-select
          v-model="filter.especies"
          :options="opcoesEspecies"
          multiple
          emit-value
          map-options
          class="col-6 bg-white"
          outlined
          dense
        />
      </div>
      <div v-if="tipoUsuario === 2" class="col-4 q-pr-xs">
        <div>Bairro</div>
        <q-input v-model="filter.bairro" @keypress.enter="buscarProdutos()" outlined dense class="col-6 bg-white"></q-input>
      </div>
      <div v-if="tipoUsuario === 2" class="col-4 q-px-xs">
        <div>Cidade</div>
        <q-input v-model="filter.cidade" @keypress.enter="buscarProdutos()" outlined dense class="col-6 bg-white"></q-input>
      </div>
      <div v-if="tipoUsuario === 2" class="col-4 q-pl-xs">
        <div>UF</div>
        <q-select v-model="filter.uf" :options="states" emit-value map-options class="col-6 bg-white" outlined dense />
      </div>
      <div class="col-12 row justify-end q-pt-sm">
        <q-btn @click="limparFiltro()" class="q-mr-sm">Limpar Filtro</q-btn>
        <q-btn @click="buscarProdutos()" color="primary">Buscar</q-btn>
      </div>
    </div>
    <q-list v-if="produtos.length > 0" class="col-12 row">
      <div v-for="(opcao, key) in produtos" :key="key" class="col-12 q-px-xs q-py-sm text-center row">
        <q-card class="col-12 items-start row q-pa-md cursor-pointer" flat style="border-radius: 10px" @click="showPopup(opcao)">
          <div class="col-auto row justify-center q-mt-sm items-center">
            <q-avatar
              v-if="opcao.fotoProduto"
              size="55px"
            >
              <img :src="opcao.fotoProduto"/>
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
            <div class="col-12 row q-py-xs items-center q-px-sm">
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
                    <div class="text-black text-subtitle1 q-pl-sm">{{`R$ ${opcao.valor}`}}</div>
                  </div>
                </div>
                <div class="col row justify-end">
                </div>
                <div v-if="$q.platform.is.mobile" class="col-12 row">
                  <q-btn dense outlined color="primary" label="Adicionar" class="full-width q-mt-sm"/>
                </div>
              </div>
            </div>
          </div>
        </q-card>
        <div v-if="(key +1) !== produtos.length" class="q-pt-md col-12">
          <q-separator size="1px" />
        </div>
      </div>
    </q-list>
    <div v-else class="col-12 row text-center justify-center items-center text-h6">
      Ainda não existem produtos por aqui
      <div class="col-12 row justify-center">
        <q-icon name="block" color="primary" size="250px" />
      </div>
    </div>
    <q-dialog v-model="abrirPopupCadastro">
      <q-card class="col-12 row q-pa-md" style="max-width: 700px">
        <q-form @submit="verificarSeEdicao">
          <div class="col-12 text-h6 text-weight-bold">{{'Cadastro Produto'}}</div>
          <div class="col-12 row ">
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-xs row q-pt-sm">
              <div class="text-grey-7">{{'Produto:'}}</div>
              <q-input v-model="produto.nome" class="col-12" outlined dense
                lazy-rules
                hide-bottom-space
                :rules="[ val => val && val.length > 2 || 'O nome deve ter pelo menos 2 caracteres']"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 q-pa-xs row q-pt-sm">
              <div class="text-grey-7">{{'Valor:'}}</div>
              <q-input prefix="R$" v-model="produto.valor" class="col-12" outlined dense
                lazy-rules
                hide-bottom-space
                reverse-fill-mask
                mask="############.##"
                :rules="[ val => val && val > 0 || 'O valor deve ser maior do que zero']"
              />
            </div>
            <div class="col-xs-12 q-pa-xs row q-pt-sm">
              <div class="text-grey-7">{{'Descrição:'}}</div>
              <q-input v-model="produto.descricao" class="col-12" outlined dense />
            </div>
            <div class="col-xs-12 q-pa-xs row q-pt-sm">
              <div class="text-grey-7">{{'Espécies:'}}</div>
              <q-select
                v-model="produto.especies"
                :options="opcoesEspecies"
                multiple
                emit-value
                map-options
                class="col-12"
                outlined
                dense
                :rules="[ val => val || 'Selecione ao menos uma opção' ]"
              />
            </div>
          </div>
          <div class="q-pt-md col-12">
            <q-separator size="1px" />
          </div>
          <div class="col-12 row justify-end q-pt-md q-px-md">
            <div class="col q-pr-sm text-h6">
              <q-btn flat label="Cancelar" class="full-width" autogrow @click="fecharModal" />
            </div>
            <div class="col q-pl-sm text-h6">
              <q-btn color="primary"  :label="retornarLabel()" class="full-width" type="submit" />
            </div>
          </div>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="abrirPopupVisualizar" >
      <q-card style="max-width: 700px">
        <VisualizarProduto @excluir-produto="excluirProduto" @editar-produto="showPoupCadastro"></VisualizarProduto>
      </q-card>
    </q-dialog>
    <q-page-sticky v-if="tipoUsuario === 1" position="bottom-right" :offset="[18, 10]">
      <q-btn fab icon="add" color="secondary" @click="showPoupCadastro"/>
    </q-page-sticky>
  </div>
</template>

<script>
  import {
    QList,
    QItem,
    QImg
  } from 'quasar';
  import VisualizarProduto from './VisualizarProduto'

  export default {
    data() {
      return {
        states: [
          { value: 'AC', label: 'Acre' },
          { value: 'AL', label: 'Alagoas' },
          { value: 'AP', label: 'Amapá' },
          { value: 'AM', label: 'Amazonas' },
          { value: 'BA', label: 'Bahia' },
          { value: 'CE', label: 'Ceará' },
          { value: 'DF', label: 'Distrito Federal' },
          { value: 'ES', label: 'Espírito Santo' },
          { value: 'GO', label: 'Goías' },
          { value: 'MA', label: 'Maranhão' },
          { value: 'MT', label: 'Mato Grosso' },
          { value: 'MS', label: 'Mato Grosso do Sul' },
          { value: 'MG', label: 'Minas Gerais' },
          { value: 'PA', label: 'Pará' },
          { value: 'PB', label: 'Paraíba' },
          { value: 'PR', label: 'Paraná' },
          { value: 'PE', label: 'Pernambuco' },
          { value: 'PI', label: 'Piauí' },
          { value: 'RJ', label: 'Rio de Janeiro' },
          { value: 'RN', label: 'Rio Grande do Norte' },
          { value: 'RS', label: 'Rio Grande do Sul' },
          { value: 'RO', label: 'Rondônia' },
          { value: 'RR', label: 'Roraíma' },
          { value: 'SC', label: 'Santa Catarina' },
          { value: 'SP', label: 'São Paulo' },
          { value: 'SE', label: 'Sergipe' },
          { value: 'TO', label: 'Tocantins' },
        ],
        filter: {
          bairro: '',
          cidade: '',
          uf: '',
          nome: '',
          especies: []
        },
        liberarTela: false,
        tipoUsuario: 1,
        abrirPopupCadastro: false,
        abrirPopupVisualizar: false,
        produto: {},
        opcoesEspecies: [
          {
            label: 'Cães',
            value: 'dog'
          },
          {
            label: 'Gatos',
            value: 'cat'
          },
          {
            label: 'Peixes',
            value: 'fish'
          },
          {
            label: 'Aves',
            value: 'bird'
          },
          {
            label: 'Roedores',
            value: 'hamster'
          },
          {
            label: 'Répteis',
            value: 'reptile'
          },
          {
            label: 'Outros',
            value: 'others'
          }
        ],
        produtos: [],
      }
    },
    components: {
      QList,
      QItem,
      QImg,
      VisualizarProduto
    },

    mounted() {
      this.tipoUsuario = this.$store.state.user.user.profile.tipo
    },

    async created () {
      await this.buscarProdutos()
    },

    methods: {
      fecharModal () {
        this.abrirPopupCadastro = false
        this.produto = {}
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

      async buscarProdutos() {
        this.$q.loading.show()
        console.log('async buscarProduto', this.filter)
        await Meteor.call('buscarProdutos', this.filter, (error,result)=>{
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
            this.produtos = result.produtos
            this.fornecedores = result.fornecedores
          }
          this.liberarTela = true
          this.$q.loading.hide()
        })
        console.log(this.produtos)
      },

      excluirProduto (opcao) {
        console.log(opcao, 'opcao')
        //passar o _id do produto
        Meteor.call('excluirProduto', opcao._id, (error,result)=>{
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
          } else {
            this.$q.notify({
              progress: true,
              message: 'Excluido com Sucesso',
              type: 'success',
              color: 'green',
              timeout: 3500,
              multiLine: false,
              icon: 'check'
            })
            this.abrirPopupVisualizar = false,
            this.buscarProdutos()
          }
          })
      },

      editar (opcao) {
        //passar o produto todo
        //{
        // todosOsDados
        //}
        Meteor.call('editarProduto', opcao, (error,result)=>{
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
            } else {
              this.$q.notify({
                progress: true,
                message: 'Editado com Sucesso',
                type: 'success',
                color: 'green',
                timeout: 3500,
                multiLine: false,
                icon: 'check'
              })
            }
            this.produto = {}
            this.abrirPopupCadastro = false
            this.abrirPopupVisualizar = false
          });

      },

      showPopup (opcao) {
        this.$store.commit('produto/SET_PRODUTO', opcao)
        this.abrirPopupVisualizar = true
      },

      showPoupCadastro (opcao) {
        if (opcao?._id) {
          this.produto = opcao
        }
        this.abrirPopupCadastro = true
      },

      retornarLabel () {
        return this.produto._id ? 'Alterar' : 'Cadastrar'
      },

      cadastrarProduto () {
          Meteor.call('cadastrarProduto',this.produto,(error,result)=>{
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
              this.$q.notify({
                progress: true,
                message: 'Cadastrado com Sucesso',
                type: 'success',
                color: 'green',
                timeout: 3500,
                multiLine: false,
                icon: 'check'
              })
              this.buscarProdutos()
            }
            this.abrirPopupCadastro = false
            this.produto = {}
          })
      },

      verificarSeEdicao () {
        if (this.produto?._id) {
          this.editar(this.produto)
        } else {
          this.cadastrarProduto()
        }
      },

      limparFiltro () {
        this.filter = {
          bairro: '',
          cidade: '',
          uf: '',
          nome: '',
          especies: []
        }
        this.buscarProdutos()
      }
    }
  }

</script>