Meteor.methods({
  novoPedido(pedido) {
    Pedidos.insert(pedido);
  },

  buscarPedidos() {
    Pedidos.find({
      $or: [
        { fornecedor: this.userId },
        { consuidor: this.userId }
      ]
    })
  },

  mudarStatus(idPedido, novoStatus) {
    Pedidos.update({ _id: idPedido }, { $set: { status: novoStatus } });
  }
})