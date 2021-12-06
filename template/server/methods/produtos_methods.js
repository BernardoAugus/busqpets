Meteor.methods({
  cadastrarProduto(produto) {
    produto.createdAt = new Date();
    Produtos.insert(produto);
  },

  buscarProdutos() {
    const tipo = Meteor.users.findOne({ _id: this.userId }, { 'profile.tipo': 1 });

    if (tipo == 1) {
      //é fornecedor
      return Produtos.find({ fornecedor: this.userId });
    } else {
      //é consumidor
      return Produtos.find({});
    }
  },
})