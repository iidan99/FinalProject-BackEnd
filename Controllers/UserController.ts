import { UserModal } from "../Modals/UserModal";
import express from "express";
import { uuid } from "uuidv4";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const userRegister = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, phoneNumber, password, gender } = req.body;
    if (!email || !phoneNumber || !password || !gender) {
      throw new Error("Missing data");
    }
    const existsUser = await UserModal.findOne({ email });

    if (existsUser) {
      res.status(401).send("This email is already Registered");
      return;
    }
    const userId = uuid();
    const date = new Date();

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = new UserModal({
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
    res.status(500).render("internal-error");
  }
};
