Meteor.methods({
  novoPedido(superPedido) {
    const numeroPedidos = superPedido.length();
    let { codigo } = Pedidos.findOne({}).sort({ createdAt: -1 });
    pedidos = [];

    for (let i = 0; i < numeroPedidos; i++) {
      superPedido[i].creaedAt = new Date();
      pedido.codigo = codigo++;
      Pedidos.insert(superPedido[i]);
    }
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