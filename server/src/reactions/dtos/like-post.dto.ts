import { IsString } from "class-validator";

export class LikePostDto {
  @IsString()
  userId: string;

  @IsString()
  postId: string;
}
