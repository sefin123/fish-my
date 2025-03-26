import { Request, Response, Router } from "express";
import { CartService } from "./cart.service";

const router = Router();

const cartService = new CartService();

router.get("/carts", async (req: Request, res: Response) => {
  const carts = await cartService.getCarts();
  res.status(200).json(carts);
});

router.get("/cart/:userId", async (req: Request, res: Response) => {
  try {
    const cart = await cartService.getCartByUser({
      userId: Number(req.params.userId),
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: "cart not found!" });
  }
});

router.post("/cart", async (req: Request, res: Response) => {
  try {
    const addedItem = await cartService.addProductToCart(req.body);
    res.status(200).json({
      message: "Success add product to cart",
      item: addedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add product to cart",
      details: (error as Error).message,
    });
  }
});

export const cartRouter = router;
