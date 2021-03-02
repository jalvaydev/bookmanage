import { Resolver, Query, Ctx, Arg } from "type-graphql";
import { Book } from "@generated/type-graphql";
import { Context } from "src/types";

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
