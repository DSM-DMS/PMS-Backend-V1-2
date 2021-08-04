import { Request } from "express";

export interface TokenPayload {
  iat: number;
  sub: string;
  exp: number;
  type: string;
  role: string;
}

export interface AuthGuardRequest extends Request {
  user: TokenPayload;
}
