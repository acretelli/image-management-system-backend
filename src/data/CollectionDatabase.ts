import { Collection } from "../model/Collection";
import { BaseDatabase } from "./BaseDatabase";
import { ImageDatabase } from "./ImageDatabase";

export class CollectionDatabase extends BaseDatabase {

  private static TABLE_NAME = "image_management_collections";
  private static TABLE_RELATIONS = "image_management_collections_relationships";

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
      SELECT c.*, r.collection_id, r.image_id
      FROM ${CollectionDatabase.TABLE_NAME} c
      JOIN ${CollectionDatabase.TABLE_RELATIONS} r
      ON c.id = r.collection_id
      WHERE c.id = "${id}"
    `);

    const collection: any = result[0]
    

    return collection;
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
