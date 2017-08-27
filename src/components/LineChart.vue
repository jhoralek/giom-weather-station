
<script>
 import { Line } from 'vue-chartjs'

export default Line.extend({
   name: 'lineChart',
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
         title: {
           display: true,
           text: this.chartName
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
               labelString: 'Month'
             }
           }],
           yAxes: [{
             display: true,
             scaleLabel: {
               display: true,
               labelString: 'Value'
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
           label: this.dataTypeName,
           borderColor: '#249EBF',
           pointBackgroundColor: 'white',
           borderwidth: 0,
           pointBordercolor: '#249EBF',
           backgroundColor: 'transparent',
           data: this.chartData
         }]
       }, this.options)
     }
   }
})
</script>
