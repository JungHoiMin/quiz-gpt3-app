<template>
  <div class="home">
    <q-select v-model="school" :options="schools" label="학교 분류"/>
    <q-select v-model="region" :options="regions" label="지역"/>
    <q-select v-model="sch1" :options="sch1s" label="학교유형1"/>
    <q-select v-model="sch2" :options="sch2s" label="학교유형2"/>
    <q-select v-model="est" :options="ests" label="설립유형"/>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  data() {
    return {

    }
  },
  computed: {
    school: {
      get() {
        return this.$store.state.searchObj.gubun
      },
      set(value) {
        this.$store.commit('updateSchoolType', value)
      },
    },
    region: {
      get() {
        return this.$store.state.searchObj.region
      },
      set(value) {
        this.$store.commit('updateRegion', value)
      },
    },
    sch1: {
      get() {
        return this.$store.state.searchObj.sch1
      },
      set(value) {
        this.$store.commit('updateSch1', value)
      },
    },
    sch2: {
      get() {
        return this.$store.state.searchObj.sch2
      },
      set(value) {
        this.$store.commit('updateSch2', value)
      },
    },
    est: {
      get() {
        return this.$store.state.searchObj.est
      },
      set(value) {
        this.$store.commit('updateEst', value)
      },
    },
    schools:{
      get(){
        return this.$store.state.searchData.schoolList
      },
    },
    regions:{
      get(){
        return this.$store.state.searchData.regionList
      },
    },
    sch1s:{
      get(){
        return this.$store.state.searchData.sch1List
      },
    },
    sch2s:{
      get(){
        return this.$store.state.searchData.sch2List
      },
    },
    ests:{
      get(){
        return this.$store.state.searchData.estList
      },
    },
  }

}
</script>
