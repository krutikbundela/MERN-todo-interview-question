import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const createAccessToken = async (userId: string) => {
  const payload = {
    sub: userId,
  };

  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = async (token: string) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
};

export const createRefreshToken = async (userId: string) => {
  const payload = {
    sub: userId,
  };

  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
};

export const verifyRefreshToken = async (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
};
