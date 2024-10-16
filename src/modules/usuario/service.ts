import UsuarioRepository from "./repository";
import { UsuarioModel } from '../../models/Usuario';


export class UsuarioService {
    private readonly _usuarioRepository :UsuarioRepository
    constructor(){
        this._usuarioRepository = new UsuarioRepository();
    }

    async listarUsuarioService(){
        return await this._usuarioRepository.ListarUsuariosRepository();
    }

    async buscarUsuarioService(id: number) {
        return await this._usuarioRepository.BuscarUsuarioRepository(id);
    }

    async crearUsuarioService(payload: UsuarioModel){
        return await this._usuarioRepository.CrearUsuarioRepository(payload);
    }

    async actualizarUsuarioService(id: number, payload: UsuarioModel){
        return await this._usuarioRepository.ActualizarUsuarioRepository(id, payload);
    }

    async eliminarUsuarioService(id: number){
        return await this._usuarioRepository.EliminarUsuarioRepository(id);
    }

    async buscarCorreoUsuarioService(correo: string){
        return await this._usuarioRepository.BuscarCorreoUsuarioRepository(correo)
    }
}