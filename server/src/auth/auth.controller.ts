import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dtos/signup.dto";
import { LoginDto } from "./dtos/login.dto";
import { RefreshTokenDto } from "./dtos/refresh-token.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() signupData: SignupDto) {
    return await this.authService.signup(signupData);
  }

  @Post("login")
  async login(@Body() loginData: LoginDto) {
    return await this.authService.login(loginData);
  }

  @Post("refresh")
  async refreshTokens(@Body() refreshTokenData: RefreshTokenDto) {
    return await this.authService.refreshTokens(refreshTokenData);
  }
}
