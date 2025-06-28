import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
}

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
};
