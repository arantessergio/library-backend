const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const dbConfig = require("./src/config/database");
const userRouter = require("./src/routes/User");
const bookRouter = require("./src/routes/Book");
const cors = require("cors");

const app = express();

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(helmet());

app.use(cors());

require("./src/models/User");
require("./src/models/Book");

app.use(userRouter);
app.use(bookRouter);

app.listen(process.env.SERVER_PORT, () => console.log("api is running..."));
