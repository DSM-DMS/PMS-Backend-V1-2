import { promisify } from "util";
import * as request from "request";
import * as fs from "fs";
import { v4 } from "uuid";

export abstract class ImageUploader {
  private saveLocalFile(
    filename: string,
    callback: (err: Error, file_path: string) => void,
  ) {
    const filePath: string = this.findDsmKrFilePath();
    request(filePath, { headers: { "user-agent": "" } })
      .pipe(fs.createWriteStream(`/static/file/${filename}`))
      .on("error", (writeError: Error) => callback(writeError, null))
      .on("close", () =>
        callback(
          null,
          `${process.env.SERVICE_URL}/file/${encodeURIComponent(filename)}`,
        ),
      );
  }

  public async toLocalFile() {
    const filename: string = v4() + ".png";
    const fileLocation: string = await promisify(this.saveLocalFile).bind(this)(
      filename,
    );
    await this.patchFilePath(fileLocation);
  }

  public abstract findDsmKrFilePath(): string;
  public abstract patchFilePath(fileLocation: string): Promise<void>;
}
