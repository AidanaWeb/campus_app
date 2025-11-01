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

  async getPostById(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return {
        message: "Post is not found",
        translations: {
          ru: "Пост не найден",
          en: "Post is not found",
        },
      };
    }

    return {
      data: post,
    };
  }
}
