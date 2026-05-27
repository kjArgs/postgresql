import jwt from "jsonwebtoken";

//create a signin token
export const crateSignInToken = (sub: string) => {
  return jwt.sign({ sub }, process.env.JWT_ACCESS_TOKEN as string, {
    expiresIn: "10d",
  });
};

//create a refresh token
export const createRefreshToken = (sub: string) => {
  return jwt.sign({ sub }, process.env.JWT_ACCESS_TOKEN as string, {
    expiresIn: "10d",
  });
};

//verify access token
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN as string);
};

//verify refresh token
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN as string);
};
