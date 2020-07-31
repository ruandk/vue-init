import Vue from 'vue'
import Vuex from 'vuex'
import createPersiste from 'vue-savedata'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const persiste = createPersiste({
  saveName: 'persiste:root',
  ciphertext: true // 加密
})

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [persiste]
})
