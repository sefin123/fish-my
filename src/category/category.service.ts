import { Category, PrismaClient } from "@prisma/client";
import { CategoryRepository } from "./category.repository";
import {
  DeleteCategory,
  GetCategory,
  PostCategory,
  PutCategory,
} from "./category.types";

const prisma = new PrismaClient();

export class CategoryService {
  private categoryRepository = new CategoryRepository();

  getCategories(): Promise<Category[]> {
    return this.categoryRepository.getAllCategory();
  }

  async getCategoryByName(category: GetCategory): Promise<Category | null> {
    const foundCategory = await this.categoryRepository.getCategoryByName(
      category
    );

    if (!foundCategory) {
      throw new Error();
    }

    return foundCategory;
  }

  async postCategory(category: PostCategory): Promise<Category> {
    const createdCategory = await this.categoryRepository.createCategory(
      category
    );

    if (!createdCategory) {
      throw new Error();
    }

    return createdCategory;
  }

  async putCategory(category: PutCategory) {
    const updatedCategory = await this.categoryRepository.updateCategoryPrice(
      category
    );
    if (!updatedCategory) {
      throw new Error();
    }

    return updatedCategory;
  }

  async deleteCategory(category: DeleteCategory) {
    const deletedCategory = await this.categoryRepository.deleteCategory(
      category
    );

    if (!deletedCategory) {
      throw new Error();
    }

    return deletedCategory;
  }
}
