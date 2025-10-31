import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class SignupDto {
  @IsString({ message: "Введите некорректные данные" })
  @MinLength(2, { message: "Имя должно содержать хотя бы 2 символа" })
  name: string;

  @IsString({ message: "Введите некорректные данные" })
  @MinLength(2, { message: "Фамилия должна содержать хотя бы 2 символа" })
  lastName: string;

  @IsEmail({}, { message: "Введите корректный email" })
  email: string;

  @IsString({ message: "Введите некорректные данные" })
  @MinLength(6, { message: "Пароль должен содержать минимум 6 символов" })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/, {
    message: "Пароль должен содержать хотя бы 1 цифру и 1 символ",
  })
  password: string;
}
