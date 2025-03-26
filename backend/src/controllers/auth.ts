import { Logger } from "@app/utils/Logger";
import { Request, Response } from "express";

const NAMESPACE = "AUTH-CONTROLLER";

const destroySession = (req: Request): Promise<void> => {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        req.logout((err) => {
            if (err) {
                Logger.error("Error logging out", NAMESPACE, err);
                res.status(500).json({ message: "Error logging out. ", error: err });
                return;
            }

            destroySession(req)
                .then(() => {
                    res.status(200).json({ message: "Successfully logged out. " });
                    return;
                })
                .catch(sessionError => {
                    Logger.error("Error destroying user session. ", NAMESPACE, err);
                    res.status(500).json({ message: "Could not destroy user session", error: sessionError })
                    return;
                });
        }); 
    } catch (error) {
        Logger.error("Unexpected error logging out. ", NAMESPACE, error);
        res.status(500).json({ message: "Unexpected error logging out. ", error });
    }
}

export const getProfile = (req: Request, res: Response): void => {
    res.json(req.user);
}