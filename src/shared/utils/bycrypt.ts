import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function Compare(password: string, userPassword: string) {
  return bcrypt.compareSync(password, userPassword);
}
