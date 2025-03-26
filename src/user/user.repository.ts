import { PrismaClient, User } from "@prisma/client";
import { DeleteUser, GetUser, PostUser, PutUser } from "./user.types";

const prisma = new PrismaClient();

export class UserRepository {
  getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  getUserByName(user: GetUser): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        name: user.name,
      },
    });
  }

  createUser(user: PostUser): Promise<User> {
    return prisma.user.create({
      data: user,
    });
  }

  updateUserName(user: PutUser): Promise<User | null> {
    return prisma.user.update({
      where: {
        name: user.oldName,
      },
      data: {
        name: user.newName,
      },
    });
  }

  deleteUser(user: DeleteUser): Promise<User> {
    return prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}
