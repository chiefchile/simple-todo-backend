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
      const result = await login(req.body.username, req.body.password);
      if (result.code !== 200) {
        res.status(result.code).json(result);
        return;
      }

      res.json(result);
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
