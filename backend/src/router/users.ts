import { Router } from "express";
import { 
    getUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
} from "@app/controllers/users";

export default (router: Router): void => {
    router.get("/users", getUsers);
    router.get("/users/:id", getUserById);
    router.post("/users", createUser);
    router.put("/users/:id", updateUser);
    router.delete("/users/:id", deleteUser);
};