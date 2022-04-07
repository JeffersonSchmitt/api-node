'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.create = async (body) => {
  var user = new User(body);
  const res = await user.save();
  return res;
}

exports.authenticate = async (data) => {
  const res = await User.findOne({
    email: data.email,
    password: data.password
  });
  return res;
}

exports.getById = async (id) => {
  const res = await User.findOne(id);
  return res;
}