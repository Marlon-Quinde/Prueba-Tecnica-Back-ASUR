import { hashSync } from "bcrypt";
import { ResponseHelper } from "../../helpers/responseHelper"
import { AuthLoginI, AuthRegisterI } from "../../interfaces/Auth.interface"
import { UsuarioModel } from "../../models/Usuario";
import { UsuarioService } from "../usuario/service";
import { AuthService } from "./service"
import jwt from "jsonwebtoken"
import { TOKEN_KEY } from "../../env/environments";
import { verificarPassword } from "../../helpers/hashHelper";

const usuarioService = new UsuarioService()

export const loginController = async (payload: AuthLoginI) => {
    try {
        const usuario = await usuarioService.buscarCorreoUsuarioService(payload.email)
        if(!usuario) return new ResponseHelper().fail(404, 'No existe un usuario registrado con ese correo')
        
        const passwordValida = verificarPassword(payload.password, usuario.dataValues.password)

        if(!passwordValida) return new ResponseHelper().fail(403, 'Las contraseñas no coinciden')

        const token = jwt.sign({usuario: {
            name: usuario.dataValues.nombre
        }}, TOKEN_KEY,  { expiresIn: '12h' })
        
        return new ResponseHelper<{token: string}>().success({token}, 'Inicion de sesion exitoso', 200)
    } catch (error: any) {
        throw new Error(error)
    }
}

export const registerController = async (payload: AuthRegisterI) => {
    try {
        const correo = await usuarioService.buscarCorreoUsuarioService(payload.email)
        if(correo) return new ResponseHelper().fail(404, 'Ya existe un usuario registrado con reste correo')

        const payloadUsuario = {
            nombre: payload.nombre,
            email: payload.email,
            password: hashSync(payload.password, 10)
        }

        const nuevoUsuario = await usuarioService.crearUsuarioService(payloadUsuario as UsuarioModel)

        return new ResponseHelper<{nombre: string}>().success({nombre: nuevoUsuario.nombre}, 'Usuario Registrado', 201)

    } catch (error: any) {
        throw new Error(error)
    }
}