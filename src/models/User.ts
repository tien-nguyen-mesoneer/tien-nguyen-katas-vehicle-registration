import { IVehicle } from "./Vehicle";
import type { ObjectId } from "mongodb";

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
  vehicle?: IVehicle;
};

enum UserRole {
  GENERAL = "GENERAL",
  POLICE = "POLICE",
}

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
