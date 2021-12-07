<template>
  <div v-if="liberarTela" class="q-pa-sm">
    <div class="row justify-center items-center col-12 text-h5 q-pa-sm text-weight-light text-primary">
      {{'Meus Pets'}}
    </div>
    <div v-if="abrir_cadastro">
      <q-form class="row col-12" @submit="verificarSeEdicao">
        <div class="text-h6 col-12">{{cadastro_pet.id && cadastro_pet.id > 0 ? `${cadastro_pet.nome}` : 'Novo Cadastro'}}</div>
        <div class="col-xs-12 col-sm-6 col-md-4 row q-pt-sm q-pa-xs">
          <div class="text-grey-7">{{'Nome:'}}</div>
          <q-input
            v-model="cadastro_pet.nome"
            class="col-12"
            outlined
            dense
            hide-bottom-space
            :rules="[
              val => !!val || 'Não pode ficar em branco',
              val => val.length > 2 || 'Deve ter no minimo 3 caracteres',
            ]"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 row q-pt-sm q-pa-xs">
          <div class="text-grey-7">{{'Data Nascimento:'}}</div>
          <q-input v-model="cadastro_pet.data_nascimento" mask="##/##/####" class="col-12" outlined dense>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="cadastro_pet.data_nascimento">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-4 row q-pt-sm q-pa-xs">
          <div class="text-grey-7">{{'Descrição:'}}</div>
          <q-input v-model="cadastro_pet.descricao" autogrow class="col-12" outlined dense/>
        </div>
        <div class="col-12 row justify-end">
          <q-btn :class="$q.platform.is.mobile ? 'full-width q-mt-lg' : 'q-pa-xs q-mt-md'" color="primary" label="Salvar" type="submit" />
        </div>
      </q-form>
    </div>
    <div v-else-if="meus_pets.length > 0" class="col-12 row q-pb-xl">
      <div v-for="(pet, key) in meus_pets" v-bind:key="key" class="q-pa-md col-xs-12 col-sm-6 col-md-4">
        <q-card style="border-radius: 10px" @click="abrirEdicao(pet)">
          <q-btn round flat color="red" icon="delete" class="absolute-top-right" style="top: -0px" @click.prevent.stop="excluirPet(pet)"/>
          <div class="row no-wrap q-pa-sm">
            <div class="col-auto row items-center">
              <q-avatar
                v-if="pet.foto_perfil"
                size="80px"
              >
                <img :src="pet.foto_perfil"/>
              </q-avatar>
              <q-avatar
                v-else
                class="text-center"
                color="primary"
                text-color="white"
                size="80px"
              >
                {{pegarAInicialDoOPrimeiroEUltimoNome(pet.nome)}}
              </q-avatar>
            </div>
            <div class="col row q-pl-md items-center">
              <div class="col-12">
                <div class="text-weight-light text-caption text-grey-7">{{'Nome:'}}</div>
                <q-item-label lines="1" class="text-subtitle1">{{pet.nome}}</q-item-label>
              </div>
              <div class="col-12 q-pt-xs">
                <div class="text-weight-light text-caption text-grey-7">{{'Data Nascimento:'}}</div>
                <q-item-label lines="1" class="text-subtitle1">{{pet.data_nascimento && pet.data_nascimento.length > 0 ? pet.data_nascimento : 'Não Informado'}}</q-item-label>
              </div>
            </div>
          </div>
          <q-separator/>
          <div class="row col-12 q-px-md q-py-sm">
            <div class="text-weight-light text-caption text-grey-7 col-12">{{'Descrição:'}}</div>
            <q-item-label lines="1" class="text-subtitle1">{{pet.descricao && pet.descricao.length > 0 ? pet.descricao : 'Não Informado'}}</q-item-label>
          </div>
        </q-card>
      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 10]">
        <q-btn fab icon="add" color="primary" @click="cadastrarNovoPet()"/>
      </q-page-sticky>
    </div>
    <div v-else class="col-12 row q-py-lg" style="height: 70vh">
      <q-icon name="remove_circle_outline" size="140px" color="red-8" class="justify-center items-center col-12 row"></q-icon>
      <span class="col-12 row justify-center text-center text-h6 q-px-lg">{{'Ainda não há nenhum pet cadastrado aqui'}}</span>
      <div class="column justify-end col-12">
        <q-btn class="full-width q-mt-md" color="primary" label="Cadastrar Pet"></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import { QInput, QPageSticky, QPopupProxy, QDate } from 'quasar';

  export default {
    components: {
      QInput,
      QPageSticky,
      QPopupProxy,
      QDate
    },
    data() {
      return {
        abrir_cadastro: false,
        cadastro_pet: {},
        meus_pets: [],
        liberarTela: false
      }
    },

    created () {
      this.buscarPet()
    },

    methods: {
      cadastrarNovoPet () {
        this.abrir_cadastro = true
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

      buscarPet() {
        this.$q.loading.show()
        Meteor.call('buscarPets', (error,result) => {
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
            console.log(result)
           this.meus_pets = result;
          }
          this.$q.loading.hide()
          this.liberarTela = true
        })
      },

      verificarSeEdicao () {
        if (this.cadastro_pet?._id) {
          this.editarPet(this.cadastro_pet)
        } else {
          this.salvarPet(this.cadastro_pet)
        }
      },

      salvarPet() {
        console.log(this.cadastro_pet)
        Meteor.call('adicionarPet', this.cadastro_pet, (error,result) => {
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
              message: 'Cadastrado com sucesso',
              type: 'success',
              color: 'green',
              timeout: 3500,
              multiLine: false,
              icon: 'check'
            })
            this.buscarPet()
          }
          this.abrir_cadastro = false
          this.cadastro_pet = {}
        })
      },

      abrirEdicao (pet) {
        this.abrir_cadastro = true
        this.cadastro_pet = pet
      },

      editarPet(pet) {
        //pet precisa ter ID, mas é pra ir o objeto inteiro
        Meteor.call('editarPet', pet, (error,result) => {
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
              message: 'Editado com sucesso',
              type: 'success',
              color: 'green',
              timeout: 3500,
              multiLine: false,
              icon: 'check'
            })
            this.buscarPet()
          }
          this.abrir_cadastro = false
          this.cadastro_pet = {}
        })
      },

      excluirPet(pet) {
        //só o id é suficiente
        Meteor.call('excluirPet', pet._id, (error,result) => {
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
              message: 'Excluído com sucesso',
              type: 'success',
              color: 'green',
              timeout: 3500,
              multiLine: false,
              icon: 'check'
            })
            this.buscarPet()
          }
        })
      }
    }
  }

</script>