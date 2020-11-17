import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { ImageDatabase } from "./ImageDatabase";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "image_management_users";
  private static TABLE_IMAGES = "image_management_images";
  private static TABLE_FOLLOW = "image_management_users_following";

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
  
  public async searchUser(name: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT *
      FROM ${UserDatabase.TABLE_NAME} u
      WHERE u.name LIKE "%${name}%"
    `);

    const user: any = result[0][0]
    
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

  public async followUser(id: string, user_id: string, following_id: string): Promise<void> {
    await this.getConnection()
        .insert({
          id,
          user_id,
          following_id
        })
        .into(UserDatabase.TABLE_FOLLOW);
  }

  public async unfollowUser(following_id: string): Promise<void> {
    await this.getConnection()
        .del()
        .from(UserDatabase.TABLE_FOLLOW)
        .where({ following_id });
  }

  public async checkIfFollows(user_id: string, following_id: string): Promise<boolean> {
    const result = await this.getConnection().raw(`
      SELECT *
      FROM ${UserDatabase.TABLE_FOLLOW} f
      WHERE f.user_id = "${user_id}" 
      AND f.following_id = "${following_id}"  
    `);
    
    if(result[0][0]) {
      return true
    } else {
      return false
    }
  }

  public async getUserFeed(user_id: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT i.id, i.subtitle, i.author, i.date, i.file, i.tags
      FROM ${UserDatabase.TABLE_FOLLOW} f
      JOIN ${UserDatabase.TABLE_NAME} u
      ON f.following_id = u.id
      JOIN ${UserDatabase.TABLE_IMAGES} i
      ON u.nickname = i.author
      WHERE f.user_id = "${user_id}"
    `);

    return result[0];
  }
}
