<template>
    <div class="container">
      <data-table :data="data"></data-table> 
    </div>
</template>

<script>
import DataTable from './datatables/DataTable'
import axios from 'axios'

export default {
  components: {
    'dataTable': DataTable
  },
  data () {
    return {
      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      axios.get('http://185.75.136.145:8888/?/current-day')
        .then(response => {
          // filter data only every 0 and 30 min. from hour
          this.data = response.data.filter(item => {
            let minutes = new Date(item.created).getMinutes()
            return minutes === 0 || minutes === 30
          })
        })
    }
  }
}
</script>
