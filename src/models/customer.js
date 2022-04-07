'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  adress: [{
    street: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    uf: {
      type: String,
      required: true,
    },
    obs: {
      type: String,
    },
  }],
  cpfcnpj: {
    type: String,
    required: true,
    trim: true
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = mongoose.model('Customer', schema);