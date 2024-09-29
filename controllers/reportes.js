const fs = require("fs");
const path = require("path");
const { dbConnection } = require("../database/config");
const { cajasCobros } = require("../models/reportes");
const {
  sucursalLiteral,
  fechaLiteral,
  deleteFilesCSV,
  conviertoJson2CSV,
} = require("../utils/scripts");
const { conviertoFecha } = require("../utils/scripts");

const descargoCSV = (req, res) => {
  const { archivo } = req.params;
  const filePath = path.join(__dirname, archivo);
  const arrPath = filePath.split("controllers");
  const filePathOK = arrPath[0] + arrPath[1];
  res.download(path.normalize(filePathOK));
};

const ingresoCajas = (req, res) => {
  res.render("ingresocaja");
};
const cajasSP = async (req, res) => {
  try {
    const { suc, fecha } = req.body;
    const pool = await dbConnection();
    const result = await pool
      .request()
      .input("IN_Sucursal", suc)
      .input("IN_Fechas", fecha)
      .execute(cajasCobros);
    const data = result.recordsets[0];
    //manejo de archivo para descargar
    const sucursal = sucursalLiteral(suc);
    const fechaLit = fechaLiteral(fecha);
    deleteFilesCSV("caja");
    const csv = conviertoJson2CSV(data);
    const cadenaFec = conviertoFecha();
    const archivo = `caja${sucursal}${fechaLit}_${cadenaFec}.csv`;
    fs.existsSync(archivo) ? fs.unlinkSync(archivo) : null;
    fs.writeFile(archivo, csv, (err) => {
      if (err) throw "Hubo un error al escribir el archivo";
      console.log(`Se ha escrito el archivo ${archivo}`);
    });
    res.render("resultcaja", {
      data: data,
      sucursal: sucursal,
      fechaLit: fechaLit,
      archivo: archivo,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json(error);
  }
};

module.exports = { ingresoCajas, cajasSP, descargoCSV };
