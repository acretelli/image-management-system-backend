import { BaseDatabase } from "./BaseDatabase";
import { Image } from "../model/Image";

export class ImageDatabase extends BaseDatabase {

  private static TABLE_NAME = "image_management_images";

  public async createImage(
    id: string,
    subtitle: string,
    author: string,
    date: Date,
    file: string,
    tags: string[],
    collection: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
            id,
            subtitle,
            author,
            date,
            file,
            tags,
            collection
        })
        .into(ImageDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getImageById(id: string): Promise<Image> {
    const result = await this.getConnection()
      .select("*")
      .from(ImageDatabase.TABLE_NAME)
      .where({ id });

    return Image.toImageModel(result[0]);
  }

  public async getImagesFromUser(author: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(ImageDatabase.TABLE_NAME)
      .where({ author });

    return result;
  }

  public async getAllImages(): Promise<Image[]> {
    const result = await this.getConnection()
      .select("*")
      .from(ImageDatabase.TABLE_NAME)

    return result;
  }

  public async deleteImageById(id: string): Promise<void> {
    await this.getConnection()
      .del()
      .from(ImageDatabase.TABLE_NAME)
      .where({ id });
  }

}
