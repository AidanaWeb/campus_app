import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { AuthGuard } from "src/auth/auth.guard";
import { createPostDto } from "./dtos/create-post.dto";
import type { AuthRequest } from "src/auth/interfaces/auth-request.interface";
import { SearchPostDto } from "./dtos/search-post.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "./multer.config";
import { DeletePostDto } from "./dtos/delete.post.dto";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Query() searchPostQuery: SearchPostDto) {
    console.log("12");
    return await this.postsService.getPosts(searchPostQuery);
  }

  @Get("/:id")
  async getPostById(@Param("id") id: string) {
    return await this.postsService.getPostById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("coverImage", { storage }))
  async createPost(
    @Req() req: AuthRequest,
    @Body() postData: createPostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.postsService.createPost(req.userId, postData, file);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard)
  async deletePost(@Req() req: AuthRequest, @Body() body: DeletePostDto) {
    return await this.postsService.deletePost(req.userId, body?.postId);
  }
}
