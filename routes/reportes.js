const express = require("express");
const router = express.Router();
const {
  cajasSP,
  ingresoCajas,
  descargoCSV,
  abonosSP,
} = require("../controllers/reportes");

router.get("/cajas/descargar/:archivo", descargoCSV);
router.get("/abonos/descargar/:archivo", descargoCSV);
router.post("/cajas", cajasSP);
router.get("/cajas", ingresoCajas);
router.get("/abonos", abonosSP);
module.exports = router;
