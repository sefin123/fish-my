import { Request, Response, Router } from "express";
import { UserService } from "./user.service";

const router = Router();

const userService = new UserService();

router.get("/users", async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
});

router.get("/user/:name", async (req: Request, res: Response) => {
  try {
    const category = await userService.getUserByName({
      name: req.params.name,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: "user not found!" });
  }
});

router.post("/user", async (req: Request, res: Response) => {
  try {
    const user = await userService.postUser(req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({
      message: "Ошибка при создании пользователя",
      details: error.message,
    });
  }
});

router.put("/user", async (req: Request, res: Response) => {
  try {
    const user = await userService.putUser(req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({
      message: "Ошибка при изменении имени пользователя",
      details: error.message,
    });
  }
});

router.delete("/user", async (req: Request, res: Response) => {
  try {
    const user = await userService.deleteUser(req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({
      message: "Ошибка при удалении пользователя",
      details: error.message,
    });
  }
});

export const userRouter = router;
