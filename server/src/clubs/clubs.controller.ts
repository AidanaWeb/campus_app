import { Body, Controller, Delete, Post, Req, UseGuards } from "@nestjs/common";
import { ClubsService } from "./clubs.service";
import type { AuthRequest } from "src/auth/interfaces/auth-request.interface";
import { CreateClubDto } from "./dtos/create-club.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("clubs")
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createPost(@Req() req: AuthRequest, @Body() clubData: CreateClubDto) {
    return await this.clubsService.createClub(req.userId, clubData);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard)
  async deleteClub(
    @Req() req: AuthRequest,
    @Body() clubId: string | undefined,
  ) {
    return await this.clubsService.deleteClub(req.userId, clubId);
  }
}
