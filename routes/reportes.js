const express = require("express");
const router = express.Router();
const {
  cajasSP,
  ingresoCajas,
  descargoCSV,
} = require("../controllers/reportes");

router.get("/cajas/descargar/:archivo", descargoCSV);
router.post("/cajas", cajasSP);
router.get("/cajas", ingresoCajas);
module.exports = router;
