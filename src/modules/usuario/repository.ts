
import { Usuario } from "../../models";
import { UsuarioModel } from "../../models/Usuario";

export default class UsuarioRepository {
  async ListarUsuariosRepository() {
    return await Usuario.scope('eliminarPassword').findAll();
  }

  async BuscarUsuarioRepository(id: number) {
    return await Usuario.scope('eliminarPassword').findOne({
      where: {
        id,
      },
    });
  }

  async CrearUsuarioRepository(data: UsuarioModel) {
    return await Usuario.create(data);
  }

  async ActualizarUsuarioRepository(id: number, data: UsuarioModel) {
    return await Usuario.update(data, {
      where: {
        id,
      },
    });
  }

  async EliminarUsuarioRepository(id: number) {
    return await Usuario.destroy({
      where: {
        id,
      },
    });
  }

  async BuscarCorreoUsuarioRepository(email: string) {
    return await Usuario.findOne({
      where: {
        email,
      },
    });
  }
}
