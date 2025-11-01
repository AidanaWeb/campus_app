import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";

enum UserRole {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  EMPLOYER = "EMPLOYER",
}

export class SearchUserDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsEnum(UserRole, {
    message: "Role must be one of: STUDENT, TEACHER, EMPLOYER",
  })
  role?: "STUDENT" | "TEACHER" | "EMPLOYER";

  @IsOptional()
  @IsString()
  search?: string;

  //   name?: string;
  //   email?: string;
  //   phone?: string;
}
