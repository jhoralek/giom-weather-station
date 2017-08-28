
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
               labelString: 'Time',
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
               labelString: 'Value',
               fontColor: '#ffffff'
             },
             ticks: {
               fontColor: '#ffffff'
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
           borderColor: '#E5E164',
           pointBackgroundColor: '#333333',
           borderwidth: 0,
           pointBordercolor: '#E5E164',
           backgroundColor: 'transparent',
           data: this.chartData
         }]
       }, this.options)
     }
   }
})
</script>
