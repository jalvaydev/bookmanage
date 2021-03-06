import { User } from "@generated/type-graphql";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { validateRegister } from "../utils/validateRegister";
import argon2 from "argon2";
import { Context } from "../types";
import { COOKIE_NAME } from "../constants";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

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

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { prisma, req }: Context): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    return prisma.user.findUnique({ where: { id: req.session.userId } });
  }

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

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() { prisma, req }: Context
  ): Promise<UserResponse> {
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
        return {
          errors: [
            {
              field: "Email",
              message: "Email is already in the database.",
            },
          ],
        };
      } else {
        return {
          errors: [
            { field: err.code, message: "An unkown error has occurred..." },
          ],
        };
      }
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req, prisma }: Context
  ): Promise<UserResponse> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return {
        errors: [
          {
            field: "user",
            message: "The user has not been found",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: "authentication",
            message: "invalid login",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: Context) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}

export default UserResolver;
