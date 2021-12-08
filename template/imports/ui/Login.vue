<template>
  <q-page :class="$q.platform.is.desktop ? '' : ''">
    <div>
      <q-toolbar>
        <q-toolbar-title v-if="$q.platform.is.desktop">
        </q-toolbar-title>
        <div :class="$q.platform.is.desktop ? '' : 'text-white'" class="fixed-top-left q-ma-xl" style="top: 10%">
          <div :class="$q.platform.is.desktop ? 'text-secondary' : 'text-white'" class="text-h4">Seja bem vindo(a) ao Busqpet</div>
          <div :class="$q.platform.is.desktop ? 'text-secondary' : 'text-white'" class="text-h4">Onde você encontra tudo para o seu pet</div>
        </div>
      <div
        :class="'col-sm-12 col-md-6 text-center q-mt-sm q-pt-md'"
        :style="$q.platform.is.mobile ? 'width: 100%': ''"
      >
        <q-card
          :class="$q.platform.is.mobile ? 'q-ma-xs q-pa-none bg-transparent text-white': 'q-ma-xl bg-white bordered-brand-bottom'"
          :flat="$q.platform.is.mobile"
        >
          <q-card-section :class="$q.platform.is.mobile ? 'q-py-lg' : 'q-pa-lg'">
            <span :class="$q.platform.is.mobile ? 'text-black' : ''" class="text-h4">Login</span><br>
          </q-card-section>
          <q-card-section :class="$q.platform.is.mobile ? 'q-pa-none' : 'q-py-none'">
            <q-form
              @submit="efetuarLogin(tipoUsuario)"
              :class="'q-gutter-md'"
              ref="defaultForm"
            >
              <q-input
                filled
                v-model="login"
                aria-autocomplete="false"
                bg-color="grey-2"
                type="email"
                label="Login *"
                :hint="$q.platform.is.mobile ? '' : 'Seu login de cadastro'"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Por favor informe seu login']"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-input>

              <q-input
                filled
                :type="isPwd ? 'password' : 'text'"
                v-model="senha"
                bg-color="grey-2"
                label="Sua senha *"
                lazy-rules
                :hint="$q.platform.is.mobile ? '' : 'Informe sua senha'"
                :rules="[ val => val && val.length > 0 || 'Por favor informe sua senha']"
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

              <div class="q-pb-xs">
                <q-btn
                  :class="$q.platform.is.mobile ? 'full-width text-subtitle1': 'q-pl-lg q-pr-lg text-subtitle1'"
                  size="lg"
                  :disable="senha === '' || login === ''"
                  label="Entrar"
                  type="submit"
                  color="primary"
                  :loading="loading"
                />
              </div>
            </q-form>
          </q-card-section>
          <q-card-section>
            <span class="text-body1">
              <router-link to="/esqueci-minha-senha" style="text-decoration: none">
                <strong class="text-secondary">{{'Esqueceu a senha?'}}</strong>
              </router-link>
              <br/>
              <router-link to="/novo-cadastro" style="text-decoration: none">
                <span :class="$q.platform.is.mobile ? 'text-black' : 'text-primary'">{{'Não é cadastrado?'}} <strong class="text-secondary">{{'Cadastre-se agora'}}</strong></span>
              </router-link>
            </span>
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
        login: 'teste@teste',
        senha: 'teste',
        tipoUsuario: 1,
        isPwd: true,
        loading: false,
      }
    },

    mounted() {
      this.$store.commit('user/CLEAR_USER');
    },

    methods: {
      efetuarLogin () {
      Meteor.loginWithPassword(this.login, this.senha, (error)=>{
        if(error){
          console.log(error.reason)
          this.$q.notify({
            progress: true,
            message: 'Usuário ou senha errado',
            type: 'error',
            color: 'red',
            timeout: 3500,
            multiLine: false,
            icon: 'error'
          })
        }
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
        }})
       
       // console.log('efetuar login')
      //  this.$router.push({ name: 'produtos'})
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