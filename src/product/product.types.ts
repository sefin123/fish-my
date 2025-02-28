export interface GetProduct {
  name: string;
}

export interface PostProduct {
  name: string;
  price: number;
  category: string;
}

export interface PutProduct {
  name: string;
  newPrice: number;
}

export interface DeleteProduct {
  name: string;
}
