import { Cart, CartItem, PrismaClient } from "@prisma/client";
import { CartRepository } from "./cart.repository";
import { AddProductToCart, GetCart, PostCart } from "./cart.types";

const prisma = new PrismaClient();

export class CartService {
  private cartRepository = new CartRepository();

  getCarts(): Promise<Cart[]> {
    return this.cartRepository.getAllCarts();
  }

  async getCartByUser(cart: GetCart): Promise<Cart | null> {
    const foundCart = await this.cartRepository.getCartByUser(cart);

    if (!foundCart) {
      throw new Error();
    }

    return foundCart;
  }

  async postCart(cart: PostCart): Promise<Cart> {
    const createdCart = await this.cartRepository.postcart(cart);

    if (!createdCart) {
      throw new Error();
    }
    return createdCart;
  }

  async addProductToCart(item: AddProductToCart): Promise<CartItem> {
    const productId = item.productId;

    const cart = await this.getCartByUser({
      userId: item.userId,
    });

    if (!cart) {
      throw new Error("Cart not found");
    }
    const addedProduct = await this.cartRepository.addProductToCart(item);
    if (!addedProduct) {
      throw new Error("Error while add product to cart");
    }
    return addedProduct;
  }
}
