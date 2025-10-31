import { BadRequestException, Injectable } from "@nestjs/common";
import { SignupDto } from "./dtos/signup.dto";
import { PrismaService } from "src/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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

    return createdUser;
  }
}
