import { UserModel } from "../Modals/UserModel";
import express from "express";
import { uuid } from "uuidv4";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { expirationTime } from "..";
const saltRounds = 10;

export const userRegister = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, gender } =
      req.body;
    console.log(lastName);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !gender
    ) {
      throw new Error("Missing data");
    }
    const existsUser = await UserModel.findOne({ email });

    if (existsUser) {
      res.status(401).send("This email is already Registered");
      return;
    }
    const userId = uuid();
    const date = new Date();

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = new UserModel({
      firstName,
      lastName,
      userId,
      email,
      phoneNumber,
      password: hashPassword,
      gender,
      register_date: date,
      update_date: date,
    });

    await user.save();
    res.status(201).send("Registered Successfully");
  } catch (error) {
    res.status(500).send("internal-error");
  }
};

export const handleLogin = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    console.log(email + " " + password);
    if (!email || !password) {
      res.status(401).send("Wrong User or Password");
      return;
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).send("Wrong User or Password");
      return;
    }
    const isValidPassword = await bcrypt.compare(
      password,
      user!.password as string
    );
    if (isValidPassword) {
      const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        email,
        userId: user.userId,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        iat: Math.floor(Date.now() / 1000),
      };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCSSES_TOKEN_SECRET as string,
        { expiresIn: expirationTime }
      );
      const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET as string
      );
      res.json({ accessToken, refreshToken });
    } else {
      res.status(401).send("Wrong User or Password");
      return;
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
