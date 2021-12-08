export default {
    getProdutoSelecionado: (state) => {
        return {
            ...state.produtoSelecionado,
            quantidade: state.produtoSelecionado?.quantidade ? state.produtoSelecionado.quantidade : 1,
            valor: state.produtoSelecionado?.valor ? parseFloat(state.produtoSelecionado.valor) : 0
        }
    }
}
