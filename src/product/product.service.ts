import { PrismaClient, Product } from "@prisma/client";
import { ProductRepository } from "./product.repository";

const prisma = new PrismaClient();

export class ProductService {
  private productRepository = new ProductRepository();

  getProducts(): Promise<Product[]> {
    return this.productRepository.getAllproduct();
  }

  async getProductByName(name: string): Promise<Product | null> {
    const product = await this.productRepository.getProductByName(name);

    if (!product) {
      throw new Error();
    }

    return product;
  }

  async postProduct(product: Product): Promise<Product> {
    return await this.productRepository.createProduct(product);
  }

  async putProduct(product: Product) {
    return await this.productRepository.updateProductPrice(product);
  }

  async deleteProduct(product: Product) {
    return await this.productRepository.deleteProduct(product);
  }
}
