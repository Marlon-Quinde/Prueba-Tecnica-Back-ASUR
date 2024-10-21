import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseHelper } from '../helpers/responseHelper';
import { TOKEN_KEY } from '../env/environments';
import { CodigosHttpEnum } from '../enums/codesHttpEnum';

export const tokenMdw = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) throw new ResponseHelper().fail(403, 'Debe enviar un token')

    if (typeof token === 'undefined' || token === '') throw new ResponseHelper().fail(403, 'Debe enviar un token')

    const verificado: any = jwt.verify(token, TOKEN_KEY);

    if (!verificado) throw new ResponseHelper().fail(403, 'Token invalido');




    next();
  } catch (error: any) {
    const mensaje = new ResponseHelper().fail(CodigosHttpEnum.unAuthorized, error.message)
    resp.status(mensaje.codigo).json(mensaje)
  }
};
