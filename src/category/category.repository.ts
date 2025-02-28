import { PrismaClient, Category } from "@prisma/client";
import {
  DeleteCategory,
  GetCategory,
  PostCategory,
  PutCategory,
} from "./category.types";

const prisma = new PrismaClient();

export class CategoryRepository {
  getAllCategory(): Promise<Category[]> {
    return prisma.category.findMany();
  }

  getCategoryByName(category: GetCategory): Promise<Category | null> {
    return prisma.category.findFirst({
      where: {
        name: category.name,
      },
    });
  }

  createCategory(category: PostCategory): Promise<Category> {
    return prisma.category.create({
      data: category,
    });
  }

  updateCategoryPrice(category: PutCategory): Promise<Category | null> {
    return prisma.category.update({
      where: {
        name: category.oldName,
      },
      data: {
        name: category.newName,
      },
    });
  }

  deleteCategory(category: DeleteCategory): Promise<Category> {
    return prisma.category.delete({
      where: {
        name: category.name,
      },
    });
  }
}
