import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { Request, Response, static as ExpressStatic } from "express";
import { join } from "path";

@Injectable()
export class MealStaticFileMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    ExpressStatic(join(__dirname, "../../upload/meal"))(req, res, next);
  }
}