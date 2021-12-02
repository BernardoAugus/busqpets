<template>
  <div class=" bg-grey-1 col-12 row q-px-md">
    <div class="row justify-center items-center col-12 text-h6 text-primary q-pa-sm text-weight-ligth">
      {{'Home'}}
    </div>
    <div class="col-12 row">
      <div class="col-4 q-pa-sm text-center row">
        <q-card class="col-12 items-center justify-center row text-h6" flat :style="$q.platform.is.desktop ? 'height: 270px; border-radius: 20px' : 'height: 150px; border-radius: 20px'">
          <div class="col-12 text-h4">{{'Total Vendido'}}</div>
          <div class="text-h2 q-pb-xl">
            <div>R$: 14789.78</div>
            <div class="text-h4">(518 Vendas)</div>
          </div>
        </q-card>
      </div>
      <div class="col-8">
        <vue-apex-charts type="line" height="280" :options="chartOptions" :series="series"></vue-apex-charts>
      </div>
      <div class="col-9">
        <vue-apex-charts type="line" height="280" :options="chartOptions2" :series="series"></vue-apex-charts>
      </div>
      <div class="col-3">
        <vue-apex-charts type="pie" width="380" :options="chartOptions3" :series="series3"></vue-apex-charts>
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
        chartOptions2: {
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Out', 'Nov'],
          }
        },
        series3: [90, 55, 29, 22, 08],
          chartOptions3: {
            title: {
              text: 'Vendas por Tipo de Pet',
              align: 'left'
            },
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: ['Cachorros', 'Gatos', 'Roedores', 'Pássaros', 'Outros'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
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
    }
  }

</script>