import bcrypt from 'bcrypt';

export const verificarPassword = (password: string, hashPassword: string) => {
    return bcrypt.compareSync(password, hashPassword);
  };