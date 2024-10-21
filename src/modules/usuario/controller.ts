import { NextFunction, Request } from "express";
import { ResponseHelper } from "../../helpers/responseHelper";
import { UsuarioService } from "./service";
import { UsuarioModel } from "../../models/Usuario";

const usuarioService = new UsuarioService();

export const listarUsuarioController = async () => {
  try {
    const response = await usuarioService.listarUsuarioService();
    return new ResponseHelper<UsuarioModel[]>().success(response);
  } catch (error: any) {
    throw new Error(error);
  }
};
export const buscarUsuarioController = async (idUsuario: number) => {
  try {
    const response = await usuarioService.buscarUsuarioService(idUsuario);
    return new ResponseHelper<UsuarioModel | null>().success(response);
  } catch (error: any) {
    throw new Error(error);
  }
};
export const crearUsuarioController = async (payload: UsuarioModel) => {
  try {
    const existeCorreo = await usuarioService.buscarCorreoUsuarioService(payload.email)
    if(existeCorreo) return new ResponseHelper<null>().fail(404, 'Ya existe un usuario con ese correo.')
    const response = await usuarioService.crearUsuarioService(payload)
    return new ResponseHelper<UsuarioModel>().success(response);
  } catch (error: any) {
    throw new Error(error)
  }
};
export const actualizarUsuarioController = async (idUsuario: number, payload: UsuarioModel) => {
  try {
    const response = await usuarioService.actualizarUsuarioService(idUsuario, payload)
    return new ResponseHelper<[affectedCount: number]>().success(response);
  } catch (error: any) {
    throw new Error(error)
  }
};
export const eliminarUsuarioController = async (idUsuario: number) => {
  try {
    const response = await usuarioService.eliminarUsuarioService(idUsuario)
    return new ResponseHelper<number>().success(response);
  } catch (error: any) {
    throw new Error(error)
  }
};
