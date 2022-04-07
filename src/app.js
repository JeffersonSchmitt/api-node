const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const config = require('./config');

//schemas
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');
const User = require('./models/user')

//rotas
const index = require('./routes/index');
const product = require('./routes/product');
const customer = require('./routes/customer');
const order = require('./routes/order');
const user = require('./routes/user');


mongoose.connect(config.connectString);

const app = express();
app.use(bodyParser.json({
  limit: '5mb'
}));

// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', index);
app.use('/products', product);
app.use('/customers', customer);
app.use('/orders', order);
app.use('/users', user);

module.exports = app;