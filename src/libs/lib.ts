import * as bcrypt from 'bcrypt';

var salt = bcrypt.genSaltSync(10);

export const hashPassword = (password: string) => {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = (password: string, hash: string) => {
  const result = bcrypt.compareSync(password, hash);
  return result;
};