const express = require("express");
const { validateToken } = require("../auth");
const Controller = require("../controllers/Book");

const router = express.Router();

router.get("/api/books", validateToken, Controller.list);
router.get("/api/books/:id", validateToken, Controller.get);
router.post("/api/books", validateToken, Controller.create);
router.delete("/api/books/:id", validateToken, Controller.remove);
router.put("/api/books/:id", validateToken, Controller.update);

module.exports = router;
