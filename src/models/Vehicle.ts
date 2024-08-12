import { IUser } from "./User";

export type IVehicle = {
  user: IUser | string;
  code: string;
  approved: boolean;
};

// import mongoose, { Document, model, Schema } from "mongoose";
// const vehicleSchema: Schema = new Schema({
//   user: {
//     type: String,
//     ref: "User",
//   },
//   code: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   approved: {
//     type: Boolean,
//     require: true,
//     default: false,
//   },
// });
// const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);
// export default Vehicle;
