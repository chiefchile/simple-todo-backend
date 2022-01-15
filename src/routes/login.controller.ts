import { logger } from "../logger";
import { Response, Request } from "express";
import express from "express";
import { login } from "../services/login.service";

const router = express.Router();

router.post(
  "/",
  async (req: Request, res: Response, next: any): Promise<void> => {
    logger.info(`Logging in ${req.body.username}`);
    try {
      const result: any = await login(req.body.username, req.body.password);
      if (result.token) {
        res.json(result);
      } else {
        res.status(result.code).json(result);
      }
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
