<template>
  <div v-if="liberarTela" class="q-pa-sm">
    <div class="row justify-center items-center col-12 text-h5 q-pa-sm text-weight-light text-primary">
      {{'Meu Perfil'}}
    </div>
    <div class="row no-wrap">
      <div class="col-auto row items-center">
        <q-avatar
          v-if="usuario_logado.profile.foto_perfil"
          size="100px"
        >
          <img :src="usuario_logado.profile.foto_perfil"/>
        </q-avatar>
        <q-avatar
          v-else
          class="text-center"
          color="primary"
          text-color="white"
          size="100px"
        >
          {{pegarAInicialDoOPrimeiroEUltimoNome(usuario_logado.profile.name)}}
        </q-avatar>
      </div>
      <div class="col row q-pl-md items-center">
        <div class="col-12">
          <div class="text-weight-light text-caption text-grey-7">{{this.usuario_logado.profile.tipo === 1 ? 'Loja:' : 'Nome:'}}</div>
          <q-item-label lines="1" class="text-subtitle1">{{usuario_logado.profile.name}}</q-item-label>
        </div>
        <div v-if="this.usuario_logado.profile.tipo === 2" class="col-12 q-pt-xs">
          <div class="text-weight-light text-caption text-grey-7">{{'Pets:'}}</div>
          <q-item-label lines="1" class="text-subtitle1">{{usuario_logado.qtd_animais || 0}}</q-item-label>
        </div>
      </div>
    </div>
    <q-separator class="q-mt-lg q-mb-md"/>
    <q-form class="row col-12" @submit="salvarDados">
      <div class="row col-12 text-h6 text-weight-light text-primary">
        {{'Dados Pessoais'}}
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 q-pa-xs row q-pt-sm">
        <div class="text-grey-7">{{'Nome:'}}</div>
        <q-input v-model="usuario_logado.profile.name" class="col-12" outlined dense />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 q-pa-xs row q-pt-sm">
        <div class="text-grey-7">{{'Email:'}}</div>
        <q-input readonly v-model="usuario_logado.emails[0].address" class="col-12" outlined dense/>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 q-pa-xs row q-pt-sm">
        <div class="text-grey-7">{{'Celular:'}}</div>
        <q-input v-model="usuario_logado.profile.celular" mask="(##) #####-####" class="col-12" outlined dense/>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 q-pa-xs row q-pt-sm">
        <div class="text-grey-7">{{'CPF/CNPJ:'}}</div>
        <q-input readonly v-model="usuario_logado.profile.documento" class="col-12" outlined dense :mask="usuario_logado.profile.documento <= 14 ? '###.###.###-###' : '##.###.###/####-##'"/>
      </div>
      <q-separator class="q-mt-lg q-mb-md col-12" size="1px"/>
      <div class="row col-12 text-h6 text-weight-light text-primary">
        {{'Endereço'}}
      </div>
      <div class="col-xs-12 col-sm-6 col-md-5 q-pt-sm q-pa-xs">
        <div class="text-grey-7">{{'CEP:'}}</div>
        <q-input v-model="endereco.cep" mask="#####-###" class="col-12" outlined dense />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-7 q-pt-sm q-pa-xs">
        <div class="text-grey-7">{{'Rua / Avenida:'}}</div>
        <q-input v-model="endereco.rua" class="col-12" outlined dense />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 row q-pt-sm q-pa-xs q-pr-xs">
        <div class="text-grey-7">{{'Número:'}}</div>
        <q-input v-model="endereco.numero" mask="##############" class="col-12" outlined dense />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 row q-pt-sm q-pa-xs q-pl-xs">
        <div class="text-grey-7">{{'Complemento:'}}</div>
        <q-input v-model="endereco.complemento" class="col-12" outlined dense />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 q-pt-sm q-pa-xs">
        <div class="text-grey-7">{{'Bairro:'}}</div>
        <q-input v-model="endereco.bairro" class="col-12" outlined dense />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 q-pt-sm q-pa-xs">
        <div class="text-grey-7">{{'Cidade:'}}</div>
        <q-input v-model="endereco.cidade" class="col-12" outlined dense />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 q-pt-sm q-pa-xs">
        <div class="text-grey-7">{{'UF:'}}</div>
        <q-select v-model="endereco.uf" :options="states" emit-value map-options class="col-12" outlined dense />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 q-pt-sm q-pa-xs">
        <div class="text-grey-7">{{'País:'}}</div>
        <q-input v-model="endereco.pais" class="col-12" outlined dense />
      </div>
      <div class="col-12 row justify-end row q-pt-md">
        <q-btn label="Salvar" :class="$q.platform.is.mobile ? 'full-width' : 'q-pa-xs'" color="primary" type="submit" />
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
        liberarTela: false,
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
        endereco: {
          cep: '',
          rua: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          uf: '',
          pais: ''
        },
        usuario_logado: {
          profile: {
            name:'',
          },
          emails:[{address:''}],
        },
      }
    },
    mounted() {
      this.$q.loading.show()
      this.usuario_logado = this.$store.state.user.user;
      if (this.usuario_logado.profile.endereco) {
        this.endereco = this.usuario_logado.profile.endereco
      }
      this.buscarPet()
    },
    methods: {
      buscarPet() {
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
            console.log(result.length)
            this.usuario_logado.qtd_animais = result.length;
          }
          this.$q.loading.hide()
          this.liberarTela = true
        })
      },

      async verificarCEP(usuario_logado) {
        debbuger
        if (usuario_logado.endereco?.cep?.length == 9) {
          try {
            loading.value = true
            const { data } = await getCep(usuario_logado.cep)
            usuario_logado.rua = data.rua
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
          const usuario = {
            name: this.usuario_logado.profile.name,
            email: this.usuario_logado.emails[0].address,
            documento: this.usuario_logado.profile.documento,
            telefone: this.usuario_logado.profile.celular,
            endereco: {
              cep: this.endereco.cep || '',
              rua: this.endereco.rua || '',
              numero: this.endereco.numero || '',
              complemento: this.endereco.complemento || '',
              bairro: this.endereco.bairro || '',
              cidade: this.endereco.cidade || '',
              uf: this.endereco.uf || '',
              pais: this.endereco.pais || ''
            }
          };

          Meteor.call('editarUsuario', usuario,(error)=>{
            if(error){ 
              this.$q.notify({
                progress: true,
                message: error.reason,
                type: 'error',
                color: 'red',
                timeout: 3500,
                multiLine: false,
                icon: 'warning'
              })
            }
            else{
              this.$q.notify({
                progress: true,
                message: 'Salvo com sucesso',
                type: 'success',
                color: 'green',
                timeout: 3500,
                multiLine: false,
                icon: 'check'
              })
              this.$router.push('/produtos')
            }
          })
        } finally {}
      }
    }
  }

</script>