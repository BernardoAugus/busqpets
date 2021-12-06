Meteor.methods({
  cadastrarProduto(produto) {
    produto.createdAt = new Date();
    produto.fornecedor = this.userId;

    Produtos.insert(produto);
  },

  buscarProdutos() {
    const tipo = Meteor.users.findOne({ _id: this.userId }, { 'profile.tipo': 1 });
    let produtos = { produtos: [], fornecedores: [] };

    if (tipo == 1) {
      //é fornecedor
      produtos.produtos = Produtos.find({ fornecedor: this.userId });
      produtos.fornecedor = Meteor.users.find({ _id: this.userId }, { 'profile.name': 1 });
    } else {
      //é consumidor
      produtos.produtos = Produtos.find({});
      produtos.fornecedor = Meteor.users.find({ tipo: 1 }, { 'profile.name': 1 });
    }

  },

  editarProduto(produto) {
    Produtos.update({ _id: produto._id }, { $set: produto });
  },

  excluirProduto(produto) {
    Produtos.remove({ _id: produto._id });
  }
})