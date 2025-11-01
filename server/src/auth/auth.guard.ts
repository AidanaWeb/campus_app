import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";
import { AuthRequest } from "./interfaces/auth-request.interface";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        message: "Invalid token",
      });
    }

    try {
      const payload: JwtPayload = this.jwtService.verify(token);
      request.userId = payload.userId;
      return true;
    } catch (error) {
      if (error instanceof Error) {
        Logger.error(error.message);
      } else {
        Logger.error("Unknown error", error);
      }

      throw new UnauthorizedException({
        message: "Invalid token",
      });
    }
  }

  private extractTokenFromHeader(request: AuthRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
