import { Type } from "class-transformer";
import { IsDate, IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class SearchPostDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  authorId?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateFrom?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateTo?: Date;

  @IsOptional()
  @IsIn(["asc", "desc"])
  order?: "asc" | "desc";
}
