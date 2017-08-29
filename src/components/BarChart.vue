<script>
import { Bar } from 'vue-chartjs'
import { Chart } from 'chart.js'

const color = Chart.helpers.color

export default Bar.extend({
  name: 'barChart',
  props: {
    chartName: {
      type: String,
      default: ''
    },
    yLabel: {
      type: String,
      default: ''
    },
    xLabel: {
      type: String,
      default: ''
    },
    chartData: {
      type: Array,
      required: false
    },
    chartLabels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 30,
              callback: function (value) { return value + ' C°' },
              fontColor: '#ffffff'
            },
            scaleLabel: {
              display: true,
              fontColor: '#ffffff',
              labelString: this.yLabel
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: '#ffffff'
            },
            scaleLabel: {
              display: true,
              fontColor: '#ffffff',
              labelString: this.xLabel
            },
            barPercentage: 1
          }]
        },
        responsive: true,
        legend: {
          display: true,
          labels: {
            fontColor: '#ffffff'
          }
        },
        title: {
          display: true,
          text: this.chartName,
          fontColor: '#ffffff'
        }
      }
    }
  },
  mounted () {
    this.render()
  },
  watch: {
    chartLabels: function (val) {
      this.render()
    }
  },
  methods: {
    render () {
      this.renderChart({
        labels: this.chartLabels,
        datasets: [{
          backgroundColor: color('#BAFFC9').alpha(0.3).rgbString(),
          borderColor: '#BAFFC9',
          borderWidth: 1,
          label: this.yLabel,
          data: this.chartData
        }]
      }, this.options)
    }
  }
})
</script>
