import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

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

  public async getUserById(id: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    return User.toUserModel(result[0]);
  }

  public async getProfile(id: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT *
      FROM ${UserDatabase.TABLE_NAME} u
      JOIN ${UserDatabase.TABLE_IMAGES} i
      ON u.nickname = i.author
      WHERE u.id = "${id}"
    `)

    return result[0][0];
  }

  public async deleteUser(id: string): Promise<void> {
    await this.getConnection()
      .del()
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
  }

}
