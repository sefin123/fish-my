import { User } from "@prisma/client";
import { Register, Login } from "./auth.types";
import bcrypt from "bcrypt";
import { CartService } from "../cart/cart.service";
import { UserService } from "../user/user.service";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class AuthService {
  private userService = new UserService();
  private cartService = new CartService();

  async register(user: Register): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userService.postUser({
      ...user,
      password: hashedPassword,
    });

    await this.cartService.postCart({ userId: newUser.id });

    return newUser;
  }

  async login(user: Login): Promise<string> {
    const foundedUser = await this.userService.getUserByName(user);
    if (!foundedUser) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      foundedUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { userId: foundedUser.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return token;
  }
}
