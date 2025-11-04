import { Controller } from "@nestjs/common";
import { ClubsService } from "./clubs.service";

@Controller("clubs")
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}
}
