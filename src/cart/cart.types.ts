export interface GetCart {
  userId: number;
}

export interface PostCart {
  userId: number;
}

export interface AddProductToCart {
  userId: number;
  cartId: number;
  productId: number;
}
