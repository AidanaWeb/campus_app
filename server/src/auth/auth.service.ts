import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { SignupDto } from "./dtos/signup.dto";
import { PrismaService } from "src/prisma.service";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dtos/login.dto";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from "uuid";
import { RefreshTokenDto } from "./dtos/refresh-token.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(signupData: SignupDto) {
    const { email, password, name, lastName } = signupData;

    const emailInUse = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailInUse) {
      throw new BadRequestException({
        message: "Email already in use",
        translations: {
          ru: "Email уже используется",
          en: "Email already in use",
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        email,
        name,
        lastName,
        password: hashedPassword,
      },
    });

    return {
      message: "User created successfully",
      translations: {
        ru: "Пользователь был успешно создан",
        en: "User created successfully",
      },
      user: {
        id: createdUser.id,
        email: createdUser.email,
      },
    };
  }

  async login(loginData: LoginDto) {
    const { email, password } = loginData;

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new BadRequestException({
        message: "Wrong email or password",
        translations: {
          ru: "Неверный email или пароль",
          en: "Wrong email or password",
        },
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException({
        message: "Wrong email or password",
        translations: {
          ru: "Неверный email или пароль",
          en: "Wrong email or password",
        },
      });
    }

    const { password: existingUserPassword, ...safeUserData } = existingUser;
    const token = await this.generateUserTokens(existingUser.id);

    return {
      user: safeUserData,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }

  async generateUserTokens(userId: string) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: "1h" });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(token: string, userId: string) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });

    const storedToken = await this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiryDate,
      },
    });

    return storedToken;
  }

  async refreshTokens(refreshToken: RefreshTokenDto) {
    const existingToken = await this.prisma.refreshToken.findFirst({
      where: {
        token: refreshToken.refreshToken,
        expiryDate: {
          gt: new Date(),
        },
      },
    });

    if (!existingToken) {
      throw new UnauthorizedException({
        message: "refresh token is invalid",
      });
    }

    return this.generateUserTokens(existingToken.userId);
  }
}
