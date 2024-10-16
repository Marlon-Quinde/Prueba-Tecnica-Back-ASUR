import { exit } from "process";
import { Usuario } from "../models/index";
import db from "../config/db";
import usuarios from "./usuarios";
const importarDatos = async () => {
  try {
    //Autenticar en la base de datos

    await db.authenticate();
    //Generar columnas

    await db.sync();

    //Insertar los datos
    await Promise.all([
      Usuario.bulkCreate(usuarios),
    ]);
    console.log("Datos importados correctamente");
    exit(0);
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

const eliminarDatos = async () => {
  try {
    // await Promise.all([
    //   Categoria.destroy({ where: {}, truncate: true }),
    //   Precio.destroy({ where: {}, truncate: true }),
    // ]);

    await db.sync({ force: true });
    console.log("Datos eliminados correctmente");
    exit(0);
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (process.argv[2] === "-i") {
  importarDatos();
}

if (process.argv[2] === "-e") {
  eliminarDatos();
}
