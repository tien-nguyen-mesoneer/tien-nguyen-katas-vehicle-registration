import { Response } from "express";
import mongoose from "mongoose";

export const ObjectId = (id: string) => {
  return new mongoose.Types.ObjectId(id);
};

export const sendResponse = <T>(
  res: Response,
  status: number,
  success: boolean,
  message: string,
  data: T | null = null
) => {
  res.status(status).json({ success, message, data });
};
