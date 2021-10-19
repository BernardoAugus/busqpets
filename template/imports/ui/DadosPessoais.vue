<template>
  <div class="q-pa-sm">
    <div class="row justify-center items-center col-12 text-h5 q-pa-sm text-weight-light text-primary">
      {{'Perfil'}}
    </div>
    <div class="row no-wrap">
      <div class="col-auto row items-center">
        <q-avatar
          v-if="usuario_logado.foto_perfil"
          size="100px"
        >
          <img :src="usuario_logado.foto_perfil"/>
        </q-avatar>
        <q-avatar
          v-else
          class="text-center"
          color="primary"
          text-color="white"
          size="100px"
        >
          {{pegarAInicialDoOPrimeiroEUltimoNome(usuario_logado.nome)}}</q-avatar>
      </div>
      <div class="col row q-pl-md items-center">
        <div class="col-12">
          <div class="text-weight-light text-caption text-grey-7">{{'Nome:'}}</div>
          <q-item-label lines="1" class="text-subtitle1">{{usuario_logado.nome}}</q-item-label>
        </div>
        <div class="col-12 q-pt-xs">
          <div class="text-weight-light text-caption text-grey-7">{{'Pets:'}}</div>
          <q-item-label lines="1" class="text-subtitle1">{{usuario_logado.qtd_animais}}</q-item-label>
        </div>
      </div>
    </div>
    <q-separator class="q-mt-lg q-mb-md"/>
    <q-form class="row col-12" @submit="salvarDados">
      <div class="row col-12 text-h6 text-weight-light text-primary">
        {{'Dados Pessoais'}}
      </div>
      <div class="col-12 row q-pt-xs">
        <div class="text-grey-7">{{'Nome:'}}</div>
        <q-input v-model="usuario_logado.nome" class="col-12" outlined dense />
      </div>
      <div class="col-12 row q-pt-sm">
        <div class="text-grey-7">{{'Email:'}}</div>
        <q-input v-model="usuario_logado.email" class="col-12" outlined dense/>
      </div>
      <div class="col-12 row q-pt-sm">
        <div class="text-grey-7">{{'Celular:'}}</div>
        <q-input v-model="usuario_logado.celular" mask="(##) #####-####" class="col-12" outlined dense/>
      </div>
      <q-separator class="q-mt-lg q-mb-md col-12" size="1px"/>
      <div class="row col-12 text-h6 text-weight-light text-primary">
        {{'Endereço'}}
      </div>
      <div class="col-12 row q-pt-xs">
        <div class="text-grey-7">{{'CEP:'}}</div>
        <q-input v-model="usuario_logado.cep" mask="#####-###" class="col-12" outlined dense />
      </div>
      <div class="col-12 row q-pt-sm">
        <div class="text-grey-7">{{'Rua / Avenida:'}}</div>
        <q-input v-model="usuario_logado.logradouro" class="col-12" outlined dense />
      </div>
      <div class="col-4 row q-pt-sm q-pr-xs">
        <div class="text-grey-7">{{'Número:'}}</div>
        <q-input v-model="usuario_logado.numero" class="col-12" outlined dense />
      </div>
      <div class="col-8 row q-pt-sm q-pl-xs">
        <div class="text-grey-7">{{'Complemento:'}}</div>
        <q-input v-model="usuario_logado.complemento" class="col-12" outlined dense />
      </div>
      <div class="col-12 row q-pt-sm">
        <div class="text-grey-7">{{'Bairro:'}}</div>
        <q-input v-model="usuario_logado.bairro" class="col-12" outlined dense />
      </div>
      <div class="col-12 row q-pt-sm">
        <div class="text-grey-7">{{'Cidade:'}}</div>
        <q-input v-model="usuario_logado.cidade" class="col-12" outlined dense />
      </div>
      <div class="col-12 row q-pt-sm">
        <div class="text-grey-7">{{'UF:'}}</div>
        <q-input v-model="usuario_logado.uf" class="col-12" outlined dense />
      </div>
      <div class="col-12 row q-pt-sm">
        <div class="text-grey-7">{{'País:'}}</div>
        <q-input v-model="usuario_logado.pais" class="col-12" outlined dense />
      </div>
      <div class="col-12 row q-pt-md">
        <q-btn label="Salvar" class="full-width" color="primary" type="submit" />
      </div>
    </q-form>
  </div>
</template>

<script>
  import { QInput } from 'quasar';
  // import { getCep } from 'template/imports/server/cep.js'

  export default {
    components: {
      QInput
    },
    data() {
      return {
        usuario_logado: {
          nome: 'Bernardo Salgado',
          email: 'bernardo@teste',
          celular: 31999999999,
          cep: 99999999,
          qtd_animais: 3
        },
      }
    },
    methods: {
      async verificarCEP(usuario_logado) {
        debbuger
        if (usuario_logado.cep.length == 9) {
          try {
            loading.value = true
            const { data } = await getCep(usuario_logado.cep)
            usuario_logado.logradouro = data.logradouro
            usuario_logado.bairro = data.bairro
            usuario_logado.complemento = data.complemento
            usuario_logado.cidade = data.localidade
            usuario_logado.uf = data.uf
            if (data.erro) {
              swal.fire({
                icon: 'error',
                showCloseButton: true,
                title: `CEP ${endereco.cep} não encontrado`,
              })
            }
          } finally {
            loading.value = false
          }
        }
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

      salvarDados () {
        try {
          this.$q.notify({
            progress: true,
            message: 'Salvo com sucesso',
            type: 'sucess',
            color: 'green',
            timeout: 3500,
            multiLine: false,
            icon: 'check'
          })
          this.$router.push('/inicio')
        } finally {}
      }
    }
  }

</script>