import { Request, Response, Router } from "express";
import { CategoryService } from "./category.service";

const router = Router();

const categoryService = new CategoryService();

router.get("/categories", async (req: Request, res: Response) => {
  const catigories = await categoryService.getCategories();
  res.status(200).json(catigories);
});

router.get("/category/:name", async (req: Request, res: Response) => {
  try {
    const category = await categoryService.getCategoryByName({
      name: req.params.name,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: "category not found!" });
  }
});

router.post("/category", async (req: Request, res: Response) => {
  try {
    const product = await categoryService.postCategory(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "category already exist!" });
  }
});

router.put("/category", async (req: Request, res: Response) => {
  try {
    const product = await categoryService.putCategory(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "category not found!" });
  }
});

router.delete("/category", async (req: Request, res: Response) => {
  try {
    const product = await categoryService.deleteCategory(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "category not found!" });
  }
});

export const categoryRouter = router;
