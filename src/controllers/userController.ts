import { userService } from "../services/userService";
import { Request, Response, NextFunction } from "express";
import { idSchema, loginSchema } from "../validations/sharedSchema";
import { CustomError } from "../exceptions/CustomError";

export const userController = {
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        throw new CustomError("Could not parse id from params", 400);
      }

      const user = await userService.getUserById(userId);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = loginSchema.parse(req.body);

      const { user, accessToken, refreshToken } = await userService.login(
        input.email,
        input.password
      );

      return res.status(200).json({
        success: true,
        data: {
          user: user,
          tokens: {
            accessToken,
            refreshToken,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { prefix, telNumber, password, nickName, email } = req.body;
      if (!prefix || !telNumber || !password || !email) {
        throw new CustomError("Missing required fields", 400);
      }

      const { user, accessToken, refreshToken } = await userService.create(
        prefix,
        telNumber,
        password,
        nickName || null,
        email
      );

      return res.status(201).json({
        success: true,
        data: {
          user: user,
          tokens: {
            accessToken,
            refreshToken,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
