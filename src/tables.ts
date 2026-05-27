import { UserTable } from "./modules/auth/users.model";
import { UserSessionTable } from "./modules/auth/userSession.model";

export const createUserTable = async () => {
  try {
    await UserTable();
    console.log("User table ready");
  } catch (error) {
    console.error("Error creating user table", error);
  }
};

export const createUSerSession = async () => {
  try {
    await UserSessionTable();
    console.log("User Session Table Ready");
  } catch (error) {
    console.error("Error creating user table", error);
  }
};
