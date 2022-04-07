'use strict';
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
  const res = await Order
    .find({}, 'number status date total')
    .populate('customer', 'name cpfcnpj')
    .populate('items.product', 'title price');
  return res;
}

exports.create = async (body) => {
  var order = new Order(body);
  const res = await order.save();
  return res;
}