const express = require("express");
const Controller = require("../controllers/User");

const router = express.Router();

router.post("/api/users", Controller.create);
router.post("/api/users/auth", Controller.auth);

module.exports = router;
