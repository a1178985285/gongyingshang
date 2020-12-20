import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 默认值
    indexSi:"1",
    realName: '',
    permissionList: []
  },
  mutations: {
    modifyindexSi(state,n){
        state.indexSi=n
    },
    realName(state, name) {
      state.realName = name;
    },
    permissionList(state, arr) {
      state.permissionList = arr;
    },
  },
  actions: {
  },
  modules: {
  }
})
