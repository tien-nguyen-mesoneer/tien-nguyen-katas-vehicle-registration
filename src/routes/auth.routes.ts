import { Router } from "express";
import { IUser } from "../models/User";
import { sendResponse } from "../utils";
import { db } from "..";

const authRouter: Router = Router();

/**
 * @route POST /auth/login
 * @description Sign users in
 * @access Public
 */
authRouter.post("/login", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return sendResponse(res, 400, false, "Bad Request", null);
  }
  try {
    const user = await db.collection<IUser>("users").findOne({ email });
    if (!user) {
      return sendResponse(
        res,
        401,
        false,
        "Invalid email. Please try again with the correct credentials",
        null
      );
    }
    sendResponse(res, 200, true, "You have successfully logged in", user);
  } catch (err) {
    sendResponse(res, 500, false, "Internal Server Error", null);
  }
});

export default authRouter;
