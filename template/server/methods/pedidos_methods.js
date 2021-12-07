import { Meteor } from 'meteor/meteor'

Meteor.methods({
  novoPedido(superPedido, lengthPedidos) {
    console.log(lengthPedidos)
    const numeroPedidos = lengthPedidos;
    let { codigo } = Pedidos.findOne({}).sort({ createdAt: -1 });
    pedidos = [];

    for (let i = 0; i < numeroPedidos; i++) {
      superPedido[i].creaedAt = new Date();
      pedido.codigo = codigo++;
      Pedidos.insert(superPedido[i]);
    }
  },


  buscarTodosPedidos() {
    return Pedidos.find({
      $or: [
        { fornecedor: this.userId },
        { consumidor: this.userId }
      ]
    }).fetch();
  },

  buscarPedidoUnico(idPedido) {
    return Pedidos.find({ _id: idPedido }).fetch();
  },

  mudarStatus(idPedido, novoStatus) {
    Pedidos.update({ _id: idPedido }, { $set: { status: novoStatus } });
  }
})