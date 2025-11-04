import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateClubDto } from "./dtos/create-club.dto";

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
}
