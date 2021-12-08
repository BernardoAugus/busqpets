import { Meteor } from 'meteor/meteor'

Meteor.methods({
  aggregation() {

    let firstDate = new Date(new Date().getFullYear() - 1, new Date().getMonth(), 1);

    const aggregate = () => {
      return Pedidos.aggregate([
        { $match: { fornecedor: this.userId, createdAt: { $gte: firstDate } } },
        {
          $facet:
          {
            "totalDePedidos": [
              {
                $group: {
                  _id: '$fornecedor',
                  totalPedidos: { $sum: 1 },
                  totalFaturamento: { $sum: '$total' },
                }
              },
            ],
            "porMes": [
              {
                $group: {
                  _id: {
                    mes: { $month: '$createdAt' },
                    ano: { $year: '$createdAt' }
                  },
                  totalPedidos: { $sum: 1 },
                  totalFaturamento: { $sum: '$total' },
                }
              }
            ],
            "produtos": [
              {
                $unwind: '$produtos'
              },
              {
                $group: {
                  _id: '$produtos._id',
                  faturamentoTotal: { $sum: { $multiply: ['$produtos.quantidade', '$produtos.valor'] } },
                  itemsCompradors: { $sum: '$produtos.quantidade' },
                }
              },
            ],
            "especies": [
              {
                $unwind: '$produtos'
              },
              {
                $unwind: '$produtos.especies'
              },
              {
                $group: {
                  _id: '$produtos.especies',
                  faturamentoTotal: { $sum: { $multiply: ['$produtos.quantidade', '$produtos.valor'] } },
                  itemsCompradors: { $sum: '$produtos.quantidade' },
                }
              },
            ]
          },
        }
      ]);
    };

    console.log(aggregate())

    return aggregate();
  },
})