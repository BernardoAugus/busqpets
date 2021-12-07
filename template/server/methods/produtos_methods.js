import { Meteor } from 'meteor/meteor'

Meteor.methods({
  cadastrarProduto(produto) {
    //espera o objeto do produto
    produto.createdAt = new Date();
    produto.fornecedor = this.userId;

    Produtos.insert(produto);
  },

  buscarProdutos() {
    const user = Meteor.users.findOne({ _id: this.userId }, { fields: { 'profile.tipo': 1 } });
    const tipo = user?.profile?.tipo
    console.log('buscarProdutos')
    //sem parâmetros
    let produtos = { produtos: [], fornecedores: [] };
    
    if (tipo == 1) {
      //é fornecedor
      produtos.produtos = Produtos.find({ fornecedor: this.userId }).fetch();
      produtos.fornecedores = Meteor.users.find({ _id: this.userId }, { fields: { 'profile.name': 1 } }).fetch();
    } else {
      //é consumidor
      produtos.produtos = Produtos.find({}).fetch();
      produtos.fornecedores = Meteor.users.find({ tipo: 1 }, { fields: { 'profile.name': 1 } }).fetch();
    }
    console.log(produtos)
    return produtos;
  },

  editarProduto(produto) {
    //espera o objeto do produto
    Produtos.update({ _id: produto._id }, { $set: produto });
  },

  excluirProduto(produtoId) {
    //espera o id do produto
    Produtos.remove({ _id: produtoId });
  }
})