'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
  const res = await Product.find({ active: true }, 'title price slug');
  return res;
}
exports.getByTitle = async (title) => {

  const res = await Product.find({ active: true }, {
    title: { $regex: new RegExp(title), $options: 'i' },
    active: true
  }, 'title description price slug tags');
  return res;
}
exports.getBySlug = async (slug) => {
  const res = await Product.findOne({ active: true }, {
    slug: { $regex: new RegExp(slug), $options: 'i' },
    active: true
  },
    'title description price slug');
  return res;
}
exports.getById = async (id) => {
  const res = Product.findById({ active: true }, id);
  return res;
}
exports.getByTag = async (tag) => {
  const res = await Product.find({ active: true }, {
    tags: tag,
    active: true
  }, 'title description price slug tags');
  return res;
}
exports.create = async (body) => {
  var product = new Product(body);
  const res = await product.save();
  return res;
}
exports.update = async (id, body) => {
  const res = await Product.findByIdAndUpdate(id, {
    $set: {
      title: body.title,
      description: body.description,
      price: body.price,
      slug: body.slug,
    }
  });
  return res;

}
exports.delete = async (body) => {
  // Product.findByIdAndUpdate(body.id, {
  //   $set: {
  //     active: false,
  //   }
  // });
  const res = await Product.findOneAndRemove(body.id);
  return res;
}

exports.active = async (id) => {
  const res = await Product.findByIdAndUpdate(id, {
    $set: {
      active: true,
    }
  });
  return res;
}