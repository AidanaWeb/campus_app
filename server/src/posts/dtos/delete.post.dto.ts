import { IsOptional, IsString } from "class-validator";

export class DeletePostDto {
  @IsOptional()
  @IsString()
  postId: string | undefined;
}
