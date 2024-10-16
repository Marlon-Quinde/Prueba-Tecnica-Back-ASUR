import { hashSync } from "bcrypt";
const usuarios = [
  {
    nombre: "Marlon Quinde",
    email: "mquinde@viamatica.com",
    password: hashSync("admin", 10),
  },
];
export default usuarios;
