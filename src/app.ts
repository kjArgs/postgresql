import express from "express";
import cors from "cors";
import { UserRoute } from "./modules/auth/users.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      error: "invalid json",
      message: "Request body must be valid JSON",
    });
  }

  next(err);
});

app.use("/api/users", UserRoute);

export default app;
