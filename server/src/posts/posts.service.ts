import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { createPostDto } from "./dtos/create-post.dto";
import { SearchPostDto } from "./dtos/search-post.dto";

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPosts(query: SearchPostDto) {
    const hasFilters = Object.keys(query).length > 0;

    if (!hasFilters) {
      return await this.getAllPosts();
    }

    interface whereParams extends SearchPostDto {
      createdAt?: any;
    }
    const where: whereParams = {};
    if (query.authorId) {
      where.authorId = query.authorId;
    }
    if (query.dateFrom || query.dateTo) {
      where.createdAt = {
        ...(query.dateFrom && { gte: query.dateFrom }),
        ...(query.dateTo && { lte: query.dateTo }),
      };
    }

    try {
      const posts = await this.prisma.post.findMany({
        where,
        take: query.limit ?? 10,
        orderBy: {
          createdAt: query.order ?? "desc",
        },
      });

      return {
        data: posts,
      };
    } catch (error) {
      if (error instanceof Error) {
        Logger.error(error.message);
      } else {
        Logger.error("Unknown error");
      }

      return {
        message: "",
        translations: {
          ru: "",
          en: "",
        },
      };
    }
  }

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

  async createPost(userId: string | undefined, postData: createPostDto) {
    if (!userId) {
      throw new UnauthorizedException({
        message: "unathorized",
      });
    }

    try {
      const createdPost = await this.prisma.post.create({
        data: {
          authorId: userId,
          ...postData,
        },
      });

      return {
        data: createdPost,
      };
    } catch (error) {
      if (error instanceof Error) {
        Logger.error(error.message);
      } else {
        Logger.error("Unknown error");
      }

      throw new InternalServerErrorException({
        message: "An error occurred while creating the post",
        translations: {
          ru: "Произошла ошибка при создании поста",
          en: "An error occurred while creating the post",
        },
      });
    }
  }
}
