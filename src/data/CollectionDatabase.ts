import { Collection } from "../model/Collection";
import { BaseDatabase } from "./BaseDatabase";

export class CollectionDatabase extends BaseDatabase {

  private static TABLE_NAME = "image_management_collections";
  private static TABLE_RELATIONS = "image_management_collections_relationships";
  private static TABLE_IMAGES = "image_management_images";

  public async createCollection(
    id: string,
    title: string,
    subtitle: string,
    image?: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
            id,
            title,
            subtitle,
            image
        })
        .into(CollectionDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getCollectionById(id: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT *
      FROM ${CollectionDatabase.TABLE_NAME}
      WHERE id = "${id}"
    `);

    const collection = result[0][0]

    const resultImages = await this.getConnection().raw(`
      SELECT *
      FROM ${CollectionDatabase.TABLE_RELATIONS} r
      JOIN ${CollectionDatabase.TABLE_IMAGES} i
      ON i.id = r.image_id
      WHERE r.collection_id = "${id}"  
    `)

    const images = resultImages[0];

    const collectionWithImages: any = {
      id: collection.id,
      title: collection.title,
      subtitle: collection.subtitle,
      image: collection.image,
      images: images,
    }

    
    return collectionWithImages;
  }

  public async getCollectionsFromUser(author: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(CollectionDatabase.TABLE_NAME)
      .where({ author });

    return result;
  }

  public async getAllCollections(): Promise<Collection[]> {
    const result = await this.getConnection()
      .select("*")
      .from(CollectionDatabase.TABLE_NAME)

    return result;
  }

  public async deleteCollectionById(id: string): Promise<void> {
    await this.getConnection()
      .del()
      .from(CollectionDatabase.TABLE_NAME)
      .where({ id });
  }

  public async deleteImageFromCollections(image_id: string): Promise<void> {
    await this.getConnection()
      .del()
      .from(CollectionDatabase.TABLE_RELATIONS)
      .where({ image_id });
  }

}
