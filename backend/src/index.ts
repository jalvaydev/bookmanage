import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import * as tq from "type-graphql";
import UserResolver from "./resolvers/user";
import BookResolver from "./resolvers/book";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import cors from "cors";
import { COOKIE_NAME, __prod__ } from "./constants";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const main = async () => {
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SECRET!,
      resave: false,
    })
  );

  const schema = await tq.buildSchema({
    resolvers: [UserResolver, BookResolver],
    validate: false,
  });

  const prisma = new PrismaClient();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, prisma, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen({ port: 4000 }, () => {
    console.log("🚀 Server ready at: http://localhost:4000 ⭐️");
  });
};

main();
