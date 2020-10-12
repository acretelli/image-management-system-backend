import { Request, Response } from "express";
import { ImageBusiness } from "../business/ImageBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { ImageDatabase } from "../data/ImageDatabase";
import { ImageInputDTO } from "../model/Image";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ImageController {
        
    private static imageBusiness = new ImageBusiness(
        new ImageDatabase,
        new IdGenerator,
        new Authenticator
    );

    async createImage(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;

            const input: ImageInputDTO = {
                subtitle: req.body.subtitle,
                author: req.body.author,
                date: new Date(req.body.date),
                file: req.body.file,
                tags: req.body.tags,
                collection: req.body.collection
            }

            await ImageController.imageBusiness.createImage(token, input);

            res.status(200).send({ message: "Image created successfully" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getImageById(req: Request, res: Response) {

        try {
            const token = req.headers.authorization as string;
            const id = req.params.id

            const image = await ImageController.imageBusiness.getImageById(token, id);

            res.status(200).send({ image });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getAllImages(req: Request, res: Response) {

        try {
            const token = req.headers.authorization as string;

            const image = await ImageController.imageBusiness.getAllImages(token);

            res.status(200).send({ image });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async deleteImage(req: Request, res: Response) {

        try {
            const token = req.headers.authorization as string;
            const id = req.params.id

            await ImageController.imageBusiness.delete(token, id);

            res.status(200).send({ message: "Image deleted successfully" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}