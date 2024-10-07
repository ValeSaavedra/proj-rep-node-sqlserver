const express = require("express");
const router = express.Router();
const {
  cajasSP,
  ingresoCajas,
  descargoCSV,
  abonosSP,
  ingresoaccDeportes,
  accDeportesSP,
  ingresoaccesos,
  accesosSP,
  recaSP,
  abopopuSP,
} = require("../controllers/reportes");
const { validateNum } = require("../middlewares/actions/accessNum");

router.get("/cajas/descargar/:archivo", descargoCSV);
router.get("/abonos/descargar/:archivo", descargoCSV);
router.get("/reca/descargar/:archivo", descargoCSV);
router.get("/abopopu/descargar/:archivo", descargoCSV);
router.post("/deportes", validateNum, accDeportesSP);
router.post("/accesos", validateNum, accesosSP);
router.post("/cajas", cajasSP);
router.post("/deportes", accDeportesSP);
router.get("/cajas", ingresoCajas);
router.get("/abonos", abonosSP);
router.get("/deportes", ingresoaccDeportes);
router.get("/accesos", ingresoaccesos);
router.get("/reca", recaSP);
router.get("/abopopu", abopopuSP);

module.exports = router;
