import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPosts() {
    const posts = await this.prisma.post.findMany();

    return {
      data: posts,
    };
  }
}
