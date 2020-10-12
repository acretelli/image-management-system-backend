import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { ImageDatabase } from "./ImageDatabase";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "image_management_users";
  private static TABLE_IMAGES = "image_management_images";

  public async createUser(
    id: string,
    name: string,
    email: string,
    nickname: string,
    password: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          email,
          nickname,
          password
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

      return User.toUserModel(result[0]);
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT *
      FROM ${UserDatabase.TABLE_NAME} u
      WHERE u.id = "${id}"
    `)


    const user:any = result[0][0] 

    const imageDatabase = new ImageDatabase();
    const images:any[] = await imageDatabase.getImagesFromUser(user.nickname)
    
    const profile: any = {
      id: user.id,
      name: user.name,
      email: user.email,
      nickname: user.nickname,
      images: images,
    }

    return profile;
  }

  public async getProfile(id: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT *
      FROM ${UserDatabase.TABLE_NAME} u
      WHERE u.id = "${id}"
    `)


    const user:any = result[0][0] 

    const imageDatabase = new ImageDatabase();
    const images:any[] = await imageDatabase.getImagesFromUser(user.nickname)
    
    const profile: any = {
      id: user.id,
      name: user.name,
      email: user.email,
      nickname: user.nickname,
      images: images,
    }

    return profile;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.getConnection()
      .del()
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
  }

}
