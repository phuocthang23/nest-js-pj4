import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user?.roleId; // Lấy thông tin người dùng từ request
    console.log(user);
    if (user === 1) {
      return true; // Cho phép truy cập nếu vai trò của người dùng là 1 (admin)
    }

    return false; // Không cho phép truy cập nếu vai trò không phù hợp
  }
}
