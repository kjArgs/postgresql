import { UserTable } from "./modules/auth/users.model";

export const createUserTable = async () => {
  try {
    await UserTable();
    console.log("User table ready");
  } catch (error) {
    console.error("Error creating user table", error);
  }
};
