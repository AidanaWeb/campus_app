import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PostsModule } from "./posts/posts.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { ReactionsModule } from './reactions/reactions.module';
import { ClubsModule } from './clubs/clubs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_ACCESS_SECRET"),
        signOptions: {
          expiresIn: "1d",
        },
      }),
    }),
    PostsModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    ReactionsModule,
    ClubsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
