import { Request } from "express";

export interface TokenPayload {
  email: string;
}

export interface AuthGuardRequest extends Request {
  user: TokenPayload;
}
