import express, { NextFunction, Request, Response } from "express"
import { ValidationError } from "express-validation"
import { PORT } from "./env/environments"
import { Usuario } from "./models/index";
import cors from "cors"

// ? Routes
import usuarioRoutes from "./modules/usuario/routes"
import authRoutes from "./modules/auth/routes"
import db from "./config/db"

const app = express()

const  prefix = '/api'

// ? CORS
app.use(cors())

// ? Configuracion de EXPRESS
app.use(express.json())

//? Conexion a db
async function main() {
  try {
    await db.authenticate();
    await db.sync();
  } catch (error) {
    console.log(error);
  }
}
main();

// ? Routes de mi aplicativo
app.use(`${prefix}/usuario`, usuarioRoutes)
app.use(`${prefix}/auth`, authRoutes)

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }
  
    return res.status(500).json(err)
  } as any)





app.listen(PORT, () => {
    console.log('El servidor esta funcionando en el puerto:', PORT)
})

