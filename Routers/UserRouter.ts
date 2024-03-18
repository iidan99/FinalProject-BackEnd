import express from "express";
import { handleLogin, userRegister } from "../Controllers/UserController";

const router = express.Router();

router.put("/register", userRegister).post("/login", handleLogin);

export default router;
