
<script>
 import { Line } from 'vue-chartjs'

export default Line.extend({
   name: 'lineChart',
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
       type: Array | Object,
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
         maintainAspectRatio: false,
         title: {
           display: true,
           text: this.chartName,
           fontColor: '#ffffff'
         },
         legend: {
           display: true,
           labels: {
             fontColor: '#ffffff'
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
               labelString: this.xLabel,
               fontColor: '#ffffff'
             },
             ticks: {
               fontColor: '#ffffff'
             }
           }],
           yAxes: [{
             display: true,
             scaleLabel: {
               display: true,
               labelString: this.yLabel,
               fontColor: '#ffffff'
             },
             ticks: {
               fontColor: '#ffffff',
               min: -20,
               max: 40,
               stepSize: 5,
               callback: function (value) { return value + ' C°' }
             }
           }]
         }
       }
     }
   },
   watch: {
     chartLabels: function (val) {
       this.render()
     }
   },
   mounted () {
     this.render()
   },
   methods: {
     render () {
       this.renderChart({
         labels: this.chartLabels,
         datasets: [{
           label: this.yLabel,
           borderColor: '#E5E164',
           pointBackgroundColor: '#333333',
           borderwidth: 0,
           pointBordercolor: '#E5E164',
           backgroundColor: '#E5E164',
           data: this.chartData
         }]
       }, this.options)
     }
   }
})
</script>
