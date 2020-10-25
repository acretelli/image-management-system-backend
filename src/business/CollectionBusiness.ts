import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator"
import { InvalidParameterError } from "../error/InvalidParameterError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { CollectionDatabase } from "../data/CollectionDatabase";
import { CollectionInputDTO } from "../model/Collection";
import { UserDatabase } from "../data/UserDatabase";

export class CollectionBusiness {

    constructor(
        private collectionDatabase: CollectionDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createCollection(token: string, collection: CollectionInputDTO) {

        if (!collection.title || !collection.subtitle) {
            throw new InvalidParameterError("Missing input.");
        }

        const id = this.idGenerator.generate();
        const accessToken = this.authenticator.getData(token);

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        await this.collectionDatabase.createCollection(id, collection.title, collection.subtitle, collection.image);

        return accessToken;
    }

    async getCollectionById(token: string, id: string) {

        const accessToken = this.authenticator.getData(token);

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        const imageFromDB = await this.collectionDatabase.getCollectionById(id);

        return imageFromDB;
    }

    async getAllCollections(token: string) {

        const accessToken = this.authenticator.getData(token);

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }
        const imageFromDB = await this.collectionDatabase.getAllCollections();

        return imageFromDB;
    }

    async deleteCollection(token: string, id: string) {

        const accessToken = this.authenticator.getData(token);

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        await this.collectionDatabase.deleteCollectionById(id);

    }

    async deleteImageFromCollection(token: string, image_id: string) {

        const accessToken = this.authenticator.getData(token);

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        await this.collectionDatabase.deleteImageFromCollections(image_id);

    }
}