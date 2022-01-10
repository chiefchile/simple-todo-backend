import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { logger } from "../logger";

export function authenticateToken(
  req: Request,
  res: Response,
  next: any
): Response | void {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    const secret = process.env.TODO_BACKEND_SECRET || "";
    const decoded: any = jwt.verify(token, secret);
    req.body.username = decoded.username;
    next();
  } catch (error) {
    logger.error("err", error);
    res.sendStatus(403);
  }
}
