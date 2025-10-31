import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dtos/signup.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() signupData: SignupDto) {
    const user = await this.authService.signup(signupData);

    return {
      message: "User created successfully",
      translations: {
        ru: "Пользователь был успешно создан",
        en: "User created successfully",
      },
      user: {
        id: user.id,
        email: user.email,
      },
      access_token: "",
    };
  }
}
