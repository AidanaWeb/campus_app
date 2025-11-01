import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { LikePostDto } from "./dtos/like-post.dto";

@Injectable()
export class ReactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(likeData: LikePostDto) {
    const { userId, postId } = likeData;

    try {
      const existingLike = await this.prisma.like.findFirst({
        where: {
          userId,
          entityId: postId,
          entityType: "POST",
        },
      });

      if (existingLike) {
        return {
          status: false,
        };
      }

      await this.prisma.like.create({
        data: {
          userId,
          entityId: postId,
          entityType: "POST",
        },
      });

      const post = await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likesCount: {
            increment: 1,
          },
        },
      });

      return {
        status: true,
        data: post,
      };
    } catch (error) {
      throw new BadRequestException({
        status: false,
      });
    }
  }
}
