import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { AppError } from "./AppError";

export function generateToken(user: any) {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return token;
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    return decoded;
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
