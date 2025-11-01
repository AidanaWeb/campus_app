import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { LikePostDto } from "./dtos/like-post.dto";

@Injectable()
export class ReactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(likeData: LikePostDto) {
    const { userId, postId } = likeData;

    try {
      const like = await this.prisma.like.create({
        data: {
          userId,
          entityId: postId,
          entityType: "POST",
        },
      });

      return {
        status: true,
        data: like,
      };
    } catch (error) {
      throw new BadRequestException({
        status: false,
      });
    }
  }
}
