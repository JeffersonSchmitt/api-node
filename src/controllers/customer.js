'use scrict';

const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/customer');

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

  let validation = new ValidationContract();
  validation.hasMinLen(req.body.name, 3, "O nome deve conter pelo menos 3 caracteres");
  validation.isEmail(req.body.email, 3, "O email deve ser valido");
  validation.hasMinLen(req.body.adress[0].street, 3, "A rua deve conter pelo menos 3 caracteres");
  validation.hasMinLen(req.body.adress[0].number, 0, "O numero deve conter pelo menos 1 caractere");
  validation.hasMinLen(req.body.adress[0].city, 2, "A cidade deve conter pelo menos 2 caracteres");
  validation.hasMinLen(req.body.adress[0].uf, 2, "A UF deve conter pelo menos 2 caracteres");

  if (!validation.isValid()) {
    res.status(400).send(validation.errors()).end();
    return;
  }
  try {
    var data = await repository.create(req.body);
    res.status(201).send({ message: "Cliente cadastrado com sucesso!!" });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    })
  }
};