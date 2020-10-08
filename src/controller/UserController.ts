import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                nickname: req.body.nickname,
                password: req.body.password,
            }

            const userBusiness = new UserBusiness();
            const token = await userBusiness.createUser(input);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            const userBusiness = new UserBusiness();
            const token = await userBusiness.getUserByEmail(loginData);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getUserById(req: Request, res: Response) {

        try {

            const token = req.headers.authorization as string;
            const id = req.params.id;

            const userBusiness = new UserBusiness();
            const user = await userBusiness.getUserById(token, id);

            res.status(200).send({ user });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getProfile(req: Request, res: Response) {

        try {

            const token = req.headers.authorization as string;

            const userBusiness = new UserBusiness();
            const user = await userBusiness.getProfile(token);

            res.status(200).send({ user });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async deleteUser(req: Request, res: Response) {
        try {

            const token = req.headers.authorization as string;

            const userBusiness = new UserBusiness();
            const user = await userBusiness.deleteUser(token);

            res.status(200).send({ message: "User deleted successfully" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}