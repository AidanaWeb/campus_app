import { IsOptional, IsString } from "class-validator";

export class CreateClubDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsString()
  clubImage?: string;
}
