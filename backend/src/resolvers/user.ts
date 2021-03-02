import { User } from "@generated/type-graphql";
import { Context } from "../context";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { validateRegister } from "../utils/validateRegister";
import argon2 from "argon2";

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;
}

@Resolver()
class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { prisma }: Context): Promise<User[] | null> {
    return prisma.user.findMany();
  }

  @Query(() => User)
  async user(
    @Arg("email", () => String) email: string,
    @Ctx() { prisma }: Context
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  @Mutation(() => User)
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() { prisma }: Context
  ): Promise<User | Error> {
    const validate = validateRegister(input);
    if (validate !== null) {
      return validate;
    }

    const hashedPassword = await argon2.hash(input.password);

    let user;
    try {
      const conn = await prisma.user.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          password: hashedPassword,
        },
      });

      user = conn;
    } catch (err) {
      if (err.code === "P2002") {
        return new Error("Email already exists");
      }
    }

    return user as User;
  }

  @Mutation(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { prisma }: Context
  ): Promise<User | Error> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new Error("user not found");
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return new Error("invalid login");
    }

    return user;
  }
}

export default UserResolver;