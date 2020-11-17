import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { Image, ImageInputDTO, SearchImageDTO } from "../model/Image";
import { ImageDatabase } from "../data/ImageDatabase";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { UserDatabase } from "../data/UserDatabase";
import { CollectionBusiness } from "./CollectionBusiness";
import { CollectionDatabase } from "../data/CollectionDatabase";

export class ImageBusiness {

    constructor(
        private imageDatabase: ImageDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createImage(token: string, image: ImageInputDTO) {

        if (!image.subtitle || !image.date || !image.file || !image.tags) {
            throw new InvalidParameterError("Missing input.");
        }

        const id = this.idGenerator.generate();
        const accessToken = this.authenticator.getData(token);

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getProfile(accessToken.id)

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        await this.imageDatabase.createImage(id, image.subtitle, user.nickname, image.date, image.file, image.tags);

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

    async addImageInCollection(token: string, imageId: string, collectionId: string) {

        if (!imageId || !collectionId) {
            throw new InvalidParameterError("Missing input.");
        }

        const id = this.idGenerator.generate();
        const accessToken = this.authenticator.getData(token);

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        await this.imageDatabase.addImageInCollection(id, imageId, collectionId);
    }

    public async searchImage(searchData: SearchImageDTO): Promise<Image[]> {
        const validOrderByValues = ["date", "subtitle"]
        const validOrderTypeValues = ["ASC", "DESC"]

        if(!validOrderByValues.includes(searchData.orderBy)) {
            throw new Error("Insert a valid order. It can be 'date' or 'subtitle'.")
        }

        if(!validOrderTypeValues.includes(searchData.orderType)) {
            throw new Error("Insert a valid order. It can be 'ASC' or 'DESC'.")
        }

        if(searchData.page < 0) {
            throw new Error("The page should be bigger than 0.")
        }

        const result = await this.imageDatabase.searchPost(searchData)

        if(!result.length) {
            throw new Error("No image was found. Go take some pictures")
        }

        return result
    }

    async deleteImage(token: string, id: string) {

        const accessToken = this.authenticator.getData(token);

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getProfile(accessToken.id)

        const image = await this.imageDatabase.getImageById(id)
        
        if(user.nickname !== image.author) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        const collection = new CollectionDatabase();
        await collection.deleteImageFromCollections(id);

        await this.imageDatabase.deleteImageById(id);

    }

}