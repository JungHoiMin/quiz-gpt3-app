<template>
  <div class="row" style="width: 100vw">
    <q-select class="col" v-model="school" :options="schools" label="학교 분류"/>
    <q-select class="col" v-model="region" :options="regions" label="지역"/>
    <q-select class="col" v-model="sch1" :options="sch1s" label="학교유형1"/>
    <q-select class="col" v-model="sch2" :options="sch2s" label="학교유형2"/>
    <q-select class="col" v-model="est" :options="ests" label="설립유형"/>
  </div>
</template>

<script>
export default {
  name: "SearchHeader",
  data() {
    return {}
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
    schools: {
      get() {
        return this.$store.state.options.schoolList
      },
    },
    regions: {
      get() {
        return this.$store.state.options.regionList
      },
    },
    sch1s: {
      get() {
        return this.$store.state.options.sch1List
      },
    },
    sch2s: {
      get() {
        return this.$store.state.options.sch2List
      },
    },
    ests: {
      get() {
        return this.$store.state.options.estList
      },
    },
  }

}
</script>

<style scoped>
.q-select {
    padding: 5px;
}

div {
    padding-right: 40px;
}
</style>