import { createStore } from 'vuex'
import {data, getList} from "@/common/data";

export default createStore({
  state: {
    searchObj:{
      gubun: '초등학교',
      region: '전체',
      sch1: '전체',  // 학교 유형1
      sch2: '전체',  // 학교 유형2
      est: '전체',  // 학교 유형2
    },
    searchData:{
      schoolList: ['초등학교', '중학교', '고등학교', '대학교', '특수학교', '기타'],
      regionList: ['전체', '서울특별시', '부산광역시', '인천광역시', '대구광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시', '경기도', '강원도', '충청남도', '충청북도', '경상북도', '경상남도', '전라북도', '전라남도', '제주특별자치도', '해외거주'],
      sch1List: [],
      sch2List: [],
      estList: [],
    },

  },
  getters: {
  },
  mutations: {
    updateSchoolType(state, value){
      state.searchObj.gubun = value;
      state.searchObj.sch1 = '전체';
      state.searchObj.sch2 = '전체';
      state.searchObj.est = '전체';
      state.searchData.sch1List = getList(data.sch1, value);
      state.searchData.sch2List = getList(data.sch2, value);
      state.searchData.estList = getList(data.est, value);
    },
    updateRegion(state, value){
      state.searchObj.region = value;
    },
    updateSch1(state, value){
      state.searchObj.sch1 = value;
      state.searchObj.sch2 = '전체';
      state.searchData.sch2List = getList(data.sch2[state.searchObj.gubun], value);
    },
    updateSch2(state, value){
      state.searchObj.sch2 = value;
    },
    updateEst(state, value){
      state.searchObj.est = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
