
<script>
const baseColor = '#000000'

import { Line } from 'vue-chartjs'

export default Line.extend({
  name: 'lineChart',
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      options: {
        responsive: true,
        title: {
          display: true,
          text: this.settings.name || '',
          fontColor: this.settings.fontColor || baseColor
        },
        legend: {
          display: true,
          labels: {
            fontColor: this.settings.fontColor || baseColor
          }
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.settings.xLabelName || '',
              fontColor: this.settings.fontColor || baseColor
            },
            ticks: {
              fontColor: this.settings.fontColor || baseColor
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.settings.yLabelName || '',
              fontColor: this.settings.fontColor || baseColor
            },
            ticks: {
              fontColor: this.settings.fontColor || baseColor,
              min: -20,
              max: 40,
              stepSize: 5,
              callback: this.settings.callback || function (val) { return val }
            }
          }]
        }
      }
    }
  },
  watch: {
    settings: function (val) {
      this.render()
    }
  },
  mounted () {
    this.render()
  },
  methods: {
    render () {
      this.renderChart({
        labels: this.settings.labels,
        datasets: [{
          label: this.settings.yLabelName || '',
          borderColor: this.settings.borderColor || baseColor,
          pointBackgroundColor: this.settings.pointBackground || baseColor,
          borderwidth: this.settings.borderWidth || 0,
          pointBordercolor: this.settings.pointBorderColor || baseColor,
          backgroundColor: this.settings.background || 'transparent',
          data: this.settings.data
        }]
      }, this.options)
    }
  }
})
</script>
