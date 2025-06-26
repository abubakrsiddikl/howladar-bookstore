import { JwtPayload } from "../../app/modules/auth/auth.middleware";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | null;
    }
  }
}
