<template>
  <div class="q-pa-md">
    <q-table
            flat bordered
            title="리스트"
            :rows="searchResult"
            :columns="columns"
            row-key="name"
            :loading="searchLoading"
    >
    </q-table>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "SchoolInfos",
  data(){
    return {
      columns :[
        {name: 'schoolName', align: 'left', label: '학교명', field: 'schoolName'},
        {name: 'adres', align: 'left', label: '주소', field: 'adres'},
      ],
    }
  },
  computed:{
    ...mapState([
        'searchResult',
        'searchLoading',
    ]),
  },
}
</script>

<style scoped>

</style>