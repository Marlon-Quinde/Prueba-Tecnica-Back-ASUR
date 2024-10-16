import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db";

export interface UsuarioModel extends Model<InferAttributes<UsuarioModel>, InferCreationAttributes<UsuarioModel>> {
  id?: number;
  nombre: string;
  email: string;
  password: string;
}

const Usuario = db.define<UsuarioModel>(
  "usuarios",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async function (usuario: any) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
    },
    scopes: {
      eliminarPassword: {
        attributes: {
          exclude: [
            "password",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    },
  }
);


export default Usuario;
