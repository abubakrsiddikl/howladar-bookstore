import jwt from "jsonwebtoken";
import config from "../../config";

const JWT_SECRET = config.jwt_secret;

export function verifyToken(token: string): any | null {
  try {
    return jwt.verify(token, JWT_SECRET!);
  } catch (error) {
    return null;
  }
}
