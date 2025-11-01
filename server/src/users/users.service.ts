import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ErrorMessages } from "src/common/constants/error-messages";
import { PrismaService } from "src/prisma.service";
import { SearchUserDto } from "./dtos/search-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async searchUsers(query: SearchUserDto) {
    interface whereParams {
      OR?: object[];
      role?: "STUDENT" | "TEACHER" | "EMPLOYER";
    }
    const where: whereParams = query.search
      ? {
          OR: [
            { name: { contains: query.search, mode: "insensitive" } },
            { email: { contains: query.search, mode: "insensitive" } },
            { phone: { contains: query.search } },
          ],
        }
      : {};
    if (query.role) {
      where.role = query.role;
    }

    try {
      const users = await this.prisma.user.findMany({
        where,
        take: query.limit,
      });

      return {
        data: users,
      };
    } catch (error) {
      if (error instanceof Error) {
        Logger.error(error.message);
      } else {
        Logger.error("Unknown error");
      }

      throw new NotFoundException(ErrorMessages.USERS_NOT_FOUND);
    }
  }

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
