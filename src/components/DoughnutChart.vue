<script>
const baseColor = '#000000'

import { Doughnut } from 'vue-chartjs'

export default Doughnut.extend({
  name: 'doughnutChart',
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
        legend: {
          display: this.settings.legend || true,
          fontColor: this.settings.fongColor || baseColor
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        cutoutPercentage: 60,
        rotation: Math.PI,
        circumference: Math.PI
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
