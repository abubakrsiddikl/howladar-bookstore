import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
}

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
};
