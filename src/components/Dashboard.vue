<template>
    <div class="container">
        <div class="tile is-ancestor">
            <div clase="tile">
                <article class="tile is-child box">
                    <p class="title">Denní teplota</p>
                    <p class="subtitle">Teplotní křivka vývoje teploty po půl hodině</p>
                    <line-chart :settings="dayTempSettings"></line-chart>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
import LineChart from './LineChart'
import axios from 'axios'
import { Chart } from 'chart.js'

const color = Chart.helpers.color
const lineColor = '#ff9595'

export default {
  components: {
    'lineChart': LineChart
  },
  data () {
    return {
      timer: '',
      dayTempSettings: this.dayTemperatureInit()
    }
  },
  created () {
    this.dayTemperatureData()
    this.timer = setInterval(this.requestData, 240000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },

  methods: {
    dayTemperatureData () {
      axios.get('http://185.75.136.145:8888/?/current-day')
        .then(response => {
          this.dayTempSettings = this.dayTemperatureInit()
          console.log(this.settings)
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
    cancelAutoUpdate: function () { clearInterval(this.timer) },
    dayTemperatureInit () {
      return {
        background: color(lineColor).alpha(0.3).rgbString(),
        pointBackground: lineColor,
        borderColor: lineColor,
        labels: [],
        data: [],
        callback: function (value) { return value + ' C°' }
      }
    }
  }
}
</script>

