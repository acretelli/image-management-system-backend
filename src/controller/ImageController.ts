import { Request, Response } from "express";
import { ImageBusiness } from "../business/ImageBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { ImageInputDTO } from "../model/Image";

export class ImageController {
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

            const imageBusiness = new ImageBusiness();
            await imageBusiness.createImage(token, input);

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

            const imageBusiness = new ImageBusiness();
            const image = await imageBusiness.getImageById(token, id);

            res.status(200).send({ image });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getAllImages(req: Request, res: Response) {

        try {
            const token = req.headers.authorization as string;

            const imageBusiness = new ImageBusiness();
            const image = await imageBusiness.getAllImages(token);

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

            const imageBusiness = new ImageBusiness();
            const image = await imageBusiness.delete(token, id);

            res.status(200).send({ message: "Image deleted successfully" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}