import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { productRouter } from "./product/product.controller";
import { categoryRouter } from "./category/category.controller";

dotenv.config();
const app = express();

async function main() {
  app.use(express.json());

  app.use("/api/v1", productRouter, categoryRouter);
  app.use(logErrors);

  function logErrors(err: Error) {
    console.error(err.stack);
  }

  app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });
}

main();
