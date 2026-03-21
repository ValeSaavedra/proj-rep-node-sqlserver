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
  poliSP,
  reca2SP,
  recaPoliSP,
  coloniaSP,
  temporadaSP,
  ingresoCopaArg,
  copaArgSP,
  ingresoCopaArg2,
  copaArg2SP,
  ingresopagos,
  pagosSP,
  ingresodeuda,
  deudaSP,
} = require("../controllers/reportes");
const { validateNum, validateQR } = require("../middlewares/actions/accessNum");

router.get("/cajas/descargar/:archivo", descargoCSV);
router.get("/abonos/descargar/:archivo", descargoCSV);
router.get("/reca/descargar/:archivo", descargoCSV);
router.get("/abopopu/descargar/:archivo", descargoCSV);
router.get("/poli/descargar/:archivo", descargoCSV);
router.get("/reca2/descargar/:archivo", descargoCSV);
router.get("/recapoli/descargar/:archivo", descargoCSV);
router.get("/colonia/descargar/:archivo", descargoCSV);
router.get("/temporada/descargar/:archivo", descargoCSV);
router.post("/deportes", validateNum, accDeportesSP);
router.post("/accesos", validateNum, accesosSP);
router.post("/pagos", validateNum, pagosSP);
router.post("/deuda", validateNum, deudaSP);
//router.post("/copaarg",validateQR, copaArgSP)
router.post("/copaarg", copaArgSP);
router.post("/copaarg2", validateQR, copaArg2SP);
router.post("/cajas", cajasSP);
router.post("/deportes", accDeportesSP);
router.get("/cajas", ingresoCajas);
router.get("/abonos", abonosSP);
router.get("/deportes", ingresoaccDeportes);
router.get("/accesos", ingresoaccesos);
router.get("/pagos", ingresopagos);
router.get("/deuda", ingresodeuda);
router.get("/copaarg", ingresoCopaArg);
router.get("/copaarg2", ingresoCopaArg2);
router.get("/reca", recaSP);
router.get("/abopopu", abopopuSP);
router.get("/poli", poliSP);
router.get("/reca2", reca2SP);
router.get("/recapoli", recaPoliSP);
router.get("/colonia", coloniaSP);
router.get("/temporada", temporadaSP);

module.exports = router;
