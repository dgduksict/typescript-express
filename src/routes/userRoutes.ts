import express from "express";
import { userController } from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.get("/:id", userController.getUserById);
userRoutes.post("/auth/login", userController.login);
userRoutes.post("/auth/register", userController.create);

export { userRoutes };
