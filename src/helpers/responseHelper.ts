import { Response } from "express";
import { CodigosHttpEnum } from "../enums/codesHttpEnum";

interface ResponseHelperI<T> {
  message: string;
  data?: T | null;
  codigo: number;
}

export namespace responseHelper {
  export const success = (
    data?: any,
    message: string = "Transacción Exitosa",
    codigo: number = CodigosHttpEnum.ok, 
  ) => {
    const response: ResponseHelperI<any> = {
      message,
      data,
      codigo
    };
    return response
  };

  export const fail = (
    codigo: number,
    message: string = 'Ocurrio un problema.',
  ) => {
    const response: ResponseHelperI<null> = {
        message,
        codigo,
    }
    return response
  };
}
