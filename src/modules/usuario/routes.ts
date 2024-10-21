import { NextFunction, Request, Response, Router } from "express";
import { actualizarUsuarioController, buscarUsuarioController, crearUsuarioController, eliminarUsuarioController, listarUsuarioController } from "./controller";
import { tokenMdw } from "../../middlewares/tokenMdw";

const routes = Router();

routes.get(
  "/:id",
  tokenMdw,
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
  tokenMdw,
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
  tokenMdw,
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
  tokenMdw,
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
  tokenMdw,
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
