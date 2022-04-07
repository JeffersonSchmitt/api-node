'use scrict';

const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/user');
const emailService = require('../services/email');
const md5 = require('md5');
const auth = require('../services/auth');

exports.post = async (req, res, next) => {

  let validation = new ValidationContract();
  validation.hasMinLen(req.body.name, 3, "O nome deve conter pelo menos 3 caracteres");
  validation.isEmail(req.body.email, 3, "O email deve ser valido");
  validation.hasMinLen(req.body.password, 3, "a senha deve conter pelo menos 3 caracteres");

  if (!validation.isValid()) {
    res.status(400).send(validation.errors()).end();
    return;
  }
  try {
    var data = await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
      roles: ['user']
    });
    emailService.send(req.body.email, "bem vindo", global.EMAIL_TMPL.replace('{0}', req.body.name));


    res.status(201).send({ message: "Usuario cadastrado com sucesso!!" });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    })
  }
};


exports.userAuth = async (req, res, next) => {

  try {
    const user = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });

    if (!user) {
      res.status(404).send({
        message: 'Usuário ou senha invalidos'
      });
      return;
    }

    const token = await auth.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles
    });

    res.status(201).send({
      token: token,
      email: user.email,
      name: user.name
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    })
  }
};

exports.refreshToken = async (req, res, next) => {

  try {
    // //recupera o token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // //decodifica o token
    const data = await auth.decodeToken(token);

    const user = await repository.getById(data.id);

    if (!user) {
      res.status(404).send({
        message: 'Usuário não encontrado'
      });
      return;
    }

    const tokenUser = await auth.generateToken({
      email: user.email,
      name: user.name
    });

    res.status(201).send({
      token: tokenUser,
      email: tokenUser.email,
      name: tokenUser.name,
      roles: tokenUser.roles
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar a requisição'
    })
  }
};