import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { productRouter } from "./product/product.controller";

dotenv.config();
const app = express();

async function main() {
  app.use(express.json());

  app.use("/api/v1", productRouter);

  app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });
}

main();
