import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuardRequest, TokenPayload } from "./auth.types";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthGuardRequest = context.switchToHttp().getRequest();
    if(!request.headers.authorization) {
      return false;
    }
    request.user = await this.validateToken(request.headers.authorization);
    return true;
  }

  async validateToken(auth: string): Promise<TokenPayload> {
    if(auth.split(" ")[0] !== "Bearer") {
      throw new ForbiddenException("Invalid token");
    }
    const token: string = auth.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
      return decoded;
    } catch(err) {
      const message: string = `Token error ${err.name || "Unauthorized token"}`;
      throw new UnauthorizedException(message);
    }
  }
}
