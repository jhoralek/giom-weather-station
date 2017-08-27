<<template>
  <div class="giom__charts_wrapper">
      <h1>GIOM 3000 Weather info</h1>
      <div class="boxes">
        <div class="box">
            <line-chart chart-name="Current day temperature" data-type-name="temperature" :chart-labels="labels" :chart-data="mdata"></line-chart>
        </div>
        <div class="box">
            <line-chart chart-name="Day humidity" data-type-name="Relative humidity" :chart-labels="labels" :chart-data="humidity"></line-chart>
        </div>
      </div> 
  </div>
</template>

<script>
import LineChart from './LineChart'
import axios from 'axios'

export default {
  name: 'giomCharts',
  components: {
    'lineChart': LineChart
  },
  data () {
    return {
      labels: [],
      mdata: [],
      humidity: [],
      timer: ''
    }
  },
  mounted () {
    this.requestData()
  },
  created: function () {
    this.requestData()
    this.timer = setInterval(this.requestData, 240000)
  },
  methods: {
    requestData () {
      axios.get('http://185.75.136.145:8888/?/current-day')
        .then(response => {
          let filtered = response.data.filter(item => {
            let minutes = new Date(item.created).getMinutes()
            return minutes === 0 || minutes === 30
          })
          this.labels = filtered.map(item => {
            return item.created.substring(11, item.created.length - 3)
          })
          this.mdata = filtered.map(item => {
            return item.temperature
          })
          this.humidity = filtered.map(item => {
            return item.relHumidity
          })
        })
    },
    cancelAutoUpdate: function () { clearInterval(this.timer) }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.boxes {
    width: 100%;
    height: 100%;
}

.box {
    float: left;
    margin-left: 25px;    
    margin-right: 25px;
    width: 40%;
    height: 40%;     
}
</style>
