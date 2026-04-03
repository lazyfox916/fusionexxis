import Users from "../models/users.model";
import { AppError } from "../utils/AppError";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { sanitizeUserResponse } from "../utils/sanitizer";

type UserData = {
  name?: string;
  email?: string;
  password?: string;
};

export async function signUpUserService(data: UserData) {
  const name = data.name?.trim();
  const email = data.email?.trim().toLowerCase();
  const password = data.password;

  const emailExists = await Users.findOne({ where: { email } });
  if (emailExists) {
    throw new AppError("Email already in use", 409);
  }

  if (!name) throw new AppError("Name is required", 400);
  if (!email) throw new AppError("Email is required", 400);
  if (!password) throw new AppError("Password is required", 400);

  const hashedPassword = await hashPassword(password);

  const user = await Users.create({ name, email, password: hashedPassword });

  return user;
}

export async function loginUserService(data: UserData) {
  const email = data.email?.trim().toLowerCase();
  const password = data.password;

  if (!email) throw new AppError("Email is required", 400);
  if (!password) throw new AppError("Password is required", 400);

  const user = await Users.findOne({ where: { email } });

  const hashedPassword = user?.password || null;

  if (!user || !hashedPassword) {
    throw new AppError("Invalid Credentials", 401);
  }

  const isPasswordValid = await comparePassword(password, hashedPassword);

  if (!isPasswordValid) {
    throw new AppError("Invalid Credentials", 401);
  }

  const token = generateToken(user);

  return sanitizeUserResponse(user, token);
}

export async function getAllUsersService() {
  const users = await Users.findAll();

  return users.map((user) => sanitizeUserResponse(user));
}

export async function getUserByIdService(userId: string) {
  const user = await Users.findByPk(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return sanitizeUserResponse(user);
}
