import { IsOptional, IsString, MinLength } from "class-validator";

export class createPostDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  title?: string;

  @IsString({
    message: "Post content is required",
  })
  @MinLength(2)
  body: string;

  @IsOptional()
  @IsString()
  coverImage?: string;
}
