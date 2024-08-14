export type IVehicle = {
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: Gender;
  address: string;
  phone: string;
  code: string;
  status: VehicleStatus;
};

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum VehicleStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
