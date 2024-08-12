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
  const { email, role } = req.body;
  try {
    let createAction = await db
      .collection<IUser>("users")
      .insertOne({ email, role, vehicle: null });

    if (!createAction.insertedId) {
      return sendResponse(res, 400, true, "Success", null);
    }

    const users = await db
      .collection<IUser>("users")
      .find({ _id: createAction.insertedId });

    sendResponse(res, 200, true, "Success", users);
  } catch (error) {
    sendResponse(res, 500, false, "Internal Server Error", null);
  }
});

export default userRouter;
