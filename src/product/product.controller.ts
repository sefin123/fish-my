import { Request, Response, Router } from "express";
import { ProductService } from "./product.service";

const router = Router();

const productService = new ProductService();

router.get("/product", async (req: Request, res: Response) => {
  const products = await productService.getProducts();
  res.status(200).json(products);
});

router.get("/product/:name", async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductByName({
      name: req.params.name,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Product not found!" });
  }
});

router.post("/product", async (req: Request, res: Response) => {
  try {
    const product = await productService.postProduct(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Product already exist!" });
  }
});

router.put("/product", async (req: Request, res: Response) => {
  try {
    const product = await productService.putProduct(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Product not found!" });
  }
});

router.delete("/product", async (req: Request, res: Response) => {
  try {
    const product = await productService.deleteProduct(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Product not found!" });
  }
});

export const productRouter = router;
