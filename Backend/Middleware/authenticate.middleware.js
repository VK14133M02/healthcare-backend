const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        req.body.user = decoded.userId;
        next();
      } else {
        res.status(404).send({ msg: "Login First" });
      }
    });
  } else {
    res.status(404).send({ msg: "Login First" });
  }
};

module.exports = { authentication };
