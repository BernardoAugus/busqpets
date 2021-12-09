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

    const filterFornecedor = { 'profile.tipo': 1 };

    const filterProduto = {};
    let fornecedoresId = [];

    if (filter.cidade) {
      filterFornecedor.['profile.endereco.cidade'] = { $regex: filter.cidade, $options: '-i' }
    }

    if (filter.uf) {
      filterFornecedor.['profile.endereco.uf'] = filter.uf
    }

    if (filter.bairro) {
      filterFornecedor.['profile.endereco.bairro'] = { $regex: filter.bairro, $options: '-i' }
    }


    if (filter.nome) {
      filterProduto.nome = { $regex: filter.nome, $options: '-i' }
    }

    if (filter.especies?.length > 0) {
      filterProduto.especies = { $in: filter.especies }
    }

    if (tipo == 1) {
      //é fornecedor
      filterProduto.fornecedor = this.userId;
      produtos.fornecedores = Meteor.users.find({ _id: this.userId }, { fields: { 'profile.name': 1, 'profile.endereco': 1 } }).fetch();
      produtos.produtos = Produtos.find(filterProduto).fetch();
    } else {
      //é consumidor
      // filterFornecedor.profile.tipo = 1;
      console.log(filterFornecedor);
      produtos.fornecedores = Meteor.users.find(filterFornecedor, { fields: { 'profile.name': 1, 'profile.endereco': 1 } }).fetch();

      if (Object.keys(filterFornecedor).length > 1) {
        for (fornecedor of produtos.fornecedores) {
          fornecedoresId.push(fornecedor._id);
        }

        filterProduto.fornecedor = { $in: fornecedoresId }
      }

      console.log(produtos.fornecedores, filterProduto.fornecedor)
      produtos.produtos = Produtos.find(filterProduto).fetch();
    }
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