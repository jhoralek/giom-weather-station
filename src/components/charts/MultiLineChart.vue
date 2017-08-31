<script>
const baseColor = '#000000'

import { Line } from 'vue-chartjs'

export default Line.extend({
  name: 'multilineChart',
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
        hoverMode: 'index',
        stacked: false,
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
          yAxes: this.settings.yAxes
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
        datasets: this.settings.datasets
      }, this.options)
    }
  }
})
</script>