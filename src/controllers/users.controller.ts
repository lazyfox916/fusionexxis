import type { NextFunction, Request, Response } from "express";

import {
  getAllUsersService,
  getUserByIdService,
  loginUserService,
  signUpUserService,
} from "../services/users.service";

export async function createUsersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await signUpUserService(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginUsersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await loginUserService(req.body);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllUsersController(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await getAllUsersService();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserByIdController(
  req: any,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await getUserByIdService(req.params.id);

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
