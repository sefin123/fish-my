import { PrismaClient, Product } from "@prisma/client";
import {
  DeleteProduct,
  GetProduct,
  PostProduct,
  PutProduct,
} from "./product.types";

const prisma = new PrismaClient();

export class ProductRepository {
  getAllproduct(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  getProductByName(product: GetProduct): Promise<Product | null> {
    return prisma.product.findFirst({
      where: {
        name: product.name,
      },
    });
  }

  createProduct(product: PostProduct): Promise<Product> {
    return prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        category: {
          connect: { name: product.category },
        },
      },
    });
  }

  updateProductPrice(product: PutProduct): Promise<Product | null> {
    return prisma.product.update({
      where: {
        name: product.name,
      },
      data: {
        price: product.newPrice,
      },
    });
  }

  deleteProduct(product: DeleteProduct): Promise<Product> {
    return prisma.product.delete({
      where: {
        name: product.name,
      },
    });
  }
}
