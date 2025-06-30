import { jwtVerify } from "jose";

export interface JwtPayload {
  userId: string;
  role: string;
}

const isJwtPayload = (payload: unknown): payload is JwtPayload => {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "userId" in payload &&
    "role" in payload
  ) {
    const p = payload as Record<string, unknown>;
    return typeof p.userId === "string" && typeof p.role === "string";
  }
  return false;
};

export const verifyToken = async (
  token: string
): Promise<JwtPayload | null> => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (isJwtPayload(payload)) {
      return payload;
    }
    return null;
  } catch (error) {
    console.error("Invalid Token", error);
    return null;
  }
};
