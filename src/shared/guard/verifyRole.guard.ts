import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const { headers } = request;
    // console.log(headers);

    const authHeader = request.headers.authorization;
    // const headerString = headers.authorization.split(' ');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false; // Không có token, không cho phép truy cập
    }

    const token = authHeader.substring(7); // Bỏ qua phần "Bearer " trong header

    // const currentToken = await this.jwtService.verifyAsync(headerString[1]);

    const user = await this.jwtService.verifyAsync(token);
    console.log(user, '-----');

    const userRole = user?.roleId; // Lấy thông tin người dùng từ request
    if (userRole === 1) {
      return true; // Cho phép truy cập nếu vai trò của người dùng là 1 (admin)
    }

    return false; // Không cho phép truy cập nếu vai trò không phù hợp
  }
}
