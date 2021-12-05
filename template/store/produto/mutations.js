import * as types from './types'
import { defaultState } from './state'

const mutations = {
  [types.SET_PRODUTO](state, produtoSelecionado) {
    state.produtoSelecionado = produtoSelecionado
  },
  [types.CLEAR_PRODUTO](state) {
    state.produtoSelecionado = defaultState().produtoSelecionado
  },
  [types.SET_LISTA_PRODUTOS](state, listaProdutos) {
    state.listaProdutos = listaProdutos
  },
  [types.CLEAR_LISTA_PRODUTOS](state) {
    state.listaProdutos = defaultState().listaProdutos
  }
}

export default mutations
