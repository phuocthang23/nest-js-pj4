import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWT {
  constructor(private jwtService: JwtService) {}
  //*generate access token
  async generateToken(payload) {
    return await this.jwtService.signAsync(payload);
  }

  //* Verify token
  async verifyToken(token) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      // If the token is invalid or has expired, an error will be thrown
      return null;
    }
  }
}
