import { IUser } from "./User";
import type { ObjectId } from "mongodb";

export type IVehicle = {
  userId: ObjectId;
  user?: IUser;
  code: string;
  approved: boolean;
};
