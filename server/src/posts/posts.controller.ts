import { Controller, Get, UseGuards } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(AuthGuard)
  protectedRoute() {
    return { message: "Accessed Resource" };
  }
}
