<template>
    <div class="container">
        <div class="tile is-ancestor">
            <div class="tile">
              <article class="tile is-child box is-11">
                  <p class="title">Denní teplota</p>
                  <p class="subtitle">Teplotní křivka vývoje teploty po půl hodině</p>
                  <line-chart :settings="dayTempSettings"></line-chart>
              </article>
            </div>
            <!-- <div class="tile">
              <article class="tile is-child box is-11">
                <p class="title">Průměrná teplota</p>
                <p class="subtitle">Průměrná měsíční teplota za celý rok</p>
                <bar-chart :settings="monthAvgSettings"></bar-chart>
              </article>
            </div> -->
            <div class="tile">
              <article class="tile is-child box is-11">
                  <p class="title">Aktuální teplota</p>
                  <p class="subtitle">Poslední naměřená teplota</p>
                  <div class="dounghnut_wrapper">
                    <doughnut-chart :settings="currentTemperature"></doughnut-chart>
                    <h1 class="doughnut_current_temp">{{ currentTemperature.currTemp }}</h1>
                  </div>
              </article>
            </div>            
            <div class="tile">
              <article class="tile is-child box is-11">
                  <p class="title">Min, Max, Průměr</p>
                  <p class="subtitle">Minimální, maximální a průměrná denní teplota za měsíc</p>
                  <multiline-chart :settings="minMaxAvgSettings"></multiline-chart>
              </article>
            </div>            
        </div>
    </div>
</template>

<script>
import LineChart from './LineChart'
import BarChart from './BarChart'
import MultilineChart from './MultiLineChart'
import DoughnutChart from './DoughnutChart'

import axios from 'axios'
import { Chart } from 'chart.js'

const color = Chart.helpers.color
const lineColor = '#98ddde'
const barColor = '#f7786b'
const maxMinAvgXaxesKey = 'day'

export default {
  components: {
    'lineChart': LineChart,
    'barChart': BarChart,
    'multilineChart': MultilineChart,
    'doughnutChart': DoughnutChart
  },
  data () {
    return {
      timer: '',
      dayTempSettings: this.initSettings(lineColor),
      monthAvgSettings: this.initSettings(barColor),
      minMaxAvgSettings: this.initMultiline([], ''),
      currentTemperature: this.initDoughnut('', 0, 50)
    }
  },
  created () {
    this.dayTemperatureData()
    this.monthAvgTemperatureData()
    this.maxMinAvgTemperatureData()
    this.getCurrentTemperateure()

    this.timer = setInterval(this.requestData, 240000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },

  methods: {
    getCurrentTemperateure () {
      axios.get('http://185.75.136.145:8888/?/current-temperature')
        .then(response => {
          this.currentTemperature = this.initDoughnut(
            this.$moment(response.data.created).format('DD.MM.YYYY HH:mm'),
            response.data.temperature,
            50)
        })
    },
    maxMinAvgTemperatureData () {
      axios.get('http://185.75.136.145:8888/?/max-temperature/8')
      .then(response => {
        this.minMaxAvgSettings = this.initMultiline(response.data, maxMinAvgXaxesKey)
      })
    },
    /**
     * Get temperature of current day
     *
     * @returns Array
     */
    dayTemperatureData () {
      axios.get('http://185.75.136.145:8888/?/current-day')
        .then(response => {
          this.dayTempSettings = this.initSettings(lineColor)
          // filter data only every 0 and 30 min. from hour
          let filtered = response.data.filter(item => {
            let minutes = new Date(item.created).getMinutes()
            return minutes === 0 || minutes === 30
          })
          // labels with time
          this.dayTempSettings.labels = filtered.map(item => {
            return item.created.substring(11, item.created.length - 3)
          })
          // temperature
          this.dayTempSettings.data = filtered.map(item => {
            return item.temperature
          })
        })
    },
    /**
     * Get month average temperature
     *
     * @returns Array
     */
    monthAvgTemperatureData () {
      let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      axios.get('http://185.75.136.145:8888/?/months-avg-temp/' + months.join())
       .then(response => {
         this.monthAvgSettings = this.initSettings(barColor)

         this.monthAvgSettings.labels = months.map(month => {
           return this.$moment.months(month - 1)
         })
         this.monthAvgSettings.data = months.map(month => {
           let temperature = response.data.map(item => {
             let dataMonth = this.$moment('1-' + item.created, 'DD-MM-YYYY').month() + 1
             return month === dataMonth ? item.temperature : 0
           })
           return parseFloat(temperature).toFixed(2)
         })
       })
    },
    /**
     * Init settings for all graphs
     *
     * @returns Object of settings
     */
    initSettings (pColor) {
      return {
        background: color(pColor).alpha(0.3).rgbString(),
        pointBackground: pColor,
        borderColor: pColor,
        labels: [],
        data: [],
        callback: function (value) { return value + ' C°' }
      }
    },

    initDoughnut (label, value, max) {
      return {
        currTemp: value + ' C°',
        datasets: [{
          data: [value, max - value],
          backgroundColor: [ this.getDoughnutTempColor(value), 'white' ],
          hoverBackgroundColor: [ this.getDoughnutTempColor(value), 'white' ],
          borderWidth: 0
        }],
        labels: [label]
      }
    },

    getDoughnutTempColor (temperature) {
      let pColor = '#ffffff'

      if (temperature > -30) {
        pColor = 'violet'
      }
      if (temperature > -20) {
        pColor = 'blue'
      }
      if (temperature > -10) {
        pColor = 'teal'
      }
      if (temperature > 0) {
        pColor = 'green'
      }
      if (temperature > 10) {
        pColor = 'yellow'
      }
      if (temperature > 20) {
        pColor = 'orange'
      }
      if (temperature > 30) {
        pColor = 'red'
      }
      if (temperature > 35) {
        pColor = 'magenta'
      }
      if (temperature > 40) {
        pColor = 'purple'
      }

      return pColor
    },

    initMultiline (dataObj, xAxesKey) {
      const fontColor = '#000000'

      const tick = {
        fontColor: fontColor,
        min: -20,
        max: 40,
        stepSize: 5,
        callback: function (value) { return value + ' C°' }
      }

      const yAxes = [{
        display: true,
        scaleLabel: {
          type: 'linear',
          display: true,
          fontColor: fontColor
        },
        ticks: tick
      }]

      if (dataObj.length > 0) {
        const datasets = []
        const firstRow = dataObj[0]
        const colors = ['#ccffcc', '#ffaaff', '#6F5E55']
        Object.keys(firstRow).forEach(function (key, index) {
          if (key !== xAxesKey) {
            datasets.push({
              label: key,
              data: dataObj.map(x => parseFloat(x[key]).toFixed(1)),
              yAxesID: 'y-axes-' + index,
              fill: true,
              borderColor: colors[index],
              backgroundColor: color(colors[index]).alpha(0.1).rgbString(),
              borderWidth: 1
            })
          }
        })

        return {
          labels: dataObj.map(item => this.$moment(item[xAxesKey], 'DD-MM-YYYY').format('DD.MM.YYYY')),
          datasets: datasets,
          yAxes: []
        }
      }
      // return empty for initialization befor data load
      return {
        labels: [],
        datasets: [],
        yAxes: yAxes
      }
    },
    /**
     * When dashboard is closed, then timer is disposed
     *
     * @returns void
     */
    cancelAutoUpdate: function () {
      clearInterval(this.timer)
    }
  }
}
</script>

<<style>
.doughnut_current_temp {
  font-weight: 600;
  font-size: 25pt;
  position: absolute;
  bottom: 70px;
  left: 115px;
}

.dounghnut_wrapper {
  position: relative;
}

</style>
