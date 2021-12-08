import * as types from './types'
import { defaultState } from './state'

const mutations = {
  [types.SET_CARRINHO](state, carrinho) {
    state.carrinho = carrinho
  },
  [types.CLEAR_CARRINHO](state) {
    state.carrinho = defaultState().carrinho
  },
}

export default mutations
