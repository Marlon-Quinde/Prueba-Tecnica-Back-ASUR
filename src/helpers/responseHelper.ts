import { CodigosHttpEnum } from "../enums/codesHttpEnum";

interface ResponseHelperI<T> {
  message: string;
  data?: T | null;
  codigo: number;
}

export class ResponseHelper <T>{
  success = (
    data?: T,
    message: string = "Transacción Exitosa",
    codigo: number = CodigosHttpEnum.ok, 
  ) => {
    const response: ResponseHelperI<T> = {
      message,
      data,
      codigo
    };
    return response
  };

  fail = (
    codigo: number,
    message: string = 'Ocurrio un problema.',
    data?: T,
  ) => {
    const response: ResponseHelperI<T> = {
        message,
        codigo,
        data: data ? data : null
    }
    return response
  };
}
