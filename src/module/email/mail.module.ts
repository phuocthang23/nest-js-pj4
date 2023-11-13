import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
// import { join } from 'path';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'raishun23@gmail.com',
          pass: 'wzau nhdd paey uhth',
        },
      },
      defaults: {
        from: 'raishun23@gmail.com',
      },
      // template: {
      //   dir: join('dist/mail/templates'),
      //   adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
  ],
  controllers: [],
  providers: [MailService],
})
export class MailModule {}
