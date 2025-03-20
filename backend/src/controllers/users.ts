import { Request, Response } from "express";
import { UserService } from "@app/services/UserService";
import { Logger } from "@app/config/Logger";
import { CreateUserDTO } from "@app/interfaces/User";

const NAMESPACE = "USERS-REQUEST";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        Logger.error("Could not get users. ", NAMESPACE, error);
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Missing id parameter" });
            return;
        }

        const user = await UserService.getUserById(Number(id));
        res.status(200).json(user);
    } catch (error) {
        Logger.error("Could not get user by id. ", NAMESPACE, error);
        res.status(500).json({ message: error.message });
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData = req.body as CreateUserDTO;
        if (!userData) {
            res.status(400).json({ message: "Missing user data for creating new user. "});
            return;
        }

        const result = await UserService.createUser(userData);
        res.status(201).json(result);
    } catch (error) {
        Logger.debug("Request body: ", NAMESPACE, req.body);

        Logger.error("Could not create new user. ", NAMESPACE, error);
        res.status(500).json({ message: "Could not create new user. " + error.message });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userData = req.body as CreateUserDTO;

        if (!id) {
            res.status(400).json({ message: "Missing id parameter. " });
            return;
        }

        if (!userData) {
            res.status(400).json({ message: "Missing userData request body." });
            return;
        }

        const result = await UserService.updateUser(Number(id), userData);
        res.status(200).json(result);
    } catch (error) {
        Logger.error("Could not update user. ", NAMESPACE, error);
        res.status(500).json({ message: "Could not update user. " + error.message });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Missing id parameter. " });
            return;
        }

        const result = await UserService.deleteUser(Number(id));
        res.status(200).json(result);
    } catch (error) {
        Logger.error("Could not delte user. ", NAMESPACE, error);
        res.status(500).json({ message: "Could not delete user by specified id. " + error.message });
    }
}