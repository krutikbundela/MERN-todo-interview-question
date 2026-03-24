import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../utils/validations";
import z from "zod";
import { User } from "../modals/user.modal";
import { comparePassword, hashPassword } from "../utils/hash";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/token";

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input data",
        error: z.flattenError(result.error),
      });
    }

    const { name, email, password } = result.data;

    const normalizeEmail = email.trim().toLowerCase();

    //if user exists
    const existingUser = await User.findOne({ email: normalizeEmail });

    if (existingUser) {
      return res.status(400).json({
        message: "email already exists",
      });
    }

    const passwordHash = await hashPassword(password);

    const newUser = await User.create({
      name,
      email: normalizeEmail,
      password: passwordHash,
    });

    return res.status(201).json({
      message: "User created Successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in registerHandler:", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input data",
        error: z.flattenError(result.error),
      });
    }

    const { email, password } = result.data;

    const normalizeEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizeEmail }).select(
      "+password",
    );

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const passwordMatched = await comparePassword(password, user.password);

    if (!passwordMatched) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = await createAccessToken(user.id);

    const refreshToken = await createRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 1000,
    });

    return res.status(200).json({
      message: "login successful",
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in loginHandler:", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const refreshHandler = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken as string;

    if (!token) {
      return res.status(401).json({ message: "Refresh token is missing" });
    }

    const payload = await verifyRefreshToken(token);

    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const newAccessToken = createAccessToken(user.id);

    const newRefreshToken = createRefreshToken(user.id);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Token refreshed successful",
      accessToken: newAccessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in refreshHandler:", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken", { path: "/" });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logoutHandler:", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
