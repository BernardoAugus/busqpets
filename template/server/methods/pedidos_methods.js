import { Meteor } from 'meteor/meteor'

Meteor.methods({
  novoPedido(superPedido) {
    console.log(superPedido.length)
    const numeroPedidos = superPedido.length;
    let codigo = 1

    if(Pedidos.findOne()) {
      codigo = Pedidos.findOne({}, {sort: { createdAt: -1 }}).codigo++;
    }

    for (let i = 0; i < numeroPedidos; i++) {
      superPedido[i].consumidor = this.userId
      superPedido[i].createdAt = new Date();
      superPedido[i].codigo = codigo++;
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