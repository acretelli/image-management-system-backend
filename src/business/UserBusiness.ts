import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { UnauthorizedError } from "../error/UnauthorizedError";

export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    async createUser(user: UserInputDTO) {

        if (!user.name || !user.email || !user.nickname || !user.password) {
            throw new InvalidParameterError("Missing input");
        }

        const id = this.idGenerator.generate();
        const hashPassword = await this.hashManager.hash(user.password);

        await this.userDatabase.createUser(id, user.name, user.email, user.nickname, hashPassword);

        const accessToken = this.authenticator.generateToken({ id });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        if ( !user.email || !user.password) {
            throw new InvalidParameterError("Missing input.");
        }
        
        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        if (!userFromDB) {
            throw new InvalidParameterError("User not found.");
        }

        const hashCompare = await this.hashManager.compare(user.password, userFromDB.password);

        if (!userFromDB.id || !hashCompare) {
            throw new InvalidParameterError("User or password incorrect.");
        }

        const accessToken = this.authenticator.generateToken({ id: userFromDB.id });

        return accessToken;
    }

    async getUserById(token: string, id: string) {

        const accessToken = this.authenticator.getData(token);

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        const userFromDB = await this.userDatabase.getUserById(id);

        return userFromDB;
    }

    async getProfile(token: string) {

        if (!token) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        const accessToken = this.authenticator.getData(token).id

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        const userFromDB = await this.userDatabase.getProfile(accessToken);

        return userFromDB;
    }

    async deleteUser(token: string) {


        if (!token) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        const accessToken = this.authenticator.getData(token).id;

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        await this.userDatabase.deleteUser(accessToken);

    }
}