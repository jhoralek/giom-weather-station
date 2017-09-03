<template>
    <div class="container">
        <div class="tile is-ancestor">
            <dashboard-item :content="dayTempSettings"></dashboard-item>      
            <dashboard-item :content="currentTemperature"></dashboard-item>
            <dashboard-item :content="minMaxAvgSettings"></dashboard-item>            
        </div>
    </div>
</template>

<script>
import DashboardItem from './DashboardItem'

import axios from 'axios'
import { Chart } from 'chart.js'

const color = Chart.helpers.color
const lineColor = '#98ddde'
const barColor = '#f7786b'
const maxMinAvgXaxesKey = 'day'

export default {
  components: {
    'dashboardItem': DashboardItem
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
      const currentMonth = this.$moment(new Date()).month() + 1

      axios.get(`http://185.75.136.145:8888/?/max-temperature/${currentMonth}`)
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
             let dataMonth = this.$moment('1-' + item.month, 'DD-MM-YYYY').month() + 1
             return month === dataMonth ? parseFloat(item.temperature) : 0
           })
           return temperature.reduce(function (sum, val) { return (sum + val).toFixed(1) })
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
        type: 'lineChart',
        title: 'Denní teplota',
        subTitle: 'Teplotní křivka vývoje teploty po půl hodině',
        showButton: true,
        aspectRation: true,
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
        type: 'halfDoughnut',
        title: 'Aktuální teplota',
        subTitle: 'Poslední naměřená teplota',
        showButton: false,
        aspectRation: true,
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
          type: 'multilineChart',
          title: 'Min, Max, Průměr',
          subTitle: 'Minimální, maximální a průměrná denní teplota za měsíc',
          showButton: false,
          aspectRation: true,
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
