<template>
  <q-page :class="$q.platform.is.desktop ? '' : ''">
    <div class=" q-pa-none">
      <q-toolbar>
        <q-toolbar-title v-if="$q.platform.is.desktop">
        </q-toolbar-title>
        <div :class="$q.platform.is.desktop ? '' : 'text-white'" class="fixed-top-left q-ma-xl" style="top: 10%">
          <div :class="$q.platform.is.desktop ? 'text-secondary' : 'text-white'" class="text-h4">Seja bem vindo(a) ao Busqpet</div>
          <div :class="$q.platform.is.desktop ? 'text-secondary' : 'text-white'" class="text-h4">Onde você encontra tudo para o seu pet</div>
        </div>
        <div
          :class="'col-xs-12 col-sm-12 col-md-6 text-center q-mt-sm q-pt-md'"
          :style="$q.platform.is.mobile ? 'width: 100%': ''"
        >
          <q-card
            :class="$q.platform.is.mobile ? 'q-pa-none bg-transparent text-black': 'q-ma-xl bg-white bordered-brand-bottom'"
            :flat="$q.platform.is.mobile"
          >
            <q-card-section>
              <span :class="$q.platform.is.mobile ? '' : 'q-mt-lg'" class="text-h5">{{'Cadastre-se agora'}}</span>
            </q-card-section>
            <q-card-section :class="$q.platform.is.mobile ? 'q-pa-none' : 'q-pa-lg q-pb-xl'">
              <q-form
                class="q-gutter-xs q-py[-none"
                ref="defaultForm"
                @submit="cadastrarColaborador()"
              >
                <q-input
                  filled
                  v-model="usuarioSelecionado.nome"
                  aria-autocomplete="false"
                  bg-color="grey-2"
                  label="Nome*"
                  :hint="$q.platform.is.mobile ? '' : 'Nome'"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Por favor informe seu nome']"
                  class="q-mb-md"
                >
                  <template v-slot:prepend>
                    <q-icon color="primary" name="person" />
                  </template>
                </q-input>
                <q-input
                  filled
                  v-model="usuarioSelecionado.documento"
                  aria-autocomplete="false"
                  bg-color="grey-2"
                  :mask="usuarioSelecionado.documento && usuarioSelecionado.documento.length <= 14 ? '###.###.###-###' : '##.###.###/####-##'"
                  label="CPF/CNPJ"
                  :hint="$q.platform.is.mobile ? '' : 'Seu cpf ou cnpj'"
                  lazy-rules
                  :rules="[ val => val && val.length === 14 || val && val.length === 18 || 'Digite um documento valido']"
                  class="q-mb-md"
                >
                  <template v-slot:prepend>
                    <q-icon color="primary" name="person" />
                  </template>
                </q-input>
                <q-input
                  filled
                  v-model="usuarioSelecionado.email"
                  aria-autocomplete="false"
                  bg-color="grey-2"
                  type="email"
                  label="E-mail *"
                  :hint="$q.platform.is.mobile ? '' : 'Seu e-mail de cadastro'"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Por favor informe seu e-mail']"
                  class="q-mb-md"
                >
                  <template v-slot:prepend>
                    <q-icon color="primary" name="email" />
                  </template>
                </q-input>

                <q-input
                  filled
                  :type="isPwd ? 'password' : 'text'"
                  v-model="senha"
                  bg-color="grey-2"
                  label="Senha *"
                  lazy-rules
                  :hint="$q.platform.is.mobile ? '' : 'Informe sua senha'"
                  :rules="[ val => val && val.length > 0 || 'Por favor informe sua senha']"
                  class="q-mb-md"
                >
                  <template v-slot:prepend>
                    <q-icon color="primary" name="vpn_key" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <div>
                  <q-btn
                    v-if="$q.platform.is.desktop"
                    :class="$q.platform.is.mobile ? 'full-width text-subtitle1': 'q-pl-lg q-pr-lg text-subtitle1'"
                    size="lg"
                    flat
                    label="Cancelar"
                    to="/login"
                    :loading="loading"
                  />
                  <q-btn
                    :class="$q.platform.is.mobile ? 'full-width text-subtitle1': 'q-pl-lg q-pr-lg text-subtitle1'"
                    size="lg"
                    :disable="usuarioSelecionado.nome === '' || usuarioSelecionado.id === '' || senha === ''"
                    label="Cadastrar"
                    type="submit"
                    color="primary"
                    :loading="loading"
                  />
                  <q-btn
                    v-if="$q.platform.is.mobile"
                    :class="$q.platform.is.mobile ? 'full-width text-subtitle1': 'q-pl-lg q-pr-lg text-subtitle1'"
                    size="lg"
                    flat
                    label="Cancelar"
                    to="/login"
                    :loading="loading"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>

      </q-toolbar>
    </div>
  </q-page>
</template>

<script>
  import {
    QPage,
    QToolbar,
    QToolbarTitle,
    QImg,
    QCard,
    QCardSection,
    QForm,
    QBtn,
    QInput,
    QIcon
  } from 'quasar';

  export default {
    data() {
      return {
        usuarioSelecionado: {
          documento: '',
          tipoDocumento: 1
        },
        senha: '',
        isPwd: true,
        loading: false,
      }
    },
  
    methods: {
      cadastrarColaborador () {
        if (this.usuarioSelecionado.documento.length > 14) {
          this.usuarioSelecionado.tipoDocumento = 2
        } else {
          this.usuarioSelecionado.tipoDocumento = 1
        }
        return Meteor.call('novoUsuario', this.usuarioSelecionado,this.senha, (error)=>{
          if (error) { this.$q.notify({
            progress: true,
            message: error.reason,
            type: 'warning',
            color: 'red',
            timeout: 3500,
            multiLine: false,
            icon: 'warning'
          }); }
          else {
            Meteor.call('fetchUser',this.login,(error,result)=>{
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
                this.$router.push({ name: 'produtos'})
                this.$store.commit('user/SET_USER', result)
              }
            })
            this.$q.notify({
              progress: true,
              message: 'Cadastrado com sucesso',
              type: 'sucess',
              color: 'green',
              timeout: 3500,
              multiLine: false,
              icon: 'check'
            })
            this.$router.push({ name: 'produtos'})
          }
        });
      }
    },

    components: {
      QPage,
      QToolbar,
      QToolbarTitle,
      QImg,
      QCard,
      QCardSection,
      QForm,
      QBtn,
      QInput,
      QIcon
    }
  }

</script>