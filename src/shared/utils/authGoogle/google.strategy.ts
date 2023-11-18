import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/module/auth/auth.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID:
        '35075380019-jn95pldplvdu1nnu3l5pd04e0iujkoa1.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const details = {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      picture: profile.photos[0].value,
    };
    const result = await this.authService.validateUser(details);

    return result;
  }
}
