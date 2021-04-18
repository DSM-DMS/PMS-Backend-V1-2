import * as multer from "multer";
import * as path from "path";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { Request } from "express";

type fileUploadCallback = (err: Error | null, option: string) => void;

export const multerUploadOption: MulterOptions = { 
  storage: multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, callback: fileUploadCallback) {
      callback(null, "upload/meal/");
    },
    filename(req, file, callback: fileUploadCallback) {
      const ext: string = path.extname(file.originalname);
      callback(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
}