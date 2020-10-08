const jwt = require("jsonwebtoken");
const secretConfig = require("../config/secret");

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({ error: "Por favor informe o token." });
  } else {
    jwt.verify(token, secretConfig.secret, (err, decoded) => {
      if (err) {
        res.status(403).send({ error: "Você não está autenticado." });
      }
      if (decoded) {
        req.decoded = decoded;

        next();
      }
    });
  }
};

module.exports = {
  validateToken,
};
