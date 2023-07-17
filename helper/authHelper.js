import bcrypt from "bcrypt";

export const hashPassword = async (myPlaintextPassword) => {
  const saltRounds = 10;
  const hash = await bcrypt.hashSync(myPlaintextPassword, saltRounds);
  return hash;
};

export const comparePassword = async (myPlaintextPassword, hash) => {
  return bcrypt.compareSync(myPlaintextPassword, hash);
};
