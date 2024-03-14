import express from "express";
import { userRegister } from "../Controllers/UserController";

const router = express.Router();

router.put("/register", userRegister);

export default router;
