import { Collection } from "../model/Collection";
import { BaseDatabase } from "./BaseDatabase";

export class CollectionDatabase extends BaseDatabase {

  private static TABLE_NAME = "image_management_collections";

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

  public async getCollectionById(id: string): Promise<Collection> {
    const result = await this.getConnection()
      .select("*")
      .from(CollectionDatabase.TABLE_NAME)
      .where({ id });

    return Collection.toCollectionModel(result[0]);
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

}
