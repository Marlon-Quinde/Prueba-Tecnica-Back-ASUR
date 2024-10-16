import { Request, Response, Router, NextFunction } from 'express';
import { AuthLoginI, AuthRegisterI } from '../../interfaces/Auth.interface';
import { loginController, registerController } from './controller';

const routes = Router();

routes.post('/sign-in', async (req: Request, res: Response, next:NextFunction) => {
    try {
        const payload: AuthLoginI = req.body
        const response = await loginController(payload)
        res.status(response.codigo).json(response)
    } catch (error) {
        next()
    }
})

routes.post('/sign-up', async (req: Request, res: Response, next:NextFunction) => {
    try {
        const payload: AuthRegisterI = req.body
        const response = await registerController(payload)
        res.status(response.codigo).json(response)
    } catch (error) {
        next()
    }
})

export default routes;