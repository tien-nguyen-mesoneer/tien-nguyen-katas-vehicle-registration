import { Router } from "express";
import { IUser } from "../models/User";
import { db } from "..";
import { sendResponse } from "../utils";

const userRouter: Router = Router();

/**
 * @route GET /users
 * @description Get all users
 * @access Public
 */
userRouter.get("/", async (req, res) => {
  try {
    const users = await db.collection<IUser>("users").find({}).toArray();
    sendResponse(res, 200, true, "Success", users);
  } catch (error) {
    sendResponse(res, 500, false, "Internal Server Error", null);
  }
});

/**
 * @route POST /users
 * @description Create a user
 * @access Public
 */
userRouter.post("/", async (req, res) => {
  const { role, firstName, lastName, dob, email, gender, address, phone } =
    req.body;
  try {
    let createAction = await db.collection<IUser>("users").insertOne({
      role,
      email,
      vehicle: undefined,
    });

    if (!createAction.insertedId) {
      return sendResponse(res, 400, false, "Failed to create user", null);
    }

    const user = await db
      .collection<IUser>("users")
      .findOne({ _id: createAction.insertedId });

    if (!user) {
      return sendResponse(res, 400, false, "Failed to find user", null);
    }

    sendResponse(res, 200, true, "Success", user);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, false, "Internal Server Error", null);
  }
});

export default userRouter;
