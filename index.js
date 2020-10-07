const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./src/config/database");
const routes = require("./src/routes");

const app = express();

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

require("./src/models/User");
require("./src/models/Book");

app.use(routes);

app.listen(3000, () => console.log("api is running..."));
