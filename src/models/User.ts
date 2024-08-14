export type IUser = {
  email: string;
  role: UserRole;
};

enum UserRole {
  GENERAL = "GENERAL",
  POLICE = "POLICE",
}
