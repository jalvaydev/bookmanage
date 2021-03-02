import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import * as tq from "type-graphql";
import UserResolver from "./resolvers/user";
import { createContext } from "./context";

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [UserResolver],
    validate: false,
  });

  const context = createContext();

  new ApolloServer({ schema, context }).listen({ port: 4000 }),
    () => {
      console.log("🚀 Server ready at: http://localhost:4000\n⭐️");
    };
};

app();
