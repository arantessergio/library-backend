const axios = require("axios");
const Book = require("../models/Book");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const URL = "http://biblioteca.supero.com.br/api/livros";

const fetchBooks = async (page) => {
  try {
    const result = await axios.get(
      `${URL}?SkipCount=${page}&MaxResultCount=20`
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Popula o banco inicialmente com 200 livros
 */
export const populate = async () => {
  let page = 1;
  while (page <= 10) {
    const result = await fetchBooks(page);

    if (result.data && result.data.items) {
      await Promise.all(result.data.items.map((i) => Book.create(i)));
      page++;
    }
  }
};

export const createUser = async () => {
  if (!(await User.exists({ email: "teste@teste.com.br" }))) {
    const encryptedPassword = await bcrypt.hash("123456", saltRounds);

    await User.create({
      email: "teste@teste.com.br",
      password: encryptedPassword,
      name: "Usuario Testador",
    });
  }
};
