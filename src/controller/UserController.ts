import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export class UserController {
        
    private static userBusiness = new UserBusiness(
        new UserDatabase,
        new IdGenerator,
        new HashManager,
        new Authenticator
    );

    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password,
            }

            const token = await UserController.userBusiness.createUser(input);

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

            const token = await UserController.userBusiness.getUserByEmail(loginData);

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

            const user = await UserController.userBusiness.getUserById(token, id);

            res.status(200).send({ user });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getProfile(req: Request, res: Response) {

        try {

            const token = req.headers.authorization as string;

            const user = await UserController.userBusiness.getProfile(token);

            res.status(200).send({ user });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async deleteUser(req: Request, res: Response) {
        try {

            const token = req.headers.authorization as string;

            await UserController.userBusiness.deleteUser(token);

            res.status(200).send({ message: "User deleted successfully" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    public searchUser = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string;
            const name: string = req.query.name as string;

            const result = await UserController.userBusiness.searchUser(token, name);

            res.status(200).send(result)
        } catch (err) {
            res.status(400).send(err.message)
        }

        await BaseDatabase.destroyConnection();
    }

    public followUser = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string;
            const followingId: string = req.params.id;

            await UserController.userBusiness.followUser(token, followingId);

            res.status(200).send({ message: "You're now following this user." })
        } catch (err) {
            res.status(400).send(err.message)
        }

        await BaseDatabase.destroyConnection();
    }

    public unfollowUser = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string;
            const followingId: string = req.params.id;

            await UserController.userBusiness.unfollowUser(token, followingId);

            res.status(200).send({ message: "You're not following this user anymore." })
        } catch (err) {
            res.status(400).send(err.message)
        }

        await BaseDatabase.destroyConnection();
    }

    public getUserFeed = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string;

            const result = await UserController.userBusiness.getUserFeed(token);

            res.status(200).send(result)
        } catch (err) {
            res.status(400).send(err.message)
        }

        await BaseDatabase.destroyConnection();
    }

}