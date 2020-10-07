const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    titulo: String,
    isbn: {
      type: String,
      minlength: 13,
      maxlength: 13,
    },
    autor: String,
    editora: String,
    ano: Number,
    idioma: String,
    peso: Number,
    comprimento: Number,
    largura: Number,
    altura: Number,
  },
  {
    timestamps: true,
  }
);

BookSchema.plugin(mongoosePaginate, {
  lean: true,
  limit: 20,
});

module.exports = mongoose.model("Book", BookSchema);
