import { EntityRepository, Repository } from "typeorm";
import { Gallery } from "./gallery.entity";

@EntityRepository(Gallery)
export class GalleryRepository extends Repository<Gallery> {}
