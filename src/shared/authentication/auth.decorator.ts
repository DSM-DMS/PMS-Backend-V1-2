import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthGuardRequest, TokenPayload } from "./auth.type";

export const Auth = createParamDecorator((data: keyof TokenPayload, context: ExecutionContext) => {
  const req: AuthGuardRequest = context.switchToHttp().getRequest();
  return data ? req[data] : req.user;
});