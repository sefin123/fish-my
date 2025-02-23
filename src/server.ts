import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
