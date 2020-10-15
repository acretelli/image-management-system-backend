import { Request, Response } from "express";
import { CollectionBusiness } from "../business/CollectionBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { CollectionDatabase } from "../data/CollectionDatabase";
import { CollectionInputDTO } from "../model/Collection";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class CollectionController {
        
    private static collectionBusiness = new CollectionBusiness(
        new CollectionDatabase,
        new IdGenerator,
        new Authenticator
    );

    async createCollection(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;

            const input: CollectionInputDTO = {
                title: req.body.title,
                subtitle: req.body.subtitle,
                image: req.body.image
            }

            await CollectionController.collectionBusiness.createCollection(token, input);

            res.status(200).send({ message: "Collection created successfully" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getCollectionById(req: Request, res: Response) {

        try {
            const token = req.headers.authorization as string;
            const id = req.params.collectionId

            const collection = await CollectionController.collectionBusiness.getCollectionById(token, id);

            res.status(200).send({ collection });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getAllCollections(req: Request, res: Response) {

        try {
            const token = req.headers.authorization as string;

            const collections = await CollectionController.collectionBusiness.getAllCollections(token);

            res.status(200).send({ collections });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async deleteCollection(req: Request, res: Response) {

        try {
            const token = req.headers.authorization as string;
            const id = req.params.collectionId

            await CollectionController.collectionBusiness.deleteCollection(token, id);

            res.status(200).send({ message: "Collection deleted successfully" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}