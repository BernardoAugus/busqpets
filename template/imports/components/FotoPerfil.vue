<template>
  <q-avatar v-if="usuario_logado.foto_perfil">
    <img :src="usuario_logado.foto_perfil"/>
  </q-avatar>
  <q-avatar v-else class="text-center " color="primary" text-color="white">{{pegarAInicialDoOPrimeiroEUltimoNome(usuario_logado.nome)}}</q-avatar>
</template>

<script>
  export default {
    data() {
      return {
        usuario_logado: {
          nome: 'Bernardo Salgado'
        },
        opacoes_menu: [
          {
            nome: 'Cães'
          },
          {
            nome: 'Gatos'
          }
        ],
        counter: -1
      }
    }
  }

</script>