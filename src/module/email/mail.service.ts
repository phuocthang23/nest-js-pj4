// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class EmailService {}
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(verify) {
    const email = verify?.email;
    const fullName = verify?.firstName + ' ' + verify?.lastName;
    await this.mailerService.sendMail({
      to: email,
      from: 'TFood',
      subject: `Chào mừng ${fullName} đến với TFoody! Cám ơn bạn đã đăng ký`,
      text: `Bạn đã đăng ký thành công với email ${email}.`,
    });
  }

  async sendConfirmationOrder(codeOrder, user, htmlContent: string) {
    const email = user.email;
    await this.mailerService.sendMail({
      to: email,
      from: 'TFood',
      subject: ' Confirm Order',
      // text: `Order Successfully. It's code your order: ${codeOrder} `,
      html: htmlContent,
    });
  }

  async sendOrderAdmin(codeOrder, user) {
    await this.mailerService.sendMail({
      to: 'raishun23@gmail.com',
      from: 'TFood',
      subject: 'Orders',
      text: `you have new Order. It's code your order: ${codeOrder} 
       from User: ${user?.firstName} ${user?.lastName}
       <image src="https://media.iqonic.design/iqonic-design/wp-content/uploads/2021/06/shoppingcart.png"/>`,
      // html: htmlContent,
    });
  }
}
