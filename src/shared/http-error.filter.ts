import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request: Request = context.getRequest();
    const response: Response = context.getResponse();
    const status: number = exception.getStatus();

    const errorResponse = { 
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: exception.message,
    };

    Logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse), "ExceptionFilter");
    response.status(status).json(errorResponse);
  }
}