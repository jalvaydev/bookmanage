import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import * as tq from "type-graphql";
import { UserCrudResolver, BookCrudResolver } from "@generated/type-graphql";
import { createContext } from "./context";
import { CustomUserResolver } from "./resolvers/CustomUserResolver";

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [UserCrudResolver, BookCrudResolver, CustomUserResolver],
    validate: false,
  });

  const context = createContext();

  new ApolloServer({ schema, context }).listen({ port: 4000 }),
    () => {
      console.log("🚀 Server ready at: http://localhost:4000\n⭐️");
    };
};

app();
