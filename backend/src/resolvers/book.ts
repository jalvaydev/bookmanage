import { Context } from "src/context";
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import { Book } from "@generated/type-graphql";

@Resolver()
class BookResolver {
  @Query(() => [Book])
  async books(@Ctx() { prisma }: Context): Promise<Book[]> {
    return prisma.book.findMany();
  }

  @Query(() => Book)
  async book(
    @Arg("id") id: number,
    @Ctx() { prisma }: Context
  ): Promise<Book | null> {
    return prisma.book.findUnique({
      where: {
        id,
      },
    });
  }
}
