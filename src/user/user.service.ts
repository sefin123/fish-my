import { PrismaClient, User } from "@prisma/client";
import { UserRepository } from "./user.repository";
import { DeleteUser, GetUser, PostUser, PutUser } from "./user.types";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class UserService {
  private userRepository = new UserRepository();

  getUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async getUserByName(user: GetUser): Promise<User | null> {
    const foundUser = await this.userRepository.getUserByName(user);

    if (!foundUser) {
      throw new Error();
    }

    return foundUser;
  }

  async postUser(user: PostUser): Promise<User> {
    const createdUser = await this.userRepository.createUser(user);

    if (!createdUser) {
      throw new Error("User creation failed");
    }

    return createdUser;
  }

  async putUser(user: PutUser) {
    const updatedUser = await this.userRepository.updateUserName(user);
    if (!updatedUser) {
      throw new Error();
    }

    return updatedUser;
  }

  async deleteUser(user: DeleteUser) {
    console.log("Deleting user with id:", user.id);

    try {
      const deletedUser = await this.userRepository.deleteUser(user);
      console.log("Deleted user id:", deletedUser.id);
      return deletedUser;
    } catch (err) {
      console.error("User not found or failed to delete:", err);
      throw new Error("User not found");
    }
  }
}
