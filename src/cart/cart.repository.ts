import { PrismaClient, Cart } from "@prisma/client";
import { AddProductToCart, GetCart, PostCart } from "./cart.types";

const prisma = new PrismaClient();

export class CartRepository {
  getAllCarts(): Promise<Cart[]> {
    return prisma.cart.findMany();
  }

  getCartByUser(cart: GetCart): Promise<Cart | null> {
    return prisma.cart.findUnique({
      where: {
        userId: cart.userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  postcart(cart: PostCart): Promise<Cart> {
    return prisma.cart.create({
      data: cart,
    });
  }

  async addProductToCart(item: AddProductToCart) {
    return prisma.cartItem.create({
      data: {
        cartId: item.cartId,
        productId: item.productId,
      },
    });
  }
}
