<template>
    <div class="container">
        <div class="tile is-ancestor">
            <div class="tile">
              <article class="tile is-child box is-8">
                  <p class="title">Denní teplota</p>
                  <p class="subtitle">Teplotní křivka vývoje teploty po půl hodině</p>
                  <line-chart :ysettings="dayTempSettings"></line-chart>
              </article>
            </div>
            <div class="tile">
              <article class="tile is-child box is-8">
                <p class="title">Průměrná teplota</p>
                <p class="subtitle">Průměrná měsíční teplota za celý rok</p>
                <bar-chart :settings="monthAvgSettings"></bar-chart>
              </article>
            </div>
        </div>
    </div>
</template>

<script>
import LineChart from './LineChart'
import BarChart from './BarChart'

import axios from 'axios'
import { Chart } from 'chart.js'

const color = Chart.helpers.color
const lineColor = '#98ddde'
const barColor = '#f7786b'

export default {
  components: {
    'lineChart': LineChart,
    'barChart': BarChart
  },
  data () {
    return {
      timer: '',
      dayTempSettings: this.initSettings(lineColor),
      monthAvgSettings: this.initSettings(barColor)
    }
  },
  created () {
    this.dayTemperatureData()
    this.monthAvgTemperatureData()
    this.timer = setInterval(this.requestData, 240000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },

  methods: {
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
