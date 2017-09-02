<template>
    <div class="tile">
        <article class="tile is-child box is-11">            
            <p class="field title">{{ content.title }}
                <span v-if="content.showButton">
                    <b-tooltip label="Detail" position="is-right">
                    <router-link to="today/detail" class="button">
                        <icon name="arrow-right"></icon>
                    </router-link>
                    </b-tooltip>
                </span>
            </p>
            <p class="subtitle">{{ content.subTitle }}</p>
            <line-chart v-if="content.type === 'lineChart'" :settings="content"></line-chart>
            <multiline-chart v-if="content.type === 'multilineChart'" :settings="content"></multiline-chart>
            <bar-chart v-if="content.type === 'barChart'" :settings="content"></bar-chart>
            <div v-if="content.type === 'halfDoughnut'" class="dounghnut_wrapper">
                <doughnut-chart :settings="content"></doughnut-chart>
                <h1 class="doughnut_current_temp">{{ content.currTemp }}</h1>
            </div>
        </article>
    </div>
</template>

<<script>
import LineChart from './charts/LineChart'
import MultilineChart from './charts/MultiLineChart'
import DoughnutChart from './charts/DoughnutChart'
import BarChart from './charts/BarChart'

export default {
  components: {
    'lineChart': LineChart,
    'barChart': BarChart,
    'multilineChart': MultilineChart,
    'doughnutChart': DoughnutChart
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>

<<style>
.doughnut_current_temp {
  font-weight: 600;
  font-size: 25pt;
  position: absolute;
  bottom: 70px;
  left: 115px;
}

.dounghnut_wrapper {
  position: relative;
}

</style>
