import { Meteor } from 'meteor/meteor'

Meteor.methods({
  cadastrarProduto(produto) {
    //espera o objeto do produto
    produto.createdAt = new Date();
    produto.fornecedor = this.userId;

    Produtos.insert(produto);
  },

  buscarProdutos(filter) {
    const user = Meteor.users.findOne({ _id: this.userId }, { fields: { 'profile.tipo': 1 } });
    const tipo = user?.profile?.tipo
    console.log('buscarProdutos')
    //sem parâmetros
    let produtos = { produtos: [], fornecedores: [] };

    const filterFornecedor = {};
    const filterProduto = {};
    let fornecedoresId = [];

    if (filter.cidade) {
      filterFornecedor.cidade = filter.cidade
    }

    if (filter.uf) {
      filterFornecedor.uf = filter.uf
    }

    if (filter.bairro) {
      filterFornecedor.bairro = { $regex: filter.bairro, $options: '-i' }
    }

    if (filter.nome) {
      filterProduto.nome = { $regex: filter.nome, $options: '-i' }
    }

    if (filter.especies?.length > 0) {
      filterProduto.especies = { $in: filter.especies }
    }

    if (tipo == 1) {
      //é fornecedor
      produtos.fornecedores = Meteor.users.find({ _id: this.userId }, { fields: { 'profile.name': 1, 'profile.endereco': 1 } }).fetch();
      produtos.produtos = Produtos.find({ fornecedor: this.userId }).fetch();
    } else {
      //é consumidor
      filterFornecedor.tipo = 1;
      produtos.fornecedores = Meteor.users.find(filterFornecedor, { fields: { 'profile.name': 1, 'profile.endereco': 1 } }).fetch();

      if (Object.keys(filterFornecedor) > 1) {
        for (fornecedor of produtos.fornecedores) {
          fornecedoresId.push(fornecedor._id);
        }

        filterProduto.fornecedor = { $in: fornecedoresId }
      }

      produtos.produtos = Produtos.find(filterProduto).fetch();
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