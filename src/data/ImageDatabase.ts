import { BaseDatabase } from "./BaseDatabase";
import { Image, SearchImageDTO } from "../model/Image";

export class ImageDatabase extends BaseDatabase {

  private static TABLE_NAME = "image_management_images";
  private static TABLE_USERS = "image_management_users";
  private static TABLE_COLLECTIONS = "image_management_collections";
  private static TABLE_COLLECTIONS_RELATIONSHIPS = "image_management_collections_relationships";

  public async createImage(
    id: string,
    subtitle: string,
    author: string,
    date: Date,
    file: string,
    tags: string[]
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
            id,
            subtitle,
            author,
            date,
            file,
            tags
        })
        .into(ImageDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getImageById(id: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT i.id, i.subtitle, i.author, i.date, i.file, i.tags, u.id as user_id
      FROM ${ImageDatabase.TABLE_NAME} i
      JOIN ${ImageDatabase.TABLE_USERS} u
      ON i.author = u.nickname
      WHERE i.id = "${id}"
    `)

    return result[0][0];
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
  
  public async addImageInCollection(id: string, image_id: string, collection_id: string): Promise<void> {
    await this.getConnection()
    .insert({
      id,
      image_id,
      collection_id
    })
      .into(ImageDatabase.TABLE_COLLECTIONS_RELATIONSHIPS);
  }

  public async checkIfInCollection(collection_id: string, image_id: string): Promise<boolean> {
    const result = await this.getConnection().raw(`
      SELECT *
      FROM ${ImageDatabase.TABLE_COLLECTIONS_RELATIONSHIPS}
      WHERE collection_id = "${collection_id}" 
      AND image_id = "${image_id}"  
      `);
      
    if(result[0][0]) {
      return true
    } else {
      return false
    }
  }
  
  public async deleteImageFromCollection(collection_id: string, image_id: string): Promise<void> {
    await this.getConnection().raw(`
      DELETE
      FROM ${ImageDatabase.TABLE_COLLECTIONS_RELATIONSHIPS}
      WHERE collection_id = "${collection_id}" 
      AND image_id = "${image_id}"  
    `);
  }
  
  public async searchPost(searchData: SearchImageDTO): Promise<Image[]> {
    const resultsPerPage: number = 5
    const offset: number = resultsPerPage * (searchData.page - 1)

    const result = await this.getConnection().raw(`
      SELECT * FROM ${ImageDatabase.TABLE_NAME} i
      WHERE i.subtitle LIKE "%${searchData.subtitle.toLocaleLowerCase()}%"
      OR i.tags LIKE "%${searchData.tag.toLocaleLowerCase()}%"
      ORDER BY i.${searchData.orderBy} ${searchData.orderType}
      LIMIT ${resultsPerPage}
      OFFSET ${offset}
    `);
    
    return result[0];
  }
}
