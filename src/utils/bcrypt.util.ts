import bcrypt from "node_modules/bcryptjs";

//crete a function for hashing password
export const generateHashedPassword = async (
  value: string,
): Promise<string> => {
  //generate salt for randomizing string with 10 rounds

  const salt = await bcrypt.genSalt(10);

  //return the hashed value using salt
  return await bcrypt.hash(value, salt);
};

//create a function for comparing the hashed and plain text
export const compareHashedValue = async (
  enteredValue: string,
  storedValue: string,
): Promise<boolean> => {
  // Compare plain text with hashed value
  // Returns true if they match, false otherwise

  return await bcrypt.compare(enteredValue, storedValue);
};
