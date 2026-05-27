import { SessionType } from "@/modules/auth/userSession.type";
import { Request } from "express";
import { generateHashedPassword } from "@/utils/bcrypt.util";

export const BuildSession = async (
  req: Request,
  refreshTokenRaw: string,
  session_id: number,
  user_id: number,
): Promise<SessionType> => {
  const token = await generateHashedPassword(refreshTokenRaw);
  const expiresAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15 days)
  return {
    session_id,
    user_id,
    token,
    expiresAt,
  };
};
