'use scrict';
const guid = require('guid');
const repository = require('../repositories/order');

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    });
  }
}

exports.post = async (req, res, next) => {
  try {
    // //recupera o token
    // const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // //decodifica o token
    // var data = await auth.decodeToken(token);

    await repository.create(
      {
        customer: req.body.customer,
        number: guid.raw().substring(0, 6),
        items: req.body.items,
        total: req.body.total
      }
    );
    res.status(201).send({ message: "Pedido cadastrado com sucesso!!" });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    })
  }
};