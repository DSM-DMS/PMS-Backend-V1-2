import { promisify } from "util";
import * as request from "request";
import * as fs from "fs";

export abstract class ImageUploader {
  private findLocalFileName(callback: (err: Error, filename: string) => void) {
    const filePath: string = this.findDsmKrFilePath();
    request(
      filePath,
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "Accept-Language": "ko,en;q=0.9,ko-KR;q=0.8,en-US;q=0.7",
        },
      },
      (err, res) => {
        err && callback(err, null);
        const filename = decodeURIComponent(res.headers["content-disposition"])
          .replace(/\"|filename|=|attachment;|;/g, "")
          .trim()
          .replace("jpg", "png");
        callback(null, filename);
      },
    );
  }

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
    const filename: string = await promisify(this.findLocalFileName).bind(
      this,
    )();
    console.log(filename);
    const fileLocation: string = await promisify(this.saveLocalFile).bind(this)(
      filename,
    );
    await this.patchFilePath(fileLocation);
  }

  public abstract findDsmKrFilePath(): string;
  public abstract patchFilePath(fileLocation: string): Promise<void>;
}
