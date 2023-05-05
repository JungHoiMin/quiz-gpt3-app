<template>
  <div class="q-pa-md">
    <q-table
            flat bordered
            title="리스트"
            :rows="this.searchResult"
            :columns="this.columns"
            row-key="name"
            :loading="searchLoading"
            @row-Click="this.selectSchool"
            :rows-per-page-options="[10]"
    >
    </q-table>
    {{this.selectedSchool}}
  </div>
</template>

<script>

import { mapMutations, mapState} from "vuex";

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
        'selectedSchool',
    ]),
  },
  methods:{
    ...mapMutations([
        'updateSelectedSchool'
    ]),
    selectSchool(evt,row){
      this.updateSelectedSchool(row)
    }
  }
}
</script>

<style scoped>

</style>