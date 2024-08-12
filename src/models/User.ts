import { IVehicle } from "./Vehicle";

export type IUser = {
  // Compulsory to create an account
  role: UserRole;
  email: string;

  // Will be updated after register a vehicle
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: Gender;
  address?: string;
  phone?: string;
  vehicle?: IVehicle | string;
};

enum UserRole {
  GENERAL = "GENERAL",
  POLICE = "POLICE",
}

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
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
