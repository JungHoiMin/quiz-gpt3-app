import {createStore} from 'vuex'
import {data, getList} from "@/common/data";
import axios from "axios";

export default createStore({
  state: {
    searchObj: {
      gubun: '초등학교',
      region: '전체',
      sch1: '전체',  // 학교 유형1
      sch2: '전체',  // 학교 유형2
      est: '전체',  // 학교 유형2
      searchText: '',
    },
    options: {
      schoolList: ['초등학교', '중학교', '고등학교', '대학교', '특수학교', '기타'],
      regionList: ['전체', '서울특별시', '부산광역시', '인천광역시', '대구광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시', '경기도', '강원도', '충청남도', '충청북도', '경상북도', '경상남도', '전라북도', '전라남도', '제주특별자치도', '해외거주'],
      sch1List: [],
      sch2List: [],
      estList: [],
    },
    searchResult: [],
    selectedSchool: {},
    searchLoading: false,
    searchCode: {
      apiKey: '1cf544905766ed6b6bf264ad7e063195',
      svcType: 'api',
      svcCode: 'SCHOOL',
      contentType: 'json',
      gubun: {
        '초등학교': 'elem_list',
        '중학교': 'midd_list',
        '고등학교': 'high_list',
        '대학교': 'univ_list',
        '특수학교': 'seet_list',
        '기타': 'alte_list',
      },
      region: {
        '서울특별시': 100260,
        '부산광역시': 100267,
        '인천광역시': 100269,
        '대전광역시': 100271,
        '대구광역시': 100272,
        '울산광역시': 100273,
        '광주광역시': 100275,
        '경기도': 100276,
        '강원도': 100278,
        '충청북도': 100280,
        '충청남도': 100281,
        '전라북도': 100282,
        '전라남도': 100283,
        '경상북도': 100285,
        '경상남도': 100291,
        '제주도': 100292,
      },
      sch1: {
        '일반고': 100362,
        '특성화고': 100363,
        '특수목적고': 100364,
        '자율고': 100365,
        '기타': 100366,
        '전문대학': 100322,
        '대학(4년제)': 100323,
      },
      sch2: {
        '전문대학': 100324,
        '기능대학(폴리텍대학)': 100325,
        '사이버대학(2년제)': 100326,
        '각종대학(전문)': 100327,
        '일반대학': 100328,
        '교육대학': 100329,
        '산업대학': 100330,
        '사이버대학(4년제)': 100331,
      },
      estType: {
        '국립': 100334,
        '사립': 100335,
        '공립': 100336,
      }
    }
  },
  getters: {
    getSearchParam: state => payload => {
      let searchParam = {}
      searchParam['apiKey'] = state.searchCode.apiKey
      searchParam['svcType'] = state.searchCode.svcType
      searchParam['svcCode'] = state.searchCode.svcCode
      searchParam['contentType'] = state.searchCode.contentType
      searchParam['gubun'] = state.searchCode.gubun[state.searchObj.gubun]
      searchParam['region'] = state.searchObj.region === '전체' ? '' : state.searchCode.region[state.searchObj.region]
      searchParam['sch1'] = state.searchObj.sch1 === '전체' ? '' : state.searchCode.sch1[state.searchObj.sch1]
      searchParam['sch2'] = state.searchObj.sch2 === '전체' ? '' : state.searchCode.sch2[state.searchObj.sch2]
      searchParam['est'] = state.searchObj.est === '전체' ? '' : state.searchCode.estType[state.searchObj.est]
      searchParam['thisPage'] = payload.pageNumber
      searchParam['perPage'] = payload.perPage
      searchParam['searchSchulNm'] = state.searchObj.searchText
      return searchParam
    }
  },
  mutations: {
    updateSchoolType(state, value) {
      state.searchObj.gubun = value;
      state.searchObj.sch1 = '전체';
      state.searchObj.sch2 = '전체';
      state.searchObj.est = '전체';
      state.options.sch1List = getList(data.sch1, value);
      state.options.sch2List = getList(data.sch2, value);
      state.options.estList = getList(data.est, value);
    },
    updateRegion(state, value) {
      state.searchObj.region = value;
    },
    updateSch1(state, value) {
      state.searchObj.sch1 = value;
      state.searchObj.sch2 = '전체';
      state.options.sch2List = getList(data.sch2[state.searchObj.gubun], value);
    },
    updateSch2(state, value) {
      state.searchObj.sch2 = value;
    },
    updateEst(state, value) {
      state.searchObj.est = value;
    },
    updateSearchText(state, value) {
      state.searchObj.searchText = value;
    },
    updateSearchResult(state, value) {
      state.searchResult = value;
    },
    updateSelectedSchool(state, value) {
      state.selectedSchool = value;
    }
  },
  actions: {
    async search(context) {
      let requestUrl = 'https://www.career.go.kr/cnet/openapi/getOpenApi?'
      const params = context.getters.getSearchParam({pageNumber: '', perPage: ''})
      for (let key in params)
        if (params[key] !== '')
          requestUrl += key + '=' + params[key] + '&'
      requestUrl = requestUrl.slice(0, -1)
      context.state.searchLoading = true

      console.log(requestUrl)

      await axios.get(requestUrl).then(res => {
        requestUrl += '&thisPage=1&perPage=' + res.data.dataSearch.content[0].totalCount
      })

      console.log(requestUrl)

      await axios.get(requestUrl).then(res => {
        context.commit('updateSearchResult',
            res.data.dataSearch.content
                // .map(item => {
              // return {adres: item.adres, schoolName: item.schoolName}
            // })
        )
      })

      context.state.searchLoading = false
    },
  },
  modules: {}
})
