import { Types } from "mongoose";

export type IUserRole = "admin" | "store-manager" | "customer";
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: IUserRole;
  isGoogleUser: boolean;
}

export interface AuthUserPayload extends IUser {
  _id: Types.ObjectId;
}
