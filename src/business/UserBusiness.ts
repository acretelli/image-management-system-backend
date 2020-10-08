import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {

    async createUser(user: UserInputDTO) {

        if (!user.name || !user.email || !user.nickname || !user.password) {
            throw new Error("Missing input");
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(id, user.email, user.name, user.nickname, hashPassword);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }

    async getUserById(token: string, id: string) {

        const authenticator = new Authenticator();
        const accessToken = authenticator.getData(token);

        if (!accessToken) {
            throw new Error("You don't have permission to do that");
        }

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserById(id);

        return userFromDB;
    }

    async getProfile(token: string) {

        const authenticator = new Authenticator();
        const accessToken = authenticator.getData(token).id;

        if (token) {
            throw new Error("You don't have permission to do that");
        }

        if (!accessToken) {
            throw new Error("You don't have permission to do that");
        }

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getProfile(accessToken);

        return userFromDB;
    }

    async deleteUser(token: string) {

        const authenticator = new Authenticator();

        if (token) {
            throw new Error("You don't have permission to do that");
        }

        const accessToken = authenticator.getData(token).id;

        if (!accessToken) {
            throw new Error("You don't have permission to do that");
        }

        const userDatabase = new UserDatabase();
        await userDatabase.deleteUser(accessToken);

    }
}