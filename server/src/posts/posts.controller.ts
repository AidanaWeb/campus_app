import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { AuthGuard } from "src/auth/auth.guard";
import { createPostDto } from "./dtos/create-post.dto";
import type { AuthRequest } from "src/auth/interfaces/auth-request.interface";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @Get("/:id")
  async getPostById(@Param("id") id: string) {
    return await this.postsService.getPostById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  // TODO: store images
  async createPost(@Req() req: AuthRequest, @Body() postData: createPostDto) {
    return await this.postsService.createPost(req.userId, postData);
  }
}
