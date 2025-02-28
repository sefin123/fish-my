import { PrismaClient, Product } from "@prisma/client";
import { ProductRepository } from "./product.repository";
import {
  DeleteProduct,
  GetProduct,
  PostProduct,
  PutProduct,
} from "./product.types";

const prisma = new PrismaClient();

export class ProductService {
  private productRepository = new ProductRepository();

  getProducts(): Promise<Product[]> {
    return this.productRepository.getAllproduct();
  }

  async getProductByName(product: GetProduct): Promise<Product | null> {
    const foundProduct = await this.productRepository.getProductByName(product);

    if (!foundProduct) {
      throw new Error();
    }

    return foundProduct;
  }

  async postProduct(product: PostProduct): Promise<Product> {
    return await this.productRepository.createProduct(product);
  }

  async putProduct(product: PutProduct) {
    return await this.productRepository.updateProductPrice(product);
  }

  async deleteProduct(product: DeleteProduct) {
    return await this.productRepository.deleteProduct(product);
  }
}
