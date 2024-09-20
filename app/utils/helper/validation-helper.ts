import { NextApiRequest } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DBUserType, TokenPayload } from "@/_data/type";

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

//!The order of the args matters
export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};

const JWT_SECRET_KEY = "this_is_a_secret_key";

export const validateToken = (req: NextApiRequest): TokenPayload => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) throw new Error("Token not provided");

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, JWT_SECRET_KEY) as TokenPayload;
  return decoded;
};

export const generateAccessToken = (user: Partial<DBUserType>): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
};
