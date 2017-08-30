<<template>
  <div class="giom__charts_wrapper">
      <h1>GIOM 3000 meteostanice</h1>
      <h3>Stanoviště Bolinka u Vlašimi</h3>
      <ul class="boxes">
        <li class="box">
            <line-chart chart-name="Denní teplota" yLabel="Teplota" xLabel="Čas" :chart-labels="labels" :chart-data="mdata"></line-chart>
        </li>
        <li class="box">
            <bar-chart chart-name="Průměrná měsíční teplota" yLabel="Teplota" xLabel="Měsíce" :chart-labels="avgLabels" :chart-data="avgData"></bar-chart>
        </li>
      </ul> 
  </div>
</template>

<script>
import LineChart from './LineChart'
import BarChart from './BarChart'
import axios from 'axios'

export default {
  name: 'giomCharts',
  components: {
    'lineChart': LineChart,
    'barChart': BarChart
  },
  data () {
    return {
      labels: [],
      mdata: [],
      humidity: [],
      timer: '',
      avgLabels: [],
      avgData: []
    }
  },
  // after component is created then execute
  // executes only once
  created () {
    this.requestData()
    this.timer = setInterval(this.requestData, 240000)
  },
  methods: {
    requestData () {
      axios.get('http://185.75.136.145:8888/?/current-day')
        .then(response => {
          // filter data only every 0 and 30 min. from hour
          let filtered = response.data.filter(item => {
            let minutes = new Date(item.created).getMinutes()
            return minutes === 0 || minutes === 30
          })
          // labels with time
          this.labels = filtered.map(item => {
            return item.created.substring(11, item.created.length - 3)
          })
          // temperature
          this.mdata = filtered.map(item => {
            return item.temperature
          })
        })

      // get average data for this months
      let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      axios.get('http://185.75.136.145:8888/?/months-avg-temp/' + months.join())
       .then(response => {
         this.avgLabels = months.map(month => {
           return this.$moment.months(month - 1)
         })
         this.avgData = months.map(month => {
           let temperature = response.data.map(item => {
             let dataMonth = this.$moment('1-' + item.created, 'DD-MM-YYYY').month() + 1
             return month === dataMonth ? item.temperature : 0
           })
           return parseFloat(temperature).toFixed(2)
         })
        //  this.avgData = response.data.map(item => {
        //    return item.temperature
        //  })
       })
    },
    cancelAutoUpdate: function () { clearInterval(this.timer) }
  },
  // before we destroy the component need destroy a timer too
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style>

body {
  background-color: #333333;
}

h1 {
  color: #ffffff;
}

h3 {
  color: #ffffff;
}

.boxes {  
  list-style-type: none;
}

.box {
  display: inline-block;
    margin-left: 25px;    
    margin-right: 25px;
    width: 35%;
    height: 35%;
}
</style>
