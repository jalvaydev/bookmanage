import { PrismaClient } from "@prisma/client";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";

export type Context = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  redis: Redis;
  res: Response;
  prisma: PrismaClient;
};

