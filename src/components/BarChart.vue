<script>
import { Bar } from 'vue-chartjs'

export default Bar.extend({
  name: 'barChart',
  props: {
    settings: {
      type: Object,
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
              callback: this.settings.callback || function (val) { return val },
              fontColor: this.settings.fontColor || '#000000'
            },
            scaleLabel: {
              display: true,
              fontColor: this.settings.fontColor || '#000000',
              labelString: this.settings.yLabelName || ''
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: this.settings.fontColor || '#000000'
            },
            scaleLabel: {
              display: true,
              fontColor: this.settings.fontColor || '#000000',
              labelString: this.settings.xLabelName || ''
            },
            barPercentage: 1
          }]
        },
        responsive: true,
        legend: {
          display: true,
          labels: {
            fontColor: this.settings.fontColor || '#000000'
          }
        },
        title: {
          display: true,
          text: this.settings.name || '',
          fontColor: this.settings.fontColor || '#000000'
        }
      }
    }
  },
  mounted () {
    this.render()
  },
  watch: {
    settings: function (val) {
      this.render()
    }
  },
  methods: {
    render () {
      this.renderChart({
        labels: this.settings.labels,
        datasets: [{
          backgroundColor: this.settings.background || 'transparent',
          borderColor: this.settings.borderColor || '#000000',
          borderWidth: this.settings.borderWidth || 1,
          label: this.settings.yLabelName || '',
          data: this.settings.data
        }]
      }, this.options)
    }
  }
})
</script>
