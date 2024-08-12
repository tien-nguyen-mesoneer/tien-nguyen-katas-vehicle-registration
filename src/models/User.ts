import { IVehicle } from "./Vehicle";

export type IUser = {
  email: string;
  role: UserRole;
  vehicle: IVehicle | string | null;
};

enum UserRole {
  GENERAL = "GENERAL",
  POLICE = "POLICE",
}

// import { model, Schema } from "mongoose";
// const userSchema: Schema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   role: {
//     type: String,
//     default: UserRole.GENERAL,
//     enum: UserRole,
//   },
//   vehicle: {
//     type: String,
//     ref: "Vehicle",
//   },
// });
// const User = model<IUser>("User", userSchema);
// export default User;
