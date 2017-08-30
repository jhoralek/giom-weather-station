
<script>
 import { Line } from 'vue-chartjs'

export default Line.extend({
   name: 'lineChart',
   props: {
     ysettings: {
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
           text: this.ysettings.name || '',
           fontColor: this.ysettings.fontColor || '#000000'
         },
         legend: {
           display: true,
           labels: {
             fontColor: this.ysettings.fontColor || '#000000'
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
               labelString: this.ysettings.xLabelName || '',
               fontColor: this.ysettings.fontColor || '#000000'
             },
             ticks: {
               fontColor: this.ysettings.fontColor || '#000000'
             }
           }],
           yAxes: [{
             display: true,
             scaleLabel: {
               display: true,
               labelString: this.ysettings.yLabelName || '',
               fontColor: this.ysettings.fontColor || '#000000'
             },
             ticks: {
               fontColor: this.ysettings.fontColor || '#000000',
               min: 0,
               max: 35,
               stepSize: 5,
               callback: this.ysettings.callback || function (val) { return val }
             }
           }]
         }
       }
     }
   },
   watch: {
     ysettings: function (val) {
       this.render()
     }
   },
   mounted () {
     this.render()
   },
   methods: {
     render () {
       this.renderChart({
         labels: this.ysettings.labels,
         datasets: [{
           label: this.ysettings.yLabelName || '',
           borderColor: this.ysettings.borderColor || '#000000',
           pointBackgroundColor: this.ysettings.pointBackground || '#000000',
           borderwidth: this.ysettings.borderWidth || 0,
           pointBordercolor: this.ysettings.pointBorderColor || '#000000',
           backgroundColor: this.ysettings.background || 'transparent',
           data: this.ysettings.data
         }]
       }, this.options)
     }
   }
})
</script>
