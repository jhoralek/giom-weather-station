<template>
    <section>
        <b-table :data="isEmpty ? [] : data">
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

                <b-table-column field="temperature" label="Teplota">
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
  props: {
    data: {
      type: Array,
      required: false
    }
  },
  data () {
    // const tableDataSimple = [
    //     { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
    //     { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
    //     { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
    //     { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
    //     { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
    // ]
    return {
      isEmpty: false
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
