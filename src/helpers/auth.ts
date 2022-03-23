import { hash, genSalt, compare } from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(12);
  const hashedPassword = await hash(password, salt);

  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const isValid = await compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    throw new Error(error);
  }
};
