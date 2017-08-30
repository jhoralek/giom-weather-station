<template>
    <section>
        <b-table :data="isEmpty ? [] : data" :checked-rows.sync="checkedRows"
                    checkable>
            <template scope="props">
                <b-table-column field="id" label="ID" width="40" sortable numeric>
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column field="created" label="Čas" sortable>
                    <span class="tag is-success">
                        {{ props.row.created }}
                    </span>
                </b-table-column>
 
                 <b-table-column field="systemp" label="Teplota stanice">
                    {{ temp(props.row.systemp) }}
                </b-table-column>

                <b-table-column field="temperature" label="Teplota" sortable>
                    {{ temp(props.row.temperature) }}
                </b-table-column>

                <b-table-column field="windChill" label="Pocitová teplota">
                    {{ temp(props.row.windChill) }}
                </b-table-column>

                <b-table-column field="dewPoint" label="Rosný bod">
                    {{ temp(props.row.dewPoint) }}
                </b-table-column>

                <b-table-column field="pressure" label="Tlak">
                    {{ props.row.pressure + " hPa" }}
                </b-table-column> 

                <b-table-column field="relHumidity" label="Relativní vlhkost">
                    {{ percentage(props.row.relHumidity) }}
                </b-table-column> 

                <b-table-column field="absHumidity" label="Absolutní vlhkost">
                    {{ props.row.absHumidity + " g/m3" }}
                </b-table-column>

                <b-table-column field="windGust" label="Nárazy větru">
                    {{ speed(props.row.windGust) }}
                </b-table-column> 

                <b-table-column field="windSpeed" label="Rychlost větru">
                    {{ speed(props.row.windSpeed) }}
                </b-table-column>

                <b-table-column field="barAltitude" label="Nadmořská výška">
                    {{ props.row.barAltitude + " m" }}
                </b-table-column>                                                                                                
            </template>
        </b-table>
    </section>
</template>

<script>

export default {
  name: 'dataTable',
  props: {
    data: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      isEmpty: false,
      checkedRows: []
    }
  },
  methods: {
    temp (value) {
      return parseFloat(value).toFixed(1).toString() + ' C°'
    },
    percentage (value) {
      return parseFloat(value).toFixed(1).toString() + '%'
    },
    speed (value) {
      return parseFloat(value).toFixed(1).toString() + ' m/s'
    }
  }
}
</script>
