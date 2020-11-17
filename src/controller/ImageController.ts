import { Request, Response } from "express";
import { ImageBusiness } from "../business/ImageBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { ImageDatabase } from "../data/ImageDatabase";
import { ImageInputDTO, SearchImageDTO } from "../model/Image";
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
                date: new Date(req.body.date),
                file: req.body.file,
                tags: req.body.tags
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
            const id = req.params.imageId

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
            const id = req.params.imageId

            await ImageController.imageBusiness.deleteImage(token, id);

            res.status(200).send({ message: "Image deleted successfully" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async addImageToCollection(req: Request, res: Response) {

        try {
            const token = req.headers.authorization as string;
            const imageId = req.params.imageId
            const collectionId = req.body.collectionId

            await ImageController.imageBusiness.addImageInCollection(token, imageId, collectionId);

            res.status(200).send({ message: "Image added to collection successfully" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    public searchImage = async(req: Request, res: Response) => {
        try {
            const searchData: SearchImageDTO = {
                subtitle: req.query.subtitle as string || "",
                tag: req.query.tag as string || "",
                orderBy:  req.query.orderBy as string || "date",
                orderType: req.query.orderType as string || "ASC",
                page: Number(req.query.page) || 1
            }

            const result = await ImageController.imageBusiness.searchImage(searchData);

            res.status(200).send(result)
        } catch (err) {
            res.status(400).send(err.message)
        }

        await BaseDatabase.destroyConnection();
    }

}