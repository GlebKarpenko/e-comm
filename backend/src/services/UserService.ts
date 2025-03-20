import { CreateUserDTO } from "@app/interfaces/User";
import { UserRepository } from "@app/repositories/UserRepository";

export class UserService {
    private static repository = new UserRepository();

    static async getAllUsers() {
        return await this.repository.getAll();
    }

    static async getUserById(id: number) {
        return await this.repository.getById(id);
    }

    static async createUser(userData: CreateUserDTO) {
        return await this.repository.create(userData);
    }

    static async updateUser(userId: number, updatedData: CreateUserDTO) {
        return await this.repository.update(userId, updatedData);
    }

    static async deleteUser(userId: number) {
        return await this.repository.delete(userId);
    }
}