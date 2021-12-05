import * as types from './types'
import { defaultState } from './state'

const mutations = {
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.CLEAR_USER](state) {
    state.user = defaultState().user
  },
}

export default mutations
