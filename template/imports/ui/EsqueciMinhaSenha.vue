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
          :class="$q.platform.is.mobile ? 'q-ma-xs q-pa-none bg-transparent text-black': 'q-ma-xl bg-white bordered-brand-bottom'"
          :flat="$q.platform.is.mobile"
        >
          <q-card-section>
            <q-item-label class="text-h5 q-pa-sm">{{'Esqueci minha senha'}}</q-item-label>
            <q-item-label :class="$q.platform.is.mobile ? 'text-subtitle1 text-black' : 'text-subtitle1 text-grey-7'">{{'Enviaremos nos próximos minutos um link em seu email para que você possa criar uma nova senha'}}</q-item-label><br>
          </q-card-section>
          <q-card-section :class="$q.platform.is.mobile ? 'q-pa-none' : ''">
            <q-form
              class="q-gutter-md"
              ref="defaultForm"
              @submit="enviarEmail(emailDoUsuario)"
            >
              <q-input v-model="emailDoUsuario" bg-color="grey-2" color="secondary" class="row col-12 items-end text-subtitle1" ref="email" label="E-mail" type="email"
                  lazy-rules
                  filled
                  :rules="[
                    val => val && val.length > 0 || 'Esse campo não pode ficar em branco',
                    value => (value.includes('@',)) || 'Formato do e-mail invalido'
                  ]"
                >
                <template v-slot:prepend>
                  <q-icon color="primary" name="email" />
                </template>
              </q-input>

              <div :class="$q.platform.is.mobile ? 'row reverse' : 'row'" class="col-12 justify-end q-gutter-sm">
                <q-btn
                  v-if="$q.platform.is.desktop"
                  :class="$q.platform.is.mobile ? 'full-width': 'q-px-lg'"
                  size="lg"
                  :outline="!$q.platform.is.mobile"
                  flat
                  label="Cancelar"
                  to="/login"
                  color="black"
                />
                <q-btn
                  :class="$q.platform.is.mobile ? 'full-width': 'q-px-lg'"
                  size="lg"
                  label="Enviar"
                  type="submit"
                  color="primary"
                />
                <q-btn
                  v-if="$q.platform.is.mobile"
                  :class="$q.platform.is.mobile ? 'full-width': 'q-px-lg'"
                  size="lg"
                  :outline="!$q.platform.is.mobile"
                  flat
                  label="Cancelar"
                  to="/login"
                  color="black"
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
        emailDoUsuario: '',
        enviarEmail () {

        }
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