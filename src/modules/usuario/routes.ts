import { NextFunction, Request, Response, Router } from "express";
import { actualizarUsuarioController, buscarUsuarioController, crearUsuarioController, eliminarUsuarioController, listarUsuarioController } from "./controller";

const routes = Router();

routes.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idUsuario = req.params.id;
      const response = await buscarUsuarioController(Number(idUsuario))
      res.status(response.codigo).json(response)
    } catch (error) {
      next()
    }
  }
);
routes.get(
  "/listado",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await listarUsuarioController()
      res.status(response.codigo).json(response)
    } catch (error) {
      next()
    }
  }
);
routes.post(
  "/crear",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body
      const response = await crearUsuarioController(payload)
      res.status(response.codigo).json(response)
    } catch (error) {
      next()
    }
  }
);
routes.put(
  "/actualizar",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const {id, ...rest} = payload
      const response = await actualizarUsuarioController(Number(id), rest)
      res.status(response.codigo).json(response)
    } catch (error) {
      next()
    }
  }
);
routes.delete(
  "/eliminar/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idUsuario = req.params.id
      const response = await eliminarUsuarioController(Number(idUsuario))
      res.status(response.codigo).json(response)
    } catch (error) {
      next()
    }
  }
);

export default routes
