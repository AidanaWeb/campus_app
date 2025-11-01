import { Controller, Get, Param, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SearchUserDto } from "./dtos/search-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async searchUsers(@Query() searchUserQuery: SearchUserDto) {
    return await this.usersService.searchUsers(searchUserQuery);
  }

  @Get("/:id")
  async getUserById(@Param("id") userId: string) {
    return await this.usersService.getUserById(userId);
  }
}
