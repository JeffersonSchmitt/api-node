'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
  const res = await Customer.find({ active: true }, 'name email adress cpfcnpj');
  return res;
}

exports.create = async (body) => {
  var customer = new Customer(body);
  const res = await customer.save();
  return res;
}