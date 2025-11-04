import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { createPostDto } from "./dtos/create-post.dto";
import { SearchPostDto } from "./dtos/search-post.dto";
import { ErrorMessages } from "src/common/constants/error-messages";
import { Prisma } from "generated/prisma";

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPosts(query: SearchPostDto) {
    const hasFilters = Object.keys(query).length > 0;

    if (!hasFilters) {
      return await this.getAllPosts();
    }

    const where: Prisma.PostWhereInput = {};
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

      return ErrorMessages.FIND_POSTS_FAILED;
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
      return ErrorMessages.POST_NOT_FOUND;
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

      throw new InternalServerErrorException(ErrorMessages.CREATE_POST_FAILED);
    }
  }

  async getPostLikesCount(postId: string) {
    const likesCount = await this.prisma.like.count({
      where: {
        entityId: postId,
        entityType: "POST",
      },
    });

    return likesCount;
  }

  async deletePost(userId: string | undefined, postId: string | undefined) {
    if (!userId) {
      throw new UnauthorizedException(ErrorMessages.AUTHENTICATION_FAILED);
    }

    if (!postId) {
      throw new BadRequestException(ErrorMessages.POST_NOT_FOUND);
    }

    try {
      const post = await this.prisma.post.delete({
        where: {
          id: postId,
          authorId: userId,
        },
      });

      if (!post) {
        return {
          status: false,
          ...ErrorMessages.POST_NOT_FOUND,
        };
      }

      return {
        status: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(ErrorMessages.INTERNAL_ERROR);
    }
  }
}
