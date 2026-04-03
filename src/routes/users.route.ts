import express from "express";
import {
  createUsersController,
  getAllUsersController,
  getUserByIdController,
  loginUsersController,
} from "../controllers/users.controller";
import { validateUser } from "../validators/users.validate";
const router = express.Router();

router.post("/register", validateUser, createUsersController);
router.post("/login", loginUsersController);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);

export default router;
