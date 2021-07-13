import { DynamicModule, Module, Type } from "@nestjs/common";
import { ImageUploader } from "./abstract/image.uploader";

@Module({})
export class ImageModule {
  static LOCAL_IMAGE_UPLOADER: string = "LocalImageUploader";

  static register(Uploader: Type<ImageUploader>): DynamicModule {
    return {
      module: ImageModule,
      providers: [
        {
          provide: ImageModule.LOCAL_IMAGE_UPLOADER,
          useFactory: () => new Uploader(),
        },
      ],
      exports: [ImageModule.LOCAL_IMAGE_UPLOADER],
    };
  }
}
