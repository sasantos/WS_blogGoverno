const mongoose = require("mongoose");

const blog = mongoose.model(
  "blog",
  mongoose.Schema({
    titulo: String,
    texto: String,
    ///dataPublicacao: String,
  })
);

module.exports = blog;
