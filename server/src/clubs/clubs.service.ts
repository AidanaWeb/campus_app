import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateClubDto } from "./dtos/create-club.dto";
import { ErrorMessages } from "src/common/constants/error-messages";

@Injectable()
export class ClubsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllClubs() {
    try {
      const clubs = await this.prisma.club.findMany();

      return {
        data: clubs,
      };
    } catch (error) {
      return {
        message: "",
      };
    }
  }

  async createClub(userId: string | undefined, clubData: CreateClubDto) {
    if (!userId) {
      throw new UnauthorizedException({
        message: "",
      });
    }

    try {
      const club = await this.prisma.club.create({
        data: { ...clubData, adminId: userId },
      });

      return {
        data: club,
      };
    } catch (error) {
      return {
        message: "",
      };
    }
  }

  async deleteClub(userId: string | undefined, clubId: string | undefined) {
    if (!userId) {
      throw new UnauthorizedException(ErrorMessages.AUTHENTICATION_FAILED);
    }

    if (!clubId) {
      throw new NotFoundException(ErrorMessages.CLUB_NOT_FOUND);
    }

    try {
      const club = await this.prisma.club.delete({
        where: {
          id: clubId,
          adminId: userId,
        },
      });

      if (!club) {
        return {
          status: false,
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
