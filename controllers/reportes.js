const fs = require("fs");
const path = require("path");
const { dbConnection } = require("../database/config");
const {
  cajasCobros,
  abonos,
  accDeportes,
  recau,
  accesos,
} = require("../models/reportes");
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
/*
const cajasPru = async(req,res)=>{
  try {
    const {suc,fecha} = req.body
    const pool = await dbConnection()
    const result = await pool
      .request()
  } catch(e) {
    res.sendStatus(500)
  }
}
  */
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

const abonosSP = async (req, res) => {
  try {
    const pool = await dbConnection();
    //console.log("pasa por aca");
    const result = await pool.request().execute(abonos);
    console.log("pasa por aca");
    const data = result.recordsets[0];
    console.log("pasa por aca");

    deleteFilesCSV("abo");
    const csv = conviertoJson2CSV(data);
    cadenaFec = conviertoFecha();
    const archivo = `abo_${cadenaFec}.csv`;
    fs.existsSync(archivo) ? fs.unlinkSync(archivo) : null;
    fs.writeFile(archivo, csv, (err) => {
      if (err) throw "Hubo un error al escribir el archivo";
      console.log(`Se ha escrito el archivo ${archivo}`);
    });

    res.render("abonos", {
      data: data,
      archivo: archivo,
    });

    //res.end();
  } catch (e) {
    console.log(6);
    res.sendStatus(500).json("Error");
  }
};

const ingresoaccDeportes = (req, res) => {
  res.render("ingresoaccdep");
};
const accDeportesSP = async (req, res) => {
  try {
    const { dato } = req.body;
    const pool = await dbConnection();
    const result = await pool
      .request()
      .input("IN_Soc_DNI", dato)
      .execute(accDeportes);
    const socio = result.recordsets[0];
    let long = socio.length;
    long !== 0 ? (long = 1) : null;
    res.render("resultaccdep", { socio: socio, long: long });
  } catch (e) {
    console.log(e);
    res.sendStatus(500).json("Error");
  }
};
const ingresoaccesos = (req, res) => {
  res.render("ingresoaccesos");
};
const accesosSP = async (req, res) => {
  try {
    const { dato } = req.body;
    const pool = await dbConnection();
    const result = await pool
      .request()
      .input("IN_Soc_DNI", dato)
      .execute(accesos);
    const socio = result.recordsets[0];
    let long = socio.length;
    console.log(`long tiene una longitud de ${long}`);
    long !== 0 ? (long = 1) : null;
    console.log("long tiene", long);
    res.render("resultaccesos", { socio: socio, long: long });
  } catch (e) {
    console.log(e);
    res.sendStatus(500).json("Error");
  }
};

const recaSP = async (req, res) => {
  try {
    const pool = await dbConnection();
    const result = await pool.request().execute(recau);
    const data = result.recordsets[0];
    console.log("result.recordset[0].Precio da ", result.recordset[0].Precio);
    // if result.recordset[0].Precio is null, no hay evento activo
    if (data.length == 0) console.log("No hay evento activo", data.length);
    deleteFilesCSV("reca");
    const csv = conviertoJson2CSV(data);
    const cadenaFec = conviertoFecha();
    const archivo = `reca_${cadenaFec}.csv`;
    fs.existsSync(archivo) ? fs.unlinkSync(archivo) : null;
    fs.writeFile(archivo, csv, (err) => {
      if (err) throw "Hubo un error al escribir el archivo";
      console.log(`Se ha escrito el archivo ${archivo}`);
    });
    res.render("reca", { data: data, archivo: archivo });
  } catch (e) {
    console.log(e);
    res.sendStatus(500).json("Error");
  }
};

module.exports = {
  ingresoCajas,
  cajasSP,
  abonosSP,
  ingresoaccDeportes,
  ingresoaccesos,
  accDeportesSP,
  ingresoCajas,
  accesosSP,
  recaSP,
  descargoCSV,
};
