import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import { Book } from "@generated/type-graphql";
import { Context } from "../types";

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

  @Mutation(() => Book)
  async addBook(
    @Arg("title") title: string,
    @Arg("author") author: string,
    @Arg("price") price: number,
    @Arg("image", {nullable: true}) image: string,
    @Ctx() { prisma } : Context
  ): Promise<Book | null> {
    return prisma.book.create({
        data: {
          title,
          author,
          price,
          image
        },
      });

  }

  @Mutation(() => Boolean)
  async removeBook(
    @Arg("id") id : number,
    @Ctx() { prisma } : Context
  ) {
    
    try {
      await prisma.book.delete({
      where: {
        id
      }
    })} catch(err){
      return false
    }

    return true;
  }

  @Mutation(() => Boolean)
  async updateStockBy(
    @Arg("id") id: number,
    @Arg("amount") amount : number,
    @Ctx() { prisma }: Context
  ){
    try {
      await prisma.$executeRaw`UPDATE "Book" SET "stock" = "stock" + ${amount} WHERE id = ${id}`
    } catch {
      return false;
    }

    return true;
  }
}

export default BookResolver