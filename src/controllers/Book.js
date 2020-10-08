const mongoose = require("mongoose");
const Book = require("../models/Book");

exports.create = async (req, res) => {
  try {
    const result = await Book.create(req.body);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

exports.list = async (req, res) => {
  try {
    const {
      search,
      startYear = 0,
      endYear = new Date().getFullYear(),
    } = req.query;
    const result = await Book.paginate(
      {
        $or: [
          { titulo: { $regex: new RegExp(search), $options: "i" } },
          { autor: { $regex: new RegExp(search), $options: "i" } },
          { isbn: { $regex: new RegExp(search), $options: "i" } },
        ],
        ano: { $gte: Number(startYear), $lte: Number(endYear) },
      },
      { page: req?.query?.page ?? 1, limit: 20 }
    );

    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await Book.findByIdAndRemove(req.params.id).exec();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Book.findById(req.params.id).exec();
    if (result) {
      return res.send(result);
    }
    return res.status(404).send();
  } catch (error) {}
};

exports.update = async (req, res) => {
  try {
    const result = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};
