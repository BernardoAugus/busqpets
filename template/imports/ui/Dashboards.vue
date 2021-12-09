<template>
  <div v-if="exibirTela" class=" bg-grey-1 col-12 row q-px-md">
    <div class="row justify-center items-center col-12 text-h6 text-primary q-pa-sm text-weight-ligth">
      {{'Home'}}
    </div>
    <div class="col-12 row">
      <div class="col-4 q-pa-sm text-center row">
        <q-card class="col-12 items-center justify-center row text-h6" flat :style="$q.platform.is.desktop ? 'height: 270px; border-radius: 20px' : 'height: 150px; border-radius: 20px'">
          <div class="col-12 text-h4">{{'Total Vendido'}}</div>
          <div class="text-h2 q-pb-xl">
            <div>R$: {{`${totalVendido}`}}</div>
            <div class="text-h4">({{`${quantidadePedidos}`}} Pedidos)</div>
          </div>
        </q-card>
      </div>
      <div class="col-8">
        <vue-apex-charts type="line" height="280" :options="configuracaoFaturamentoPorMes" :series="valoresFaturamentoPorMes"></vue-apex-charts>
      </div>
      <div class="col-6 row justify-center q-pa-sm">
        <vue-apex-charts type="pie" width="480" :options="quantidadesVendidaPorProduto" :series="quantidadesProduto"></vue-apex-charts>
      </div>
      <div class="col-6 row justify-center q-pa-sm">
        <vue-apex-charts type="pie" width="480" :options="valoresVendidosPorProduto" :series="valoresProduto"></vue-apex-charts>
      </div>
      <div class="col-6 row justify-center q-pa-sm">
        <vue-apex-charts type="pie" width="480" :options="quantidadesVendidaPorTipoDePet" :series="quantidadesEspecies"></vue-apex-charts>
      </div>
      <div class="col-6 row justify-center q-pa-sm">
        <vue-apex-charts type="pie" width="480" :options="valoresVendidosPorTipoDePet" :series="valoresEspecies"></vue-apex-charts>
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
  import VueApexCharts from 'vue-apexcharts'

  export default {
    data() {
      return {
        exibirTela: false,
        dashs: {},
        totalVendido: 0,
        quantidadePedidos: 0,
        series: [{
              name: "Desktops",
              data: [1000, 4100, 3500, 5100, 4900, 6200, 6900, 9100, 14800, 19100, 27800]
          }],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Faturamento por mês',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Out', 'Nov'],
          }
        },
        valoresFaturamentoPorMes: [{
          name: "Faturamento",
          type: 'column',
          data: []
        },{
          name: "Quantidade",
          type: 'line',
          data: []
        }],
        configuracaoFaturamentoPorMes: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Vendas por mês',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: [],
          },
          yaxis: [{
            title: {
              text: 'Faturamento (R$)',
            },
          
          }, {
            opposite: true,
            title: {
              text: 'Quantidade'
            }
          }]
        },
        quantidadesEspecies: [],
        quantidadesVendidaPorTipoDePet: {
          title: {
            text: 'Quantidade Vendida por Tipo de Pet',
            align: 'left'
          },
          chart: {
            width: 480,
            type: 'pie',
          },
          labels: [],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 400
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
        valoresEspecies: [],
        valoresVendidosPorTipoDePet: {
          title: {
            text: 'Faturamento por Tipo de Pet',
            align: 'left'
          },
          chart: {
            width: 480,
            type: 'pie',
          },
          labels: [],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 400
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
        quantidadesProduto: [],
        quantidadesVendidaPorProduto: {
          title: {
            text: 'Quantidade Vendida por Produto',
            align: 'left'
          },
          chart: {
            width: 480,
            type: 'pie',
          },
          labels: [],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 400
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
        valoresProduto: [],
        valoresVendidosPorProduto: {
          title: {
            text: 'Faturamento por Produto',
            align: 'left'
          },
          chart: {
            width: 480,
            type: 'pie',
          },
          labels: [],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 400
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
        opacoes_menu: [
          {
            nome: 'Cães',
            ir_para: '/dog/stores/',
            icon: 'dog.png'
          },
          {
            nome: 'Gatos',
            ir_para: '/cat/stores/',
            icon: 'cat.png'
          },
          {
            nome: 'Peixes',
            ir_para: '/fish/stores/',
            icon: 'fish.png'
          },
          {
            nome: 'Aves',
            ir_para: '/bird/stores/',
            icon: 'bird.png'
          },
          {
            nome: 'Roedores',
            ir_para: '/rat/stores/',
            icon: 'hamster.png'
          },
          {
            nome: 'Répteis',
            ir_para: '/reptil/stores/',
            icon: 'reptile.png'
          }
        ],
      }
    },
    components: {
      QList,
      QItem,
      QImg,
      VueApexCharts
    },

    mounted() {
      this.carregarDashs();
    },

    methods: {
      carregarDashs () {
        Meteor.call('aggregation', (error,result)=>{
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
            this.dashs = result
            this.totalVendido = result[0].totalDePedidos[0].totalFaturamento
            this.quantidadePedidos = result[0].totalDePedidos[0].totalPedidos
            for (const especie of result[0].especies) {
              console.log(especie.faturamentoTotal)
              this.valoresEspecies.push(parseFloat(especie?.faturamentoTotal.toFixed(2)))
              this.quantidadesEspecies.push(especie.itemsCompradors)
              this.valoresVendidosPorTipoDePet.labels.push(especie._id)
              this.quantidadesVendidaPorTipoDePet.labels.push(especie._id)
            }
            for (const produto of result[0].produtos) {
              this.valoresProduto.push(parseFloat(produto?.faturamentoTotal.toFixed(2)))
              this.quantidadesProduto.push(produto.itemsCompradors)
              this.valoresVendidosPorProduto.labels.push(produto._id)
              this.quantidadesVendidaPorProduto.labels.push(produto._id)
            }
            console.log(this.valoresFaturamentoPorMes)
            for (const pm of result[0].porMes) {
              console.log(pm, `pm`)
              this.valoresFaturamentoPorMes[0].data.push(pm.totalFaturamento)
              this.valoresFaturamentoPorMes[1].data.push(pm.totalPedidos)
              this.configuracaoFaturamentoPorMes.xaxis.categories.push(`${pm._id.mes}/${pm._id.ano}`)
            }
            console.log(this.valoresFaturamentoPorMes)
          }
          this.exibirTela = true
        })
      },
    }
  }

</script>