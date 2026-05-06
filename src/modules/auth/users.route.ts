import { Router } from "express";
import { AddUser } from "./users.controller";

export const UserRoute = Router();

UserRoute.post("/adduser", AddUser);
