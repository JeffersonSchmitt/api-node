'use scrict';


const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/product');

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
exports.getByTitle = async (req, res, next) => {

  try {
    var data = await repository.getByTitle(req.params.title);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    });
  }
}
exports.getBySlug = async (req, res, next) => {
  try {
    var data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    })
  }
}
exports.getById = async (req, res, next) => {
  try {
    var data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    })
  }
}
exports.getByTag = async (req, res, next) => {
  try {
    var data = await repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    })
  }
}
exports.post = async (req, res, next) => {

  let validation = new ValidationContract();
  validation.hasMinLen(req.body.title, 3, "O titulo do produto deve conter pelo menos 3 caracteres");
  validation.hasMinLen(req.body.slug, 3, "O slug do produto deve conter pelo menos 3 caracteres");
  validation.hasMinLen(req.body.description, 3, "a descrição do produto deve conter pelo menos 3 caracteres");

  if (!validation.isValid()) {
    res.status(400).send(validation.errors()).end();
    return;
  }
  try {
    var data = await repository.create(req.body);
    res.status(201).send({ message: "Produto cadastrado com sucesso!!" });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    })
  }
};
exports.put = async (req, res, next) => {
  try {
    var data = await repository.update(req.params.id, req.body);
    res.status(201).send({ message: "Produto alterado com sucesso!!" });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    })
  }
};
exports.active = async (req, res, next) => {
  try {
    var data = await repository.active(req.id);
    res.status(201).send({ message: "Produto reativado com sucesso!!" });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    })
  }
};
exports.delete = async (req, res, next) => {

  try {
    var data = await repository.delete(req.body.id);
    res.status(201).send({ message: "Produto deletado com sucesso!!" });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    })
  }
};
