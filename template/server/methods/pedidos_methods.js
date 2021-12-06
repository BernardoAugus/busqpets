Meteor.methods({
  novoPedido(pedido) {
    const { codigo } = Pedidos.findOne({}).sort({ createdAt: -1 });

    pedido.createdAt = new Date();
    pedido.codigo = codigo++;

    Pedidos.insert(pedido);
  },

  buscarPedidos() {
    return Pedidos.find({
      $or: [
        { fornecedor: this.userId },
        { consumidor: this.userId }
      ]
    })
  },

  mudarStatus(idPedido, novoStatus) {
    Pedidos.update({ _id: idPedido }, { $set: { status: novoStatus } });
  }
})