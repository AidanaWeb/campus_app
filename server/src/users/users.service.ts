import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ErrorMessages } from "src/common/constants/error-messages";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
      }

      return {
        data: user,
      };
    } catch (error) {
      if (error instanceof Error) {
        Logger.error(error.message);
      } else {
        Logger.error("Unknown error");
      }

      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }
  }
}
