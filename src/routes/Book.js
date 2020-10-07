const express = require("express");
const Controller = require("../controllers/Book");

const router = express.Router();

router.get("/api/books", Controller.list);
router.get("/api/books/:id", Controller.get);
router.post("/api/books", Controller.create);
router.delete("api/books/:id", Controller.remove);
router.put("/api/books/:id", Controller.update);

module.exports = router;
