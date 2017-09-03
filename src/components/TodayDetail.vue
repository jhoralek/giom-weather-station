<template>
    <div class="container">
        <h1 class="title">Teplota v období "{{ dateRangeFormat() }}" <span class="subtitle"> měřeny {{ measuringTimePeriodFormat() }}</span></h1>
        <b-tabs type="is-boxed">
            <b-tab-item label="Graf">
                <div class="container" id="chart" style="position: relative; height: 40vh">
                    <line-chart :settings="data"></line-chart>
                </div>
            </b-tab-item>
            <b-tab-item label="Tabulka">
              <data-table :data="dataTable"></data-table>
            </b-tab-item>
    </b-tabs>
    </div>
</template>

<script>
import LineChart from './charts/LineChart'
import DataTable from './datatables/DataTable'
import { Chart } from 'chart.js'

import axios from 'axios'

const color = Chart.helpers.color
const lineColor = '#98ddde'
const now = new Date()

export default {
  components: {
    'lineChart': LineChart,
    'dataTable': DataTable
  },
  data () {
    return {
      loading: this.$loading.open(),
      since: now,
      until: now,
      measuringTimePeriod: 5, // in minutes
      data: this.initSettings(lineColor),
      dataTable: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      axios.get(`http://185.75.136.145:8888/?/since/${this.queryDateFormat(this.since)}/until/${this.queryDateFormat(this.until)}`)
        .then(response => {
          this.data = this.initSettings(lineColor)
          // filter data only every 0 and 30 min. from hour
          this.dataTable = response.data.filter(item => {
            let minutes = new Date(item.created).getMinutes()
            return minutes === 0 || minutes === 30
          })
          // labels with time
          this.data.labels = this.dataTable.map(item => {
            return item.created.substring(11, item.created.length - 3)
          })
          // temperature
          this.data.data = this.dataTable.map(item => {
            return item.temperature
          })
          this.loading.close()
        })
    },

    initSettings (pColor) {
      return {
        aspectRatio: false,
        background: color(pColor).alpha(0.3).rgbString(),
        pointBackground: pColor,
        borderColor: pColor,
        labels: [],
        data: [],
        dataTable: [],
        callback: function (value) { return value + ' C°' }
      }
    },

    dateRangeFormat () {
      const dateText = 'dnes'

      if (this.since !== this.until) {
        return `od ${this.dateFormat(this.since)} do ${this.dateFormat(this.until)}`
      }

      return dateText
    },

    dateFormat (date) {
      return this.$moment(date).format('DD.MM.YYYY')
    },

    queryDateFormat (date) {
      return this.$moment(date).format('YYYY-MM-DD')
    },

    measuringTimePeriodFormat () {
      if (this.measuringTimePeriod < 60) {
        return `po ${this.measuringTimePeriod} minutách`
      }

      if (this.measuringTimePeriod > 60 && this.measuringTimePeriod < 1440) {
        return `po ${this.$moment().minutes(this.measuringTimePeriod).format('HH:mm')} hodinách`
      }

      if (this.measuringTimePeriod > 1440) {
        return `po ${this.$moment().minutes(this.measuringTimePeriod).format('DD')} dnech`
      }
    }
  }
}
</script>
