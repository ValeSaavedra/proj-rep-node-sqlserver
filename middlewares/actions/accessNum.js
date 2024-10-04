const schemas = require("../schemas/accessNum");

const validateNum = (req, res, next) => {
  console.log("muestro el req.body", req.body);
  console.log("muestro req", req.originalUrl);
  //const { error, value } = schemas.accnum.validate(req.body);
  const { error, value } = schemas.accnum.validate(req.body);
  console.log(`En error viene ${error}`);
  const { dato } = req.body;
  console.log(`Se está validando el dato ${dato}`);
  //error ? res.redirect("/reportes/deportes") : next();
  error ? res.redirect(req.originalUrl) : next();
};

module.exports = { validateNum };
