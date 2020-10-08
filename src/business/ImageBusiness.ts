import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { ImageInputDTO } from "../model/Image";
import { ImageDatabase } from "../data/ImageDatabase";

export class ImageBusiness {

    async createImage(token: string, image: ImageInputDTO) {

        if (!image.subtitle || !image.date || !image.file || !image.tags || !image.collection) {
            throw new Error("Missing input");
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const authenticator = new Authenticator();
        const accessToken = authenticator.getData(token);

        if (!accessToken) {
            throw new Error("You don't have permission to do that");
        }
        
        const userDatabase = new ImageDatabase();
        await userDatabase.createImage(id, image.subtitle, image.author, image.date, image.file, image.tags, image.collection);

        return accessToken;
    }

    async getImageById(token: string, id: string) {

        const authenticator = new Authenticator();
        const accessToken = authenticator.getData(token);

        if (!accessToken) {
            throw new Error("You don't have permission to do that");
        }

        const imageDatabase = new ImageDatabase();
        const imageFromDB = await imageDatabase.getImageById(id);

        return imageFromDB;
    }

    async getAllImages(token: string) {

        const authenticator = new Authenticator();
        const accessToken = authenticator.getData(token);

        if (!accessToken) {
            throw new Error("You don't have permission to do that");
        }

        const imageDatabase = new ImageDatabase();
        const imageFromDB = await imageDatabase.getAllImages();

        return imageFromDB;
    }

    async delete(token: string, id: string) {

        const authenticator = new Authenticator();
        const accessToken = authenticator.getData(token);

        if (!accessToken) {
            throw new Error("You don't have permission to do that");
        }

        const imageDatabase = new ImageDatabase();
        await imageDatabase.deleteImageById(id);

    }
}