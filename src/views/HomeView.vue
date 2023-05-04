<template>
    <div class="q-pa-md q-gutter-y-sm">
      <div class="bg-orange text-white">
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-space />
          <q-input dense style="width: 300px" v-model="searchText" label="검색어"/>
          <q-btn flat round dense icon="search" class="q-mr-xs" @click="this.search"/>
        </q-toolbar>
        <q-toolbar inset>
          <SearchHeader/>
        </q-toolbar>
      </div>
    </div>

  <SchoolInfos/>
</template>

<script>
// @ is an alias to /src


import SearchHeader from "@/components/SearchHeader.vue";
import {mapActions, mapMutations} from "vuex";
import SchoolInfos from "@/components/SchoolInfos.vue";

export default {
  name: 'HomeView',
  components: {SchoolInfos, SearchHeader},
  methods:{
    ...mapMutations([
        'updateSearchText',
    ]),
    ...mapActions([
        'search',
    ])
  },
  computed:{
    searchText:{
      get() {
        return this.$store.state.searchObj.searchText
      },
      set(value){
        this.updateSearchText(value);
      }
    }
  }

}
</script>
