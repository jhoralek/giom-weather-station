<script>
import { Bar } from 'vue-chartjs'

export default Bar.extend({
  name: 'barChart',
  props: {
    chartName: {
      type: String,
      default: ''
    },
    dataTypeName: {
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
        responsive: true,
        legend: {
          display: true,
          fontColor: '#ffffff'
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
          label: this.dataTypeName,
          data: this.chartData
        }]
      }, this.options)
    }
  }
})
</script>
