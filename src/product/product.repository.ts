import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductRepository {
  getAllproduct(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  getProductByName(name: string): Promise<Product | null> {
    return prisma.product.findFirst({
      where: {
        name,
      },
    });
  }

  createProduct(product: Product): Promise<Product> {
    return prisma.product.create({
      data: product,
    });
  }

  updateProductPrice(product: Product): Promise<Product | null> {
    return prisma.product.update({
      where: {
        name: product.name,
      },
      data: {
        name: product.name,
        price: product.price,
      },
    });
  }

  deleteProduct(product: Product): Promise<Product> {
    return prisma.product.delete({
      where: {
        name: product.name,
      },
    });
  }
}
