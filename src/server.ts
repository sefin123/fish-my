import express from "express";
import dotenv from "dotenv";
import { productRouter } from "./product/product.controller";
import { categoryRouter } from "./category/category.controller";
import { userRouter } from "./user/user.controller";
import { cartRouter } from "./cart/cart.controller";
import { authRouter } from "./auth/auth.controller";
import { authMiddleware } from "./middleware/auth.middleware";
import cookieParser from "cookie-parser";

dotenv.config();
export const app = express();

async function main() {
  app.use(cookieParser());

  app.use(express.json());

  app.use("/api/v1/auth", authRouter);

  app.use("/api/v1", authMiddleware);

  app.use("/api/v1", productRouter);
  app.use("/api/v1", categoryRouter);
  app.use("/api/v1", userRouter);
  app.use("/api/v1", cartRouter);

  app.use((req, res, next) => {
    res.status(404).json({ error: "Такой страницы не существует" });
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });
}

main();
