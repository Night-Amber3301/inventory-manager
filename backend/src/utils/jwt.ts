import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (userId: string) => {
  const REFRESH_SECRET = process.env.REFRESH_SECRET;

  if (!REFRESH_SECRET) {
    throw new Error("REFRESH_SECRET is not defined");
  }

  return jwt.sign(
    { userId },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};