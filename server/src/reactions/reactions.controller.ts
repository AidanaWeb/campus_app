import { Body, Controller, Post } from "@nestjs/common";
import { ReactionsService } from "./reactions.service";
import { LikePostDto } from "./dtos/like-post.dto";

@Controller("reactions")
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post("/like")
  async likePost(@Body() likePostData: LikePostDto) {
    return await this.reactionsService.likePost(likePostData);
  }
}
