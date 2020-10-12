import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { ImageInputDTO } from "../model/Image";
import { ImageDatabase } from "../data/ImageDatabase";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { UnauthorizedError } from "../error/UnauthorizedError";

export class ImageBusiness {

    constructor(
        private imageDatabase: ImageDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createImage(token: string, image: ImageInputDTO) {

        if (!image.subtitle || !image.date || !image.file || !image.tags || !image.collection) {
            throw new InvalidParameterError("Missing input.");
        }

        const id = this.idGenerator.generate();
        const accessToken = this.authenticator.getData(token);

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        await this.imageDatabase.createImage(id, image.subtitle, image.author, image.date, image.file, image.tags, image.collection);

        return accessToken;
    }

    async getImageById(token: string, id: string) {

        const accessToken = this.authenticator.getData(token);

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        const imageFromDB = await this.imageDatabase.getImageById(id);

        return imageFromDB;
    }

    async getAllImages(token: string) {

        const accessToken = this.authenticator.getData(token);

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }
        const imageFromDB = await this.imageDatabase.getAllImages();

        return imageFromDB;
    }

    async delete(token: string, id: string) {

        const accessToken = this.authenticator.getData(token);

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        await this.imageDatabase.deleteImageById(id);

    }
}